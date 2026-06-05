import { faBars, faCamera, faChevronUp, faNetworkWired, faPaperPlane, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataURLtoBlob, NavigateTo, sendCapture, sendDrawnImage } from "../../scripts";
import { useEffect, useState, useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { Horizontal_Bar } from "../../custom-components/bars/bars";
import ProbabilityChart from "../../custom-components/chart/chart";
import { SideDrawer } from "../../custom-components/side-drawer";
import { usePost } from "../../scripts/http";
import { ToastContainer, toast } from 'react-toastify';
import { Runtime } from 'neurex-runtime';

const DIRECTIONS = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
    };
export const Demo_5 = () => {

    const nrx = useRef(null);
    const navigate = useNavigate();
    
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [modelRawOutput, setModelRawOutput] = useState([]);
    const [outputControl, setOutputControl] = useState("Straight");

    // Grid Configuration
    const GRID_SIZE = 20;
    const INITIAL_SPEED = 150;

    // Direction Vector Vectors
    

    const getNextAbsoluteDirection = (currentDir, aiChoice, DIRECTIONS) => {
        // Determine current facing state based on vectors
        if (currentDir.y === -1) { // Facing UP
            if (aiChoice === 1) return DIRECTIONS.ArrowLeft;
            if (aiChoice === 2) return DIRECTIONS.ArrowRight;
        }
        if (currentDir.y === 1) {  // Facing DOWN
            if (aiChoice === 1) return DIRECTIONS.ArrowRight;
            if (aiChoice === 2) return DIRECTIONS.ArrowLeft;
        }
        if (currentDir.x === -1) { // Facing LEFT
            if (aiChoice === 1) return DIRECTIONS.ArrowDown;
            if (aiChoice === 2) return DIRECTIONS.ArrowUp;
        }
        if (currentDir.x === 1) {  // Facing RIGHT
            if (aiChoice === 1) return DIRECTIONS.ArrowUp;
            if (aiChoice === 2) return DIRECTIONS.ArrowDown;
        }
        return currentDir; // Default to straight if choice is 0
    };

    const calculateSensors = (head, currentDir, foodGrid, bodySegments, GRID_SIZE) => {
        // 1. Establish localized directions relative to current heading
        let straightDir = currentDir;
        let leftDir = { x: currentDir.y, y: -currentDir.x };
        let rightDir = { x: -currentDir.y, y: currentDir.x };

        const checkDanger = (dir) => {
            const nextX = head.x + dir.x;
            const nextY = head.y + dir.y;
            // Wall check
            if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) return 1;
            // Self collision check
            if (bodySegments.some(seg => seg.x === nextX && seg.y === nextY)) return 1;
            return 0;
        };

        // Calculate Dangers
        const dangerStraight = checkDanger(straightDir);
        const dangerLeft = checkDanger(leftDir);
        const dangerRight = checkDanger(rightDir);

        // 2. Food positioning relative to heading
        let foodAhead = 0, foodBehind = 0, foodLeft = 0, foodRight = 0;

        // Convert absolute food vector position relative to head
        const dx = foodGrid.x - head.x;
        const dy = foodGrid.y - head.y;

        // Projection mapping using dot products to see where food sits relative to heading
        const forwardDot = dx * currentDir.x + dy * currentDir.y;
        const sideDot = dx * leftDir.x + dy * leftDir.y;

        if (forwardDot > 0) foodAhead = 1;
        if (forwardDot < 0) foodBehind = 1;
        if (sideDot > 0) foodLeft = 1;
        if (sideDot < 0) foodRight = 1;

        return [dangerStraight, dangerLeft, dangerRight, foodAhead, foodBehind, foodLeft, foodRight];
    };

    // init model
    useEffect(() => {
        const init = async () => {
            const res = await fetch('/snake.json');
            const modelData = await res.json();

            nrx.current = new Runtime();
            await nrx.current.loadSavedModel(modelData);
            setIsModelLoaded(true);
        };

        init();
    }, []);

    // Maintain mutable reference to current direction to prevent race conditions inside intervals
    const directionRef = useRef(direction);
    directionRef.current = direction;

    // Generate random placement coordinates for food
    const generateFood = (currentSnake) => {
        while (true) {
            const newFood = {x: Math.floor(Math.random() * GRID_SIZE),y: Math.floor(Math.random() * GRID_SIZE),};
            // Check if food spawned inside the snake's body
            const isColliding = currentSnake.some(
                (segment) => segment.x === newFood.x && segment.y === newFood.y
            );
            if (!isColliding) return newFood;
        }
    };

    // Main AI Game Loop Engine (Synchronized & Await-Driven)
    useEffect(() => {
        if (isGameOver || !isModelLoaded || !nrx.current) return;

        const gameLoop = setInterval(async () => {
            // 1. Safely grab latest snake array from a reference or state snapshot
            // To avoid stale closures, we can use the state directly because the interval restarts when dependencies change
            const head = snake[snake.length - 1];
            const currentDir = directionRef.current;

            // 2. Get real-time sensor array values
            const sensors = calculateSensors(head, currentDir, food, snake, GRID_SIZE);

            let aiNextDir = currentDir;
            try {
                const pred = await nrx.current.predict([sensors]);
                const output = Array.from(pred[0]);
                const aiChoice = output.indexOf(Math.max(...output)); // 0, 1, or 2
                
                // 4. Map relative decision back to game vectors immediately
                aiNextDir = getNextAbsoluteDirection(currentDir, aiChoice, DIRECTIONS);
                
                // Update direction state and reference immediately
                const controls = ["Straight", "Left", "Right"];
                setOutputControl(controls[aiChoice]);
                setDirection(aiNextDir);
                setModelRawOutput(output);
                directionRef.current = aiNextDir;
            } catch (err) {
                console.error("Runtime inference error:", err);
            }

            // 5. Calculate forward advancement using the FRESH AI direction vector
            const nextHead = {
                x: head.x + aiNextDir.x,
                y: head.y + aiNextDir.y,
            };

            // Collision Check: Boundaries / Walls
            if (nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE) {
                setIsGameOver(true);
                clearInterval(gameLoop);
                return;
            }

            // Collision Check: Self-eating
            const hitSelf = snake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);
            if (hitSelf) {
                setIsGameOver(true);
                clearInterval(gameLoop);
                return;
            }

            // Advance snake coordinates 
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake, nextHead];
                
                // Collision Check: Apple Eating Logic
                if (nextHead.x === food.x && nextHead.y === food.y) {
                    setScore((prev) => prev + 10);
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.shift(); 
                }
                return newSnake;
            });

        }, INITIAL_SPEED);

        return () => clearInterval(gameLoop);
    }, [snake, food, isGameOver, isModelLoaded]); // Added snake to dependencies to ensure fresh updates

    // Reset App State to Initial State
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection(DIRECTIONS.ArrowRight);
        setScore(0);
        setIsGameOver(false);
    };


    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span className="toShow"></span>
                    <img src="nrx-logo.png" className="img-logo" alt="logo"/>
                    <p>Neurex</p>
                </div>
            </header>

            <div style={{ paddingLeft: '1%', marginTop: '2%' }}>
                <div>
                    <FontAwesomeIcon 
                        icon={faArrowAltCircleLeft} 
                        size="2x" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => navigate(-1)} 
                    />
                </div>
            </div>
            
            <div className="snake-game-parent-container">
            
                <div className="game-container">
                    <div className="score-board">Score: {score}</div>
                    <div className="grid">
                        {Array.from({ length: GRID_SIZE }).map((_, y) => (
                        <div key={y} className="row">
                            {Array.from({ length: GRID_SIZE }).map((_, x) => {
                            const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
                            const isFood = food.x === x && food.y === y;
                            return (
                                <div
                                    key={x}
                                    className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
                                />
                            );
                            })}
                        </div>
                        ))}
                    </div>
                    {isGameOver && (
                        <div className="overlay">
                        <h2>Game Over!</h2>
                        <button onClick={resetGame}>Restart Match</button>
                        </div>
                    )}
                </div>
                <div style={{width:"100%"}}>
                    <p><b>Model output</b></p>
                    <p>Model raw output: [{parseFloat(modelRawOutput[0]).toFixed(4)}, {parseFloat(modelRawOutput[1]).toFixed(4)}, {parseFloat(modelRawOutput[2]).toFixed(4)}]</p>
                    <p>AI output control: <span style={{fontWeight:"bold"}}>{outputControl}</span></p>
                </div>
            </div>
        </>
    );
}