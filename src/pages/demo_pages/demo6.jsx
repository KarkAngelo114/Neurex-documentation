import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import {Runtime} from 'neurex-runtime';
import ProbabilityChart from "../../custom-components/chart/chart";

export const ManualDriving = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [dataCount, setDataCount] = useState(0);
    const [gameStatus, setGameStatus] = useState("Drive with Arrow Keys to collect data!");
    
    // Controlled input text field state
    const [numSensorsInput, setNumSensorsInput] = useState(10);
    // The actual active sensor count rules the simulation instance
    const [activeSensorCount, setActiveSensorCount] = useState(10);
    // Changing this key forces the entire simulation useEffect to wipe and restart fresh
    const [gameInstanceKey, setGameInstanceKey] = useState(0);

    // Asset paths
    const roadImgPath = "/road.png";
    const bolideImgPath = "/bolide.png";
    const car1ImgPath = "/car1.png";
    const car2ImgPath = "/car2.png";
    const car3ImgPath = "/car3.png";

    // Handle game reset with a new sensor configuration
    const handleApplySensors = () => {
        const parsed = parseInt(numSensorsInput, 10);
        if (!isNaN(parsed) && parsed >= 3) {
            setActiveSensorCount(parsed);
            setGameInstanceKey(prev => prev + 1); // Increments key to trigger total reset
            setGameStatus(`Sim reset! Recording fresh dataset with ${parsed} sensors.`);
            setDataCount(0);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const imgRoad = new Image(); imgRoad.src = roadImgPath;
        const imgPlayer = new Image(); imgPlayer.src = bolideImgPath;
        const imgCar1 = new Image(); imgCar1.src = car1ImgPath;
        const imgCar2 = new Image(); imgCar2.src = car2ImgPath;
        const imgCar3 = new Image(); imgCar3.src = car3ImgPath;
        const trafficImages = [imgCar1, imgCar2, imgCar3];

        const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
        
        // Brand new clean buffers generated on every single remount!
        let dataset = [];
        let isGameOver = false;
        let roadY = 0;
        const scrollSpeed = 10;

        const player = {
            x: canvas.width / 2 - 22,
            y: canvas.height - 100,
            width: 85,
            height: 110,
            speed: 5,
            angle: 0,          
            maxAngle: 0.15,   
            rotationSpeed: 0.02,
            returnSpeed: 0.02,
            sensors: [] 
        };

        const roadLeftBound = 75;
        const roadRightBound = canvas.width - 75;
        const laneWidth = (roadRightBound - roadLeftBound) / 4;

        let traffic = [];
        let spawnTimer = 0;
        let initialSpawnInterval = 80;  // ← lower this (e.g. 60)
        let minimumSpawnInterval = 25;   // ← lower this (e.g. 15)

        const handleKeyDown = (e) => {
            if (e.key in keys) {
                e.preventDefault();
                keys[e.key] = true;
            }
        };
        const handleKeyUp = (e) => {
            if (e.key in keys) {
                e.preventDefault();
                keys[e.key] = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const exportToCSV = () => {
            if (dataset.length === 0) return;
            
            let csvContent = "data:text/csv;charset=utf-8,";
            
            // Evaluates exact size dynamically based on the active state assigned to this lifecycle
            const sampleRowLength = dataset[0].length;
            const sensorColumnsCount = sampleRowLength - 1; 
            
            const headers = [];
            for (let i = 1; i <= sensorColumnsCount; i++) {
                headers.push(`sensor_${i}`);
            }
            headers.push("control_label");
            
            csvContent += headers.join(",") + "\n";
            
            dataset.forEach(row => {
                csvContent += row.join(",") + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `driving_dataset_${activeSensorCount}sensors_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const getCurrentControlLabel = () => {
            if (keys.ArrowLeft) return "Left";
            if (keys.ArrowRight) return "Right";
            return "Still";
        };

        const checkCollision = (rect1, rect2) => {
            const paddingX = 30;
            const paddingY = 8;
            return (
                (rect1.x + paddingX) < (rect2.x + rect2.width - paddingX) &&
                (rect1.x + rect1.width - paddingX) > (rect2.x + paddingX) &&
                (rect1.y + paddingY) < (rect2.y + rect2.height - paddingY) &&
                (rect1.y + rect1.height - paddingY) > (rect2.y + paddingY)
            );
        };

        let animationFrameId;
        
        const updateFrame = () => {
            if (isGameOver) return;

            let currentLabel = getCurrentControlLabel();

            if (currentLabel === "Left") {
                player.x -= player.speed;
                if (player.angle > -player.maxAngle) player.angle -= player.rotationSpeed;
            } else if (currentLabel === "Right") {
                player.x += player.speed;
                if (player.angle < player.maxAngle) player.angle += player.rotationSpeed;
            } else {
                if (player.angle > 0) player.angle = Math.max(0, player.angle - player.returnSpeed);
                else if (player.angle < 0) player.angle = Math.min(0, player.angle + player.returnSpeed);
            }

            // Forward/backward movement — not recorded in dataset
            if (keys.ArrowUp) player.y -= player.speed;
            if (keys.ArrowDown) player.y += player.speed;

            if (player.y < 0) player.y = 0;
            if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;

            if (player.x < roadLeftBound || player.x > roadRightBound - player.width) {
                isGameOver = true;
                setGameStatus("💥 Crashed into side wall! Downloading Dataset...");
                exportToCSV();
                return;
            }

            roadY += scrollSpeed;
            if (roadY >= canvas.height) roadY = 0;

            spawnTimer++;
            const difficultyTier = Math.floor(dataset.length / 500); 
            const dynamicSpawnInterval = Math.max(minimumSpawnInterval, initialSpawnInterval - (difficultyTier * 20));

            if (spawnTimer % dynamicSpawnInterval === 0) {
                const randomLane = Math.floor(Math.random() * 4);
                const randomCarImg = trafficImages[Math.floor(Math.random() * trafficImages.length)];
                const botWidth = 110;
                const botHeight = 105; 
                const difficultySpeedBonus = Math.min(4, difficultyTier * 0.5); 
                const baseBotSpeed = scrollSpeed + 1 + Math.random() * 2;

                traffic.push({
                    x: roadLeftBound + randomLane * laneWidth + (laneWidth - botWidth) / 2,
                    y: -botHeight - 20,
                    width: botWidth,
                    height: botHeight,
                    speed: baseBotSpeed + difficultySpeedBonus,
                    img: randomCarImg,
                    lane: randomLane,
                    angle: 0,
                    laneChangeDone: false,
                    laneChangeTimer: 0,
                    laneChangeTrigger: 5 + Math.floor(Math.random() * 10), // fires 5–15 frames after spawn (while still near top of screen)
                    targetX: null,
                    laneChangeDir: 0,
                });
            }

            traffic.forEach(bot => {
                bot.y += (bot.speed - scrollSpeed + 2);

                if (!bot.laneChangeDone) {
                    bot.laneChangeTimer++;

                    // Pick a target lane once the timer fires
                    if (bot.laneChangeTimer === bot.laneChangeTrigger && bot.targetX === null) {
                        const validDirs = [];
                        if (bot.lane > 0) validDirs.push(-1);  // can go left
                        if (bot.lane < 3) validDirs.push(1);   // can go right
                        if (validDirs.length > 0 && Math.random() < 0.65) { // 65% of cars change lane
                            bot.laneChangeDir = validDirs[Math.floor(Math.random() * validDirs.length)];
                            const newLane = bot.lane + bot.laneChangeDir;
                            bot.targetX = roadLeftBound + newLane * laneWidth + (laneWidth - bot.width) / 2;
                            bot.lane = newLane;
                        } else {
                            bot.laneChangeDone = true; // this car stays put
                        }
                    }

                    // Slide toward targetX and apply tilt
                    if (bot.targetX !== null) {
                        const maxTilt = 0.18;
                        const slideSpeed = 6;
                        const diff = bot.targetX - bot.x;
                        if (Math.abs(diff) > slideSpeed) {
                            bot.x += slideSpeed * Math.sign(diff);
                            const targetAngle = maxTilt * bot.laneChangeDir;
                            bot.angle += (targetAngle - bot.angle) * 0.15;
                        } else {
                            bot.x = bot.targetX;
                            bot.targetX = null;
                            bot.laneChangeDone = true;
                        }
                    }
                }
                // Always ease angle back to 0 — runs whether changing lane or already done
                if (bot.targetX === null) {
                    bot.angle += (0 - bot.angle) * 0.15;
                }
            });
            traffic = traffic.filter(bot => bot.y < canvas.height);

            for (let bot of traffic) {
                if (checkCollision(player, bot)) {
                    isGameOver = true;
                    setGameStatus("💥 Crashed into another vehicle! Downloading Dataset...");
                    exportToCSV();
                    return;
                }
            }

            // Reads directly from the dependency array value safely
            const numSensors = activeSensorCount;
            const angles = [];
            const startAngle = -Math.PI / 2; 
            const endAngle = Math.PI / 2;   

            for (let i = 0; i < numSensors; i++) {
                const divisor = numSensors > 1 ? numSensors - 1 : 1;
                const angle = startAngle + (endAngle - startAngle) * (i / divisor);
                angles.push(angle);
            }

            const maxRayLength = 450; 
            const rayOriginsX = player.x + player.width / 2;
            const rayOriginsY = player.y;

            const computedSensors = angles.map((angle) => {
                let closestDistance = maxRayLength;
                for (let d = 0; d <= maxRayLength; d += 4) {
                    const checkX = rayOriginsX + Math.sin(angle) * d;
                    const checkY = rayOriginsY - Math.cos(angle) * d;

                    if (checkX <= roadLeftBound || checkX >= roadRightBound || checkY <= 0) {
                        closestDistance = d;
                        break;
                    }

                    let hitBot = false;
                    for (let bot of traffic) {
                        if (checkX >= bot.x && checkX <= bot.x + bot.width &&
                            checkY >= bot.y && checkY <= bot.y + bot.height) {
                            closestDistance = d;
                            hitBot = true;
                            break;
                        }
                    }
                    if (hitBot) break;
                }
                return parseFloat((closestDistance / maxRayLength).toFixed(4));
            });

            player.sensors = computedSensors;

            dataset.push([...computedSensors, currentLabel]);
            setDataCount(dataset.length);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgRoad, 0, roadY, canvas.width, canvas.height);
            ctx.drawImage(imgRoad, 0, roadY - canvas.height, canvas.width, canvas.height);

           traffic.forEach(bot => {
                ctx.save();
                const bCX = bot.x + bot.width / 2;
                const bCY = bot.y + bot.height / 2;
                ctx.translate(bCX, bCY);
                ctx.rotate(bot.angle || 0);
                if (bot.img.complete) {
                    ctx.drawImage(bot.img, -bot.width / 2, -bot.height / 2, bot.width, bot.height);
                } else {
                    ctx.fillStyle = "red";
                    ctx.fillRect(-bot.width / 2, -bot.height / 2, bot.width, bot.height);
                }
                ctx.restore();
            });

            ctx.save(); 
            const centerX = player.x + player.width / 2;
            const centerY = player.y + player.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate(player.angle);

            if (imgPlayer.complete) {
                ctx.drawImage(imgPlayer, -player.width / 2, -player.height / 2, player.width, player.height);
            } else {
                ctx.fillStyle = "blue";
                ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
            }
            ctx.restore(); 

            angles.forEach((angle, index) => {
                const currentDistance = player.sensors[index] * maxRayLength;
                const endX = rayOriginsX + Math.sin(angle) * currentDistance;
                const endY = rayOriginsY - Math.cos(angle) * currentDistance;

                ctx.beginPath();
                ctx.moveTo(rayOriginsX, rayOriginsY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = `rgba(${255 * (1 - player.sensors[index])}, ${255 * player.sensors[index]}, 0, 0.85)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(updateFrame);
        };

        animationFrameId = requestAnimationFrame(updateFrame);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
        
        // Dependency array listens to the gameInstanceKey! 
        // Whenever it goes up, this entire game resets natively.
    }, [gameInstanceKey]);

    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span className="toShow"></span>
                    <img src="nrx-logo.png" className="img-logo" alt="logo"/>
                    <p>Neurex Dataset Tool</p>
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

            <div className='car-simulation-parent-container'>
                <div className='car-simulation'>
                    <canvas ref={canvasRef} className='car-simulation-screen' />
                </div>
                <div className="model-output-panel">
                    <h3>Data Collection Monitor</h3>
                    <hr />
                    <p><strong>Status:</strong> {gameStatus}</p>
                    <p><strong>Frames Recorded:</strong> {dataCount}</p>
                    <br />
                    <h4>Control Reference Sheet:</h4>
                    <ul>
                        <li><code>Still</code> — No left/right key held</li>
                        <li><code>Left</code> — Left arrow (◀) — recorded</li>
                        <li><code>Right</code> — Right arrow (▶) — recorded</li>
                        <li>▲ / ▼ — Move forward/backward (not recorded)</li>
                    </ul>
                    <p><small style={{color: '#666'}}>Tip: Avoid hitting walls or traffic to build a clean sequence. On hit, your file triggers an auto-download instantly.</small></p>
                    
                    <hr />
                    <p>Active Sensors Setup: <strong>{activeSensorCount} columns</strong></p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                        <input 
                            type="number" 
                            min="3"
                            max="60"
                            value={numSensorsInput} 
                            onChange={(e) => setNumSensorsInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleApplySensors()}
                        />
                        <button onClick={handleApplySensors}>Apply & Restart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Demo_6 = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const nrxRef = useRef(null);
    const [gameStatus, setGameStatus] = useState("Loading autonomous model...");
    const [modelIsLoaded, setModelIsLoaded] = useState(false);
    const [rawModelOutput, setRawModelOutput] = useState([]);
    const [aiControl, setAIcontrol] = useState('Neutral');
    const [inputSensors, setInputSensors] = useState([])
    
    // Changing this key forces the entire simulation loop to reset cleanly when a crash happens
    const [gameInstanceKey, setGameInstanceKey] = useState(0);

    // Fixed configuration based on the trained model properties
    const activeSensorCount = 1000;

    // Asset paths
    const roadImgPath = "/road.png";
    const bolideImgPath = "/bolide.png";
    const car1ImgPath = "/car1.png";
    const car2ImgPath = "/car2.png";
    const car3ImgPath = "/car3.png";

    // Load the model on mount
    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await fetch("/drive.json");
                const modelData = await res.json();
                nrxRef.current = new Runtime();
                await nrxRef.current.loadSavedModel(modelData);
                
                if (isMounted) {
                    setModelIsLoaded(true);
                    setGameStatus("🤖 AI Model driving autonomously!");
                }
            } catch (error) {
                console.error("Failed to load model", error);
                if (isMounted) setGameStatus("❌ Error loading model.");
            }
        })();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        // Wait until the model is ready before beginning game updates
        if (!modelIsLoaded || !nrxRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const imgRoad = new Image(); imgRoad.src = roadImgPath;
        const imgPlayer = new Image(); imgPlayer.src = bolideImgPath;
        const imgCar1 = new Image(); imgCar1.src = car1ImgPath;
        const imgCar2 = new Image(); imgCar2.src = car2ImgPath;
        const imgCar3 = new Image(); imgCar3.src = car3ImgPath;
        const trafficImages = [imgCar1, imgCar2, imgCar3];
        
        let isGameOver = false;
        let roadY = 0;
        const scrollSpeed = 15;

        const player = {
            x: canvas.width / 2 - 22,
            y: canvas.height - 150,
            width: 85,
            height: 105,
            speed: 5,
            angle: 0,          
            maxAngle: 0.15,   
            rotationSpeed: 0.02,
            returnSpeed: 0.02,
            sensors: [] 
        };

        const roadLeftBound = 75;
        const roadRightBound = canvas.width - 75;
        const laneWidth = (roadRightBound - roadLeftBound) / 4;

        let traffic = [];
        let spawnTimer = 0;
        let initialSpawnInterval = 100;  // ← lower this (e.g. 60)
        let minimumSpawnInterval = 45;   // ← lower this (e.g. 15)
        let frameCount = 0; // Local counter to scale difficulty since dataset array is removed

        const checkCollision = (rect1, rect2) => {
            const paddingX = 30;
            const paddingY = 8;
            return (
                (rect1.x + paddingX) < (rect2.x + rect2.width - paddingX) &&
                (rect1.x + rect1.width - paddingX) > (rect2.x + paddingX) &&
                (rect1.y + paddingY) < (rect2.y + rect2.height - paddingY) &&
                (rect1.y + rect1.height - paddingY) > (rect2.y + paddingY)
            );
        };

        const triggerAutoReset = (msg) => {
            isGameOver = true;
            setGameStatus(msg);
            setTimeout(() => {
                setGameInstanceKey(prev => prev + 1);
                setGameStatus("🤖 AI Model driving autonomously!");
            }, 1200);
        };

        let animationFrameId;
        
        const updateFrame = async () => {
            if (isGameOver) return;

            frameCount++;

            // 1. Compute raycast vectors across 1000 sensors
            const numSensors = activeSensorCount;
            const angles = [];
            const startAngle = -Math.PI / 2; 
            const endAngle = Math.PI / 2;   

            for (let i = 0; i < numSensors; i++) {
                const divisor = numSensors > 1 ? numSensors - 1 : 1;
                const angle = startAngle + (endAngle - startAngle) * (i / divisor);
                angles.push(angle);
            }

            const maxRayLength = 450; 
            const rayOriginsX = player.x + player.width / 2;
            const rayOriginsY = player.y;

            const computedSensors = angles.map((angle) => {
                let closestDistance = maxRayLength;
                for (let d = 0; d <= maxRayLength; d += 4) {
                    const checkX = rayOriginsX + Math.sin(angle) * d;
                    const checkY = rayOriginsY - Math.cos(angle) * d;

                    if (checkX <= roadLeftBound || checkX >= roadRightBound || checkY <= 0) {
                        closestDistance = d;
                        break;
                    }

                    let hitBot = false;
                    for (let bot of traffic) {
                        if (checkX >= bot.x && checkX <= bot.x + bot.width &&
                            checkY >= bot.y && checkY <= bot.y + bot.height) {
                            closestDistance = d;
                            hitBot = true;
                            break;
                        }
                    }
                    if (hitBot) break;
                }
                return parseFloat((closestDistance / maxRayLength).toFixed(4));
            });

            player.sensors = computedSensors;

            // 2. Fetch autonomous execution command from your Runtime environment
            let aiCommand = "neutral";
            try {
                setInputSensors([...computedSensors]);
                // Pass matrix array containing the 1000 normalized inputs
                const predictions = await nrxRef.current.predict([computedSensors]);

                if (predictions && predictions.length > 0) {
                    aiCommand = predictions[0]; 
                }

                let controls = ["neutral", "left", "right"];

                let formattedPred = Array.from(predictions[0]);
                setRawModelOutput(formattedPred);
                let index = formattedPred.indexOf(Math.max(...formattedPred));
                
                aiCommand = controls[index];
                setAIcontrol(aiCommand);
            } catch (err) {
                console.error("Prediction error:", err);
            }

            // 3. Translate string label targets into player metrics
            // Model outputs options: ["Still", "Backward", "Right", "left"] 
            // Note: Keep lowercase/uppercase structure exactly matching your array configurations
            if (aiCommand === "Backward") {
                player.y += player.speed;
            }
            
            if (aiCommand === "left") {
                player.x -= player.speed;
                if (player.angle > -player.maxAngle) player.angle -= player.rotationSpeed;
            } else if (aiCommand === "right") {
                player.x += player.speed;
                if (player.angle < player.maxAngle) player.angle += player.rotationSpeed;
            } else {
                // Decay turning angle back to baseline when going 'Still' or directly straight
                if (player.angle > 0) player.angle = Math.max(0, player.angle - player.returnSpeed);
                else if (player.angle < 0) player.angle = Math.min(0, player.angle + player.returnSpeed);
            }

            // Constrain player position within canvas limits
            if (player.y < 0) player.y = 0;
            if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;

            // Wall Collision Check
            if (player.x < roadLeftBound || player.x > roadRightBound - player.width) {
                triggerAutoReset("💥 AI hit a side wall! Auto-restarting simulation...");
                return;
            }

            // Scroll Road Background
            roadY += scrollSpeed;
            if (roadY >= canvas.height) roadY = 0;

            // Handle Traffic Generation
            spawnTimer++;
            const difficultyTier = Math.floor(frameCount / 300); 
            const dynamicSpawnInterval = Math.max(minimumSpawnInterval, initialSpawnInterval - (difficultyTier * 8));

            if (spawnTimer % dynamicSpawnInterval === 0) {
                const randomLane = Math.floor(Math.random() * 4);
                const randomCarImg = trafficImages[Math.floor(Math.random() * trafficImages.length)];
                const botWidth = 110;
                const botHeight = 105; 
                const difficultySpeedBonus = Math.min(4, difficultyTier * 0.5); 
                const baseBotSpeed = scrollSpeed + 1 + Math.random() * 2;

                traffic.push({
                    x: roadLeftBound + randomLane * laneWidth + (laneWidth - botWidth) / 2,
                    y: -botHeight - 20,
                    width: botWidth,
                    height: botHeight,
                    speed: baseBotSpeed + difficultySpeedBonus,
                    img: randomCarImg,
                    lane: randomLane,
                    angle: 0,
                    laneChangeDone: false,
                    laneChangeTimer: 0,
                    laneChangeTrigger: 5 + Math.floor(Math.random() * 10), // fires 5–15 frames after spawn (while still near top of screen)
                    targetX: null,
                    laneChangeDir: 0,
                });
            }

            traffic.forEach(bot => {
                bot.y += (bot.speed - scrollSpeed + 2);

                if (!bot.laneChangeDone) {
                    bot.laneChangeTimer++;

                    // Pick a target lane once the timer fires
                    if (bot.laneChangeTimer === bot.laneChangeTrigger && bot.targetX === null) {
                        const validDirs = [];
                        if (bot.lane > 0) validDirs.push(-1);  // can go left
                        if (bot.lane < 3) validDirs.push(1);   // can go right
                        if (validDirs.length > 0 && Math.random() < 0.65) { // 65% of cars change lane
                            bot.laneChangeDir = validDirs[Math.floor(Math.random() * validDirs.length)];
                            const newLane = bot.lane + bot.laneChangeDir;
                            bot.targetX = roadLeftBound + newLane * laneWidth + (laneWidth - bot.width) / 2;
                            bot.lane = newLane;
                        } else {
                            bot.laneChangeDone = true; // this car stays put
                        }
                    }

                    // Slide toward targetX and apply tilt
                    if (bot.targetX !== null) {
                        const maxTilt = 0.18;
                        const slideSpeed = 6;
                        const diff = bot.targetX - bot.x;
                        if (Math.abs(diff) > slideSpeed) {
                            bot.x += slideSpeed * Math.sign(diff);
                            const targetAngle = maxTilt * bot.laneChangeDir;
                            bot.angle += (targetAngle - bot.angle) * 0.15;
                        } else {
                            bot.x = bot.targetX;
                            bot.targetX = null;
                            bot.laneChangeDone = true;
                        }
                    }
                }
                // Always ease angle back to 0 — runs whether changing lane or already done
                if (bot.targetX === null) {
                    bot.angle += (0 - bot.angle) * 0.15;
                }
            });
            traffic = traffic.filter(bot => bot.y < canvas.height);

            // Traffic Vehicle Collision Check
            for (let bot of traffic) {
                if (checkCollision(player, bot)) {
                    triggerAutoReset("💥 AI crashed into traffic! Auto-restarting simulation...");
                    return;
                }
            }

            // 4. Render Layout Elements onto HTML Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgRoad, 0, roadY, canvas.width, canvas.height);
            ctx.drawImage(imgRoad, 0, roadY - canvas.height, canvas.width, canvas.height);

            traffic.forEach(bot => {
                ctx.save();
                const bCX = bot.x + bot.width / 2;
                const bCY = bot.y + bot.height / 2;
                ctx.translate(bCX, bCY);
                ctx.rotate(bot.angle || 0);
                if (bot.img.complete) {
                    ctx.drawImage(bot.img, -bot.width / 2, -bot.height / 2, bot.width, bot.height);
                } else {
                    ctx.fillStyle = "red";
                    ctx.fillRect(-bot.width / 2, -bot.height / 2, bot.width, bot.height);
                }
                ctx.restore();
            });

            ctx.save(); 
            const centerX = player.x + player.width / 2;
            const centerY = player.y + player.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate(player.angle);

            if (imgPlayer.complete) {
                ctx.drawImage(imgPlayer, -player.width / 2, -player.height / 2, player.width, player.height);
            } else {
                ctx.fillStyle = "blue";
                ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
            }
            ctx.restore(); 

            // Render every 20th ray path line to minimize frame canvas rendering clutter
            angles.forEach((angle, index) => {
                if (index % 20 !== 0) return; 
                const currentDistance = player.sensors[index] * maxRayLength;
                const endX = rayOriginsX + Math.sin(angle) * currentDistance;
                const endY = rayOriginsY - Math.cos(angle) * currentDistance;

                ctx.beginPath();
                ctx.moveTo(rayOriginsX, rayOriginsY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = `rgba(${255 * (1 - player.sensors[index])}, ${255 * player.sensors[index]}, 0, 0.35)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(updateFrame);
        };

        animationFrameId = requestAnimationFrame(updateFrame);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };

    }, [modelIsLoaded, gameInstanceKey]);

    const visualSensors = inputSensors.length > 100 
        ? inputSensors.filter((_, index) => index % 10 === 0)
        : inputSensors;

    return (
        <>
            <header style={{position:'static'}}>
                <div className="header-left-branding">
                    <span className="toShow"></span>
                    <img src="nrx-logo.png" className="img-logo" alt="logo"/>
                    <p>Self-Driving AI</p>
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

            <div className='car-simulation-parent-container'>
                <div className='car-simulation'>
                    <canvas ref={canvasRef} className='car-simulation-screen' />
                </div>
                <div className="model-output-panel">
                    <h3>Self-Driving Live Demo</h3>
                    <hr />
                    <p><strong>System Status:</strong> {gameStatus}</p>
                    <p><strong>Input Parameters:</strong> {activeSensorCount} active rays</p>
                    <br />
                    <h4>Model Output Matrix Mapping:</h4>
                    <ul>
                        <li><code>"Neutral"</code> — Maintain direction</li>
                        <li><code>"left"</code> — Turn Left wheel vector</li>
                        <li><code>"Right"</code> — Turn Right wheel vector</li>
                    </ul>
                    <p><small style={{color: '#666'}}>Notice: Manual controls are disabled. The runtime application resolves decisions frame-by-frame via the live JSON network architecture configuration.</small></p>
                    <p>Model output: [{parseFloat(rawModelOutput[0]).toFixed(4)}, {parseFloat(rawModelOutput[1]).toFixed(4)}, {parseFloat(rawModelOutput[2]).toFixed(4)}]</p>
                    <p>Output control: [{aiControl}]</p><br/>
                    <p><b>Sensor Graph</b></p>
                    <ProbabilityChart probabilities={visualSensors} graphTitle={'Sensor graph'}/>
                </div>
            </div>
        </>
    );
};