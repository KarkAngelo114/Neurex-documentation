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