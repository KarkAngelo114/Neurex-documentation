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
import {Dropdown, DropdownOption} from '../../custom-components/dropdown';


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
                    <p>Genuine vs Spoofed</p>
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