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
                    <p>Digits Recognition</p>
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
                        <ProbabilityChart probabilities={probability_scores} graphTitle={'Probabilities'}/>
                    </div>
                </div>
            </section>
        </>
    );
}