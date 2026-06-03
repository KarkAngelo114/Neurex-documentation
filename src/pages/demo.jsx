import { faBars, faCamera, faChevronUp, faNetworkWired, faPaperPlane, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataURLtoBlob, NavigateTo, sendCapture, sendDrawnImage } from "../scripts";
import { useEffect, useState, useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { Horizontal_Bar } from "../custom-components/bars/bars";
import ProbabilityChart from "../custom-components/chart/chart";
import { SideDrawer } from "../custom-components/side-drawer";
import { usePost } from "../scripts/http";
import { ToastContainer, toast } from 'react-toastify';
import { Runtime } from 'neurex-runtime';
import {Dropdown, DropdownOption} from '../custom-components/dropdown';



export const Demo_1 = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [confidenceScore, setConfidenceScore] = useState(0);
    const [pred_class, setClasss] = useState('No predicted class');
    const [spoofPercent, setSpoofPercent] = useState(0.0);
    const [genuinePercent, setGenuinedPercent] = useState(0.0);

    const videoContraints = {
        facingMode: 'user'
    }

    const AnimationLoading = () => {
        return (
            <> 
                <div style={{padding: "2%"}}>
                    <FontAwesomeIcon icon={faSpinner} spin size="2x"/>
                </div>
            </>
        );
    }

    const CaptureImage = async () => {
        if (!webcamRef.current) return;
        try {
            setIsLoading(true);

            const imageSrc = webcamRef.current.getScreenshot({
                width: 1280,
                height: 720
            });

            if (!imageSrc) {
                throw new Error("Failed to capture image");
            }

            const blob = await fetch(imageSrc).then(res => res.blob());

            const formData = new FormData();
            formData.append("image_input", blob, "image_input.jpg");

            const {StatusCode, data} = await sendCapture(formData);

            if (StatusCode != 200) {
                throw new Error('An error orccured');
            }

            setConfidenceScore(data.confidence_score || 0)
            setClasss(data.predicted_class);
            
            let genuine_percent = (data.confidence_score || 0) * 100;
            let spoof_percent = (1 - (data.confidence_score || 0)) * 100;

            setGenuinedPercent(genuine_percent);
            setSpoofPercent(spoof_percent);

            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
            

        }
        catch (error) {
            setIsLoading(false);
            console.error(error);
            alert('An error occurred')
        }
    }

    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span  className="toShow"></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>
            </header>

            <div style={{paddingLeft:'1%', marginTop: '2%'}}>
                <div>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" style={{cursor:'pointer'}} onClick={() => navigate(-1)}/>
                </div>
            </div>

            <section className="camera-section" style={{padding: '4%'}}>
                <h2 className="orange-accent-underline">Face Liveliness Detection Demo</h2>
                <p>This demo uses trained <b>CNN</b> model to classify face images if it's <b>Genuine</b> or <b>Spoofed</b>.</p>
                <p>Note: For the purpose of the live demonstration of face detection, face images are captured and processed in real time solely to illustrate system functionality; however, the system does not store, retain, or use any user-submitted images for logging, analytics, or model retraining purposes.</p>
                <div>
                    <p>Instructions:</p>
                    <ul>
                        <li>Ensure that the front camera is not obstructed or covered</li>
                        <li>Tap or click the camera button to take a photo</li>
                        <li>Wait for the result</li>
                    </ul>
                </div>
                <div className="camera-main-container">
                    <div style={{width:"100%", padding: '2%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"column"}}>
                        <Webcam
                            audio={false}
                            videoConstraints={videoContraints}
                            ref={webcamRef}
                            style={{ flexDirection:'column', alignItems:'center',width:450}}
                        />
                        {
                            isLoading ? <AnimationLoading/> : 
                            <button type="button" className="Capture_btn" onClick={() => CaptureImage()}><FontAwesomeIcon icon={faCamera} size="3x"/></button>
                        }
                    </div>
                    <div style={{padding: '2%', width: '100%'}}>
                        <hr></hr>
                        <h3>Model Result</h3>
                        <div style={{paddingLeft: 10}}>
                            <p>Confidence Score (in detecting genuineness): <b>{confidenceScore}</b></p>
                            <p>Predicted Class: <b>{pred_class}</b></p><br></br>

                            <p>Spoofed <b>{spoofPercent.toFixed(2)}%</b></p>
                            <Horizontal_Bar fill_Percentage={spoofPercent} colorFill={'red'}/>
                            <p>Genuine <b>{genuinePercent.toFixed(2)}%</b></p>
                            <Horizontal_Bar fill_Percentage={genuinePercent} colorFill={'#00b722'}/>
                        </div>
                    </div>
                </div>
                
                
            </section>

        </>
    );
};


export const Demo_2 = () => {
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false);
    const [predicted_class, set_predicted_class] = useState("No predicted class yet");
    const [probability_scores, set_array_of_probability_scores] = useState([]);
    const [score, setScore] = useState(0);

    const sigCanvas = useRef({});

    const clear = () => sigCanvas.current.clear();

    const handleSubmit = async () => {
        if (sigCanvas.current.isEmpty()) {
            alert("Please draw something first!");
            return;
        }

        const originalCanvas = sigCanvas.current.getCanvas();

        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = 28;
        smallCanvas.height = 28;

        const ctx = smallCanvas.getContext("2d");

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 28, 28);

        ctx.drawImage(originalCanvas, 0, 0, 28, 28);

        const imageData = ctx.getImageData(0, 0, 28, 28);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = data[i + 1] = data[i + 2] = gray;
        }

        ctx.putImageData(imageData, 0, 0);

        const blob = await new Promise(resolve =>
            smallCanvas.toBlob(resolve, "image/png")
        );

        const formData = new FormData();
        formData.append("image_input", blob, "digit.png");
        setIsloading(true);
        try {
            const { data, StatusCode } = await sendDrawnImage(formData);

            if (StatusCode !== 200) {
                alert("Failed to send data");
                setIsloading(false);
                return;
            }

            set_predicted_class(data.predicted_class);
            set_array_of_probability_scores(data.scores);
            setScore(data.probability_score);
            setTimeout(() => {
                setIsloading(false);
            }, 2000);
            
            

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const AnimationLoading = () => {
        return (
            <> 
                <div style={{padding: "2%"}}>
                    <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
                </div>
            </>
        );
    }
    
    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span  className="toShow"></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>
            </header>

            <div style={{paddingLeft:'1%', marginTop: '2%'}}>
                <div>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" style={{cursor:'pointer'}} onClick={() => navigate(-1)}/>
                </div>
            </div>

            <section className = "digits-recognizer-main-section">
                <div className="writing-pad-main-container">
                    <div style={{minHeight:'100px', width: '100%', display:'grid', placeItems: 'center'}}>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="white"
                            canvasProps={{ width: 400, height: 400, className: 'sigCanvas' }}
                            backgroundColor="black"
                            maxWidth={20}
                            minWidth={20}
                        />
                        {isLoading ? <AnimationLoading/>:<div className = "button-actions">
                            <button className = "btn-act solar-flare-gradient-bg" onClick={handleSubmit}>Submit <FontAwesomeIcon icon={faPaperPlane}/></button>
                            <button className="btn-act clear-btn sol" onClick={() => clear()}>Clear <FontAwesomeIcon icon={faTrash}/></button>
                        </div>}
                    </div>
                    <div className="result-box">
                        <hr></hr>
                        <h3>Model Result</h3>
                        <p>Predicted number: <b>{predicted_class}</b></p>
                        <p>Probability score: <b>{score.toFixed(6)}</b></p>
                        <ProbabilityChart probabilities={probability_scores}/>
                    </div>
                </div>
            </section>
        </>
    );
}

