import { faArrowUp, faBars, faChevronUp, faNetworkWired, faRocket, faSyncAlt, faWebAwesome } from "@fortawesome/free-solid-svg-icons";
import { fetch_contributor, fetch_package_stats, NavigateTo } from "../scripts";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideDrawer } from "../custom-components/side-drawer";
import { motion } from "framer-motion";
import { Parallax } from '../custom-components/parallaxBG';
import {Dropdown, DropdownOption} from '../custom-components/dropdown';


export const Home = () => {
    const navigate = useNavigate();
    const iconStyle = { color: "#ff9d00", fontSize: "1.5rem", marginBottom: "1rem", padding:'20px', background:"#f7d27599", borderRadius:"1000px"};

    const [version, setVersion] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [downloads, setDownloads] = useState(0);
    const [scrolly, setScrollY] = useState(0);
    const [isDropdownClicked, setIsDropDownClicked] = useState(false);
    const [contributors_pfp, set_constributor_pfp] = useState([
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg"
    ]);

    useEffect(() => {
        fetch_package_data();
        Get_Contributors();
        const handleScroll = () => setScrollY(window.scrollY);
        document.addEventListener('scroll', handleScroll);
        
        return () => document.removeEventListener('scroll', handleScroll);
    },[]);


    const fetch_package_data = async () => {
        const data = await fetch_package_stats('neurex');
        setVersion(data.version);
        setDownloads(data.downloads);
    };

    const Get_Contributors = async () => {
        const data = await fetch_contributor();
        set_constributor_pfp(data.profile_pics);
    }


    return (
        <>
            <header style={{position:'fixed', color:scrolly > 120 ?"black": "white", background:scrolly > 120 ?"white":"transparent", transition:"all 0.3s ease-in-out"}}>
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
                        <p className="animated-orange-underline current-highlighted">Overview</p>
                        <p className="animated-orange-underline" onClick={() => navigate("/javascript-nodejs")}>Guide</p>
                        <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                        <p className="animated-orange-underline" onClick={() => navigate('/demo')}>Demos</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                        <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                    </div>
                </SideDrawer>

                <div className="nav toHide">
                    <p className="animated-orange-underline current-highlighted">Overview</p>
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

            <Parallax image={"ANN.png"}>
                <div className="hero-section-transparent-background" style={{paddingTop:"10%", color:'white'}}>
                    <div className="container">
                        <div className="hero-section-title-container">
                            <h1><span className="solar-flare-gradient-text hero-section-title">NeurexJS</span> is a deep learning library for NodeJS</h1>
                            <p>Build, train, and deploy to your applications</p><br></br>   
                            <p>Version: <span>{version}</span> | Downloads: <span>{downloads}</span> downloads (last month)</p>
                        </div>
                    </div>
                    <div className="container">
                        <img src="sample-code.png" className="code-snippet-img"/>
                    </div>
                </div>
            </Parallax>

            <section className="section-1">
                <div className="section-title">
                    <h1><span className="solar-flare-gradient-text">How it works</span></h1>
                </div>
                <div className="box-container-1">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{duration: 0.6, delay: 0.3,ease: "easeOut"}} 
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="box">
                            <FontAwesomeIcon icon={faNetworkWired} style={iconStyle}/>
                            <p>Build neural network models on Javascript</p>
                            <div className="box-text-container">
                                <p>Build and train models using intuitive APIs. </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{duration: 0.6, delay: 0.6,ease: "easeOut"}} 
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="box">
                            <FontAwesomeIcon icon={faSyncAlt} style={iconStyle} />
                            <p>Retrain existing models</p>
                            <div className="box-text-container">
                                <p>Retrain and utilize existing models that suites your need.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{duration: 0.6, delay: 0.9,ease: "easeOut"}} 
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <div className="box">
                            <FontAwesomeIcon icon={faRocket} style={iconStyle}/>
                            <p>Deploy to your applications</p>
                            <div className="box-text-container">
                                <p>Deploy to your applications, whether on your backend NodeJS app or run directly in your browser.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-2">
                <div className="section-title">
                    <h1><span className="solar-flare-gradient-text">Why use NeurexJS</span></h1>
                </div>
                <div className="box-container-2">
                    <div className="reason-box">
                        <div style={{backgroundColor:'#e8e8e8', padding:'5px', top:0, position:'relative', fontWeight:'bold'}}>
                            <p>Modular</p>
                        </div>
                        <div style={{padding:'10px'}}>
                            <p>Neurex implementation is modular to allow easy extendability</p>
                        </div>
                    </div>
                    <div className="reason-box">
                        <div style={{backgroundColor:'#ebe9e9', padding:'5px', top:0, position:'relative', fontWeight:'bold'}}>
                            <p>Simple to use</p>
                        </div>
                        <div style={{padding:'10px'}}>
                            <p>Has intuitive APIs you can use. No need to understand internal workings.</p>
                        </div>
                    </div>
                    <div className="reason-box">
                        <div style={{backgroundColor:'#ebe9e9', padding:'5px', top:0, position:'relative', fontWeight:'bold'}}>
                            <p>Educational</p>
                        </div>
                        <div style={{padding:'10px'}}>
                            <p>Good for experimenting or learning how to build Neural networks</p>
                        </div>
                    </div>
                    <div className="reason-box">
                        <div style={{backgroundColor:'#ebe9e9', padding:'5px', top:0, position:'relative', fontWeight:'bold'}}>
                            <p>Production-ready</p>
                        </div>
                        <div style={{padding:'10px'}}>
                            <p>Stable for production use and easy model loading and inferencing</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="web-info-container">
                <div className = "web-image-container">
                    <img src = "/web.png" className="web-image"/>
                </div>
                <div style={{width:'100%'}}>
                    <h1>Bring Intelligence right on your browser</h1>
                    <br/>

                    <p style={{fontSize:"1.3rem"}}>Deploy and use trained models directly on your browsers with ease.</p>
                    
                    <br/>
                    <a href="/javascript-browser" style={{textDecoration:"underline"}}>Learn more <FontAwesomeIcon icon={faArrowUp} transform={{ rotate: 42 }}/></a>
                </div>
            </div>

            <section className="banner solar-flare-gradient-bg">
                <h1>Get started with NeurexJS</h1>
                <button type = "button"className="explore-more-btn" onClick={() => navigate('/javascript-nodejs')}>Explore Tutorials</button>
            </section>

            <section className="contributors-section" style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Contributors</h1>

                <div
                    className="contributors-grid"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "15px"
                    }}
                >
                    {contributors_pfp.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Contributor ${index + 1}`}
                        style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #ccc"
                        }}
                    />
                    ))}
                </div>
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