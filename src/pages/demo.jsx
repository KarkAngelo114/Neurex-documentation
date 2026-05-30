import { faBars, faCamera, faNetworkWired, faPaperPlane, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    const [res, setRes] = useState({
        classification: "",
        score: 0.0
    });

    const submitText = async () => {
        const {StatusCode, data} = await usePost('/api/neurex/classify-text', {text:text});

       setRes(data);
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
                        <button type="button" className="solar-flare-gradient-bg submit-btn" onClick={() => submitText()}>Submit</button>
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


export const Demo_Page = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                    <p className="animated-orange-underline" onClick={() => navigate("/api")}>Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline  current-highlighted" onClick={() => navigate('/demo')}>Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                </SideDrawer>
                <div className="nav toHide">
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/api")}>Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline  current-highlighted" onClick={() => navigate('/demo')}>Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
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
                    <div className="demo-project-item-box">
                        <div className="thumbnail-container">
                            <img src = "face-detection.jpg" className="demo-thumbnail-image" alt="https://www.freepik.com/free-vector/woman-face-scan-process_5597103.htm#fromView=search&page=1&position=18&uuid=d515bfb6-97bc-4aac-88bb-e73fbc511d9a&query=Face+detection+real+vs+fake+thumbnail+BG"/>
                        </div>
                        <div style={{minHeight: '250px'}}>
                            <h2>Face Liveness Detection</h2>
                            <p>Learn how a well-trained CNN model classify between genuine (live) or fake (spoofed) face image</p>

                        </div>
                        <hr></hr>
                        <div>
                            <button type = "button"className="explore-more-btn" onClick={() => navigate('/face-liveliness-tests')} style={{padding:5, borderRadius: 5}}>Try it</button>
                        </div>
                    </div>

                    <div className="demo-project-item-box">
                        <div className="thumbnail-container">
                            <img src="hand-written-digits.jpg" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Hand Written Digits Recognizer</h2>
                            <p>An interactive demo where you can hand written a single digits and let the model predict what number your wrote.</p>
                        </div>
                        <hr></hr>
                        <div style = {{paddingBottom: '20px'}}>
                            <button type = "button"className="explore-more-btn" onClick={() => navigate('/digits-recognition')} style={{padding:5, borderRadius: 5}}>Try it</button>
                        </div>
                    </div>

                    <div className="demo-project-item-box">
                        <div className="thumbnail-container">
                            <img src="spam.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Text Classification (ham vs spam)</h2>
                            <p>Classify texts/messages if it's a kind of a spam message or legitimate ones.</p>
                        </div>
                        <hr></hr>
                        <div style = {{paddingBottom: '20px'}}>
                            <button type = "button"className="explore-more-btn" onClick={() => navigate('/spam-ham')} style={{padding:5, borderRadius: 5}}>Try it</button>
                        </div>
                    </div>

                </div>
            </section>

            <section className="banner solar-flare-gradient-bg">
                <h1>Get started with NeurexJS</h1>
                <button type = "button"className="explore-more-btn" onClick={() => navigate('/api')}>Explore Tutorials</button>
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