export const Demo_3 = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [res, setRes] = useState({
        classification: "",
        score: 0.0
    });

    const submitText = async () => {
        setIsLoading(true);
        const {StatusCode, data, message} = await usePost('/api/neurex/classify-text', {text:text});

        if (StatusCode != 200) {
            toast.error(message);
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setRes(data);
        }, 1500);
        
        
        
    }

    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span  className="toShow"></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>
            </header>

            <div style={{paddingLeft:'1%', marginTop: '2%'}}>
                <div>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" style={{cursor:'pointer'}} onClick={() => navigate(-1)}/>
                </div>
            </div>
            
            <div style={{padding:'2%'}}>
                <p>This demo shows how you can use the library for text classification tasks. However, in this demo, the system doesn't store, retain or use any submitted inputs for logging, analytics and model retraining purposes</p>
            </div>

            <div className="demo-section">
                <div className="text-input-div-container">
                    <p>Enter text input</p>
                    <div className="text-container">
                        <input type="text" className="text-input" autoCorrect="false" value={text} onChange={(e) => setText(e.target.value)}/>
                        {
                            !isLoading ? <button type="button" className="solar-flare-gradient-bg submit-btn" onClick={() => submitText()}>Submit</button> :
                            (<FontAwesomeIcon icon={faSpinner} spin size="2x"/>)
                        }
                    </div>
                    <p style={{fontSize:'0.8rem', color:"gray"}}>* Do not enter passwords or any sensitive credentials.</p>
                </div>
                <div className="result-box" style={{padding:'5%'}}>
                    <p><b>Result</b></p>
                    <p>Score: {res.score}</p>
                    <p className={res.score > 0.5 ? "red-text":"green-text"}><b>{res.classification}</b></p>
                </div>
            </div>
        </>
    );
}


