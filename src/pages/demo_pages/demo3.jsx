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
