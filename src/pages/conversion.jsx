import { faBars, faChevronUp, faNetworkWired, faRocket, faSyncAlt, faWebAwesome } from "@fortawesome/free-solid-svg-icons";
import { fetch_contributor, fetch_package_stats, NavigateTo } from "../scripts";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideDrawer } from "../custom-components/side-drawer";
import { motion } from "framer-motion";
import { Parallax } from '../custom-components/parallaxBG';
import {Dropdown, DropdownOption} from '../custom-components/dropdown';

export const Convert = () => {

    const navigate = useNavigate();
    const iconStyle = { color: "#ff9d00", fontSize: "1.5rem", marginBottom: "1rem", padding:'20px', background:"#f7d27599", borderRadius:"1000px"};

    const [isOpen, setIsOpen] = useState(false);
    const [scrolly, setScrollY] = useState(0);
    const [isDropdownClicked, setIsDropDownClicked] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        document.addEventListener('scroll', handleScroll);
        
        return () => document.removeEventListener('scroll', handleScroll);
    },[]);

    const triggerJsonDownload = (jsonData, targetFilename) => {
        const stringifiedJson = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([stringifiedJson], { type: "application/json" });
        const blobUrl = URL.createObjectURL(blob);

        const downloadAnchor = document.createElement("a");
        downloadAnchor.href = blobUrl;
        downloadAnchor.download = targetFilename;
        
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
    

        document.body.removeChild(downloadAnchor);
        URL.revokeObjectURL(blobUrl);
    };

    const handleConversion = async () => {
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();

            const headerDecoder = new TextDecoder("utf-8");
            const headerBytes = arrayBuffer.slice(0, 4);
            const header = headerDecoder.decode(headerBytes);

            if (header !== "NRX3") {
                alert("Invalid file type: Missing NRX3 header signature.");
                return;
            }

            const versionView = new DataView(arrayBuffer, 4, 1);
            const version = versionView.getUint8(0);

            if (version !== 3) {
                alert(`Unsupported NRX version format: ${version}`);
                return;
            }

            const compressedData = arrayBuffer.slice(5);

            const decompressionStream = new DecompressionStream("deflate");
            const responseStream = new Response(compressedData).body.pipeThrough(decompressionStream);

            const decompressedResponse = new Response(responseStream);
            const jsonText = await decompressedResponse.text();

            // 7. Parse string into your model configuration object
            const modelJSON = JSON.parse(jsonText);

            triggerJsonDownload(modelJSON, file.name.replace(".nrx", ".json"));

        } catch (error) {
            console.error("Conversion error:", error);
            alert("Failed to convert .nrx file. Check if the file is corrupted.");
        }
    };

    return (
        <>
            <header style={{position:'sticky', color:"black", top:0}}>
                <div className="header-left-branding">
                    <span  className="toShow" onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faBars}/></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>

                <SideDrawer isOpen={isOpen} action={() => setIsOpen(false)}>
                    <div style={{color:'black'}}>
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
                        <p className="animated-orange-underline" onClick={() => navigate('/demo')}>Demos</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                    </div>
                </SideDrawer>

                <div className="nav toHide">
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/javascript-nodejs")}>Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline" onClick={() => navigate('/demo')}>Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                    <Dropdown
                        bg="#00000000"
                        fg={scrolly > 120 ?"black": "white"}
                        isClicked={isDropdownClicked}
                        action={() => setIsDropDownClicked(!isDropdownClicked)}
                        component_label={<p className="current-highlighted animated-orange-underline">Tools <FontAwesomeIcon icon={faChevronUp} style={{
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

            <div className="conversion-ui-parent-container">
                <div className="hero-section-box hero-section-splash-text">
                    <div className="splash-text-container">
                        <h1>Convert <code>.nrx</code> models to JSON</h1>
                        <p>Convert your trained models to browser compatible JSON format for in-browser inferencing</p>

                        {!file ? (
                            <input 
                                type="file" 
                                accept=".nrx" 
                                className="file-input" 
                                onChange={(e) => setFile(e.target.files[0])} 
                            />
                        ) : (
                            <div>
                                <p>Selected: {file.name}</p>
                                <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", gap:"10px"}}>
                                    <button onClick={handleConversion} type="button" className="convert-btn">Convert to JSON</button>
                                    <button onClick={() => setFile(null)} className="reset-btn">Reset</button>
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>
                <div className="hero-section-box">
                    <img src = "/converter-splash-screen.png" className="splash"/>
                </div>
            </div>

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
}