export const Demo_4 = () => {
    const navigate = useNavigate();
    const nrxRef = useRef(null); 

    const [switchA, setSwitchA] = useState(0);
    const [switchB, setSwitchB] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                nrxRef.current = new Runtime();
                const res = await fetch('/XOR.json');
                const modelData = await res.json();

                await nrxRef.current.loadSavedModel(modelData);
                setIsModelLoaded(true);
            } catch (err) {
                console.error("Failed to load XOR model:", err);
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (isModelLoaded && nrxRef.current) {
            predict(switchA, switchB);
        }
    }, [switchA, switchB, isModelLoaded]);

    const predict = async (var1, var2) => {
        try {
            const pred = await nrxRef.current.predict([[var1, var2]]);

            setPrediction(pred[0][0].toFixed(5));
        } catch (err) {
            console.error("Prediction error:", err);
        }
    };

    const toggleSwitch = (currentValue, setTarget) => {
        setTarget(currentValue === 0 ? 1 : 0);
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

            <section className="xor-section" style={{ padding: '4%', textAlign: 'center' }}>
                <h2 className="orange-accent-underline">Interactive XOR Circuit</h2>
                <p>Flick the switches below to pass inputs into the trained <b>Neurex</b> model.</p>
                
                {!isModelLoaded ? (
                    <p>Loading neural network model...</p>
                ) : (
                    <div style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
                            <div>
                                <h3>Input A</h3>
                                <button 
                                    type="button"
                                    onClick={() => toggleSwitch(switchA, setSwitchA)}
                                    className={`explore-more-btn ${switchA ? 'solar-flare-gradient-bg' : ''}`}
                                    style={{ padding: '10px 20px', minWidth: '80px', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    {switchA ? "ON (1)" : "OFF (0)"}
                                </button>
                            </div>

                            <div>
                                <h3>Input B</h3>
                                <button 
                                    type="button"
                                    onClick={() => toggleSwitch(switchB, setSwitchB)}
                                    className={`explore-more-btn ${switchB ? 'solar-flare-gradient-bg' : ''}`}
                                    style={{ padding: '10px 20px', minWidth: '80px', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    {switchB ? "ON (1)" : "OFF (0)"}
                                </button>
                            </div>
                        </div>

                        <div className="result-box" style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                            <h3>Circuit Output</h3>
                            <p style={{ fontSize: '1.2rem' }}>
                                Expected Logic: <b>{switchA ^ switchB}</b>
                            </p>
                            <p style={{ fontSize: '1.2rem' }}>
                                Model Output: <b>{prediction > 0.5 ? '[1]' : '[0]'}</b>
                                
                            </p>
                            <p>
                                Score: <b>{prediction}</b>
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};


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

    // Keyboard controls listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            e.prevent.Defaut();
            if (!DIRECTIONS[e.key]) return;

            const nextDir = DIRECTIONS[e.key];
            const currentDir = directionRef.current;

            // Restrict 180-degree immediate reverse movement onto itself
            if (nextDir.x + currentDir.x === 0 && nextDir.y + currentDir.y === 0) {
                return;
            }

            setDirection(nextDir);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
                // 3. FORCE the engine to wait for the AI prediction right here
                const pred = await nrx.current.predict([sensors]);
                const output = Array.from(pred[0]);
                const aiChoice = output.indexOf(Math.max(...output)); // 0, 1, or 2
                
                // 4. Map relative decision back to game vectors immediately
                aiNextDir = getNextAbsoluteDirection(currentDir, aiChoice, DIRECTIONS);
                
                // Update direction state and reference immediately
                setDirection(aiNextDir);
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
        </>
    );
}


export const Demo_Page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownClicked, setIsDropDownClicked] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span  className="toShow" onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faBars}/></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>
                <SideDrawer isOpen={isOpen} action={() => setIsOpen(false)}>
                    <div className="header-left-branding">
                        <span className="toShow" onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                        </span>
                        <img src="nrx-logo.png" className="img-logo" alt="logo" />
                        <p>Neurex</p>
                    </div>
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/javascript-nodejs")}>Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline  current-highlighted" onClick={() => navigate('/demo')}>Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                </SideDrawer>
                <div className="nav toHide">
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/javascript-nodejs")}>Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline  current-highlighted" onClick={() => navigate('/demo')}>Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                    <Dropdown
                        bg="#00000000"
                        fg="black"
                        isClicked={isDropdownClicked}
                        action={() => setIsDropDownClicked(!isDropdownClicked)}
                        component_label={<p className="animated-orange-underline">More <FontAwesomeIcon icon={faChevronUp} style={{
                            transform: isDropdownClicked ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                        }}/></p>}
                        dropdownWidth="250"
                        textAlign={'left'}
                    >
                        <DropdownOption onHoverBackgroundColor="#e2e1e1" onHoverFontColor="black" action={() => navigate("/convert-to-json")}>
                            <p style={{fontSize:"0.9rem", fontWeight:600}}>Convert .nrx models to JSON</p>
                            <p style={{fontSize:"0.8rem", color:'gray'}}>Convert your <code>nrx</code> models for browser inferencing</p>
                        </DropdownOption>
                    </Dropdown>
                </div>
            </header>

            <section className="section-1">
                <div className="centered-hero-page-title">
                    <div style={{width:'50%'}}>
                        <h1>Demos</h1>
                        <p>Explore demos and gain ideas what you can build with Neurex</p>
                    </div>
                </div>
            </section>

            <section className="demo-list-section">
                <div className="demo-list">
                    <div className="demo-project-item-box" onClick={() => navigate('/face-liveliness-tests')}>
                        <div className="thumbnail-container">
                            <img src = "face-detection.jpg" className="demo-thumbnail-image" alt="https://www.freepik.com/free-vector/woman-face-scan-process_5597103.htm#fromView=search&page=1&position=18&uuid=d515bfb6-97bc-4aac-88bb-e73fbc511d9a&query=Face+detection+real+vs+fake+thumbnail+BG"/>
                        </div>
                        <div style={{minHeight: '250px'}}>
                            <h2>Face Liveness Detection</h2>
                            <p>Learn how a well-trained CNN model classify between genuine (live) or fake (spoofed) face image</p>

                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/digits-recognition')}>
                        <div className="thumbnail-container">
                            <img src="hand-written-digits.jpg" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Hand Written Digits Recognizer</h2>
                            <p>An interactive demo where you can hand written a single digits and let the model predict what number your wrote.</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/spam-ham')}>
                        <div className="thumbnail-container">
                            <img src="spam.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Text Classification (ham vs spam)</h2>
                            <p>Classify texts/messages if it's a kind of a spam message or legitimate ones.</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/XOR')}>
                        <div className="thumbnail-container">
                            <img src="xor.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>XOR</h2>
                            <p>Flick switches to add signal and let the trained model outputs an XOR predictions</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/ai-snake-game')}>
                        <div className="thumbnail-container">
                            <img src="snake.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Snake game</h2>
                            <p>Watch how a trained ANN model plays a snake game</p>
                        </div>
                        <hr/>
                    </div>

                </div>
            </section>

            <section className="banner solar-flare-gradient-bg">
                <h1>Get started with NeurexJS</h1>
                <button type = "button"className="explore-more-btn" onClick={() => navigate('/javascript-nodejs')}>Explore Tutorials</button>
            </section>

            <section className="footer-section">
                <hr/>
                <footer>
                    <p>Copyright &copy; {new Date().getFullYear()} Neurex. All rights reserved  </p>
                </footer>
            </section>

        </>

    );
};