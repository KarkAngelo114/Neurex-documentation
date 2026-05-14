import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../scripts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFrown } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { SideDrawer } from "../custom-components/side-drawer";

export const ModelsPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
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
                    <p className="animated-orange-underline current-highlighted">Models</p>
                    <p className="animated-orange-underline" onClick={() => navigate('/demo')} >Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                </SideDrawer>

                <div className="nav toHide">
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/api")}>Guide</p>
                    <p className="animated-orange-underline current-highlighted">Models</p>
                    <p className="animated-orange-underline" onClick={() => navigate('/demo')} >Demos</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                    <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                </div>
            </header>

            <section className="section-1">
                <div className="centered-hero-page-title">
                    <div style={{width:'50%'}}>
                        <h1>Neurex models</h1>
                        <p>Explore all existing pre-trained models designed for common tasks applicable in various applications</p>
                    </div>
                </div>

                <div className="model-list-container">
                    {/* Delete this if there are already available models */}
                    <div className="note">
                        <FontAwesomeIcon icon={faFrown} size="2x"/>
                        <p>It looks like there are no available models yet.</p>
                    </div>
                </div>
            </section>

            <section className="banner solar-flare-gradient-bg">
                <h1>Get started with NeurexJS</h1>
                <button type = "button"className="explore-more-btn" onClick = {() => navigate('/api')}>Explore Tutorials</button>
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