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
                            <img src = "/face-detection.jpg" className="demo-thumbnail-image" alt="https://www.freepik.com/free-vector/woman-face-scan-process_5597103.htm#fromView=search&page=1&position=18&uuid=d515bfb6-97bc-4aac-88bb-e73fbc511d9a&query=Face+detection+real+vs+fake+thumbnail+BG"/>
                        </div>
                        <div style={{minHeight: '250px'}}>
                            <h2>Face Liveness Detection</h2>
                            <p>Learn how a well-trained CNN model classify between genuine (live) or fake (spoofed) face image</p>

                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/digits-recognition')}>
                        <div className="thumbnail-container">
                            <img src="/hand-written-digits.jpg" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Hand Written Digits Recognizer</h2>
                            <p>An interactive demo where you can hand written a single digits and let the model predict what number your wrote.</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/spam-ham')}>
                        <div className="thumbnail-container">
                            <img src="/spam.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Text Classification (ham vs spam)</h2>
                            <p>Classify texts/messages if it's a kind of a spam message or legitimate ones.</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/XOR')}>
                        <div className="thumbnail-container">
                            <img src="/xor.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>XOR</h2>
                            <p>Flick switches to add signal and let the trained model outputs an XOR predictions</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/ai-snake-game')}>
                        <div className="thumbnail-container">
                            <img src="/snake.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Snake game</h2>
                            <p>Watch how a trained ANN model plays a snake game</p>
                        </div>
                        <hr/>
                    </div>

                    <div className="demo-project-item-box" onClick={() => navigate('/ai-car')}>
                        <div className="thumbnail-container">
                            <img src="/car-simulator.png" className="demo-thumbnail-image"/>
                        </div>
                        
                        <div style={{minHeight: '250px'}}>
                            <h2>Self-driving car</h2>
                            <p>A self-driving car powered by a trained neural network model that avoids car crashes.</p>
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