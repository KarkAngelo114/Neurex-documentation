import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faChevronCircleUp, faChevronUp, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../scripts";
import { useEffect, useState } from "react";
import { SideDrawer } from "../custom-components/side-drawer";
import { Dropdown, DropdownOption } from "../custom-components/dropdown";


export const Javascript_Browser = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownClicked, setIsDropDownClicked] = useState(false);

    useEffect(() => {
        window.hljs.highlightAll();
    },[]);

    const scrollTop = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
    return (
        <>
            <header>
                <div className="header-left-branding">
                    <span  className="toShow" onClick={() => setIsOpen(true)}><FontAwesomeIcon icon={faBars}/></span>
                    <img src = "nrx-logo.png" className="img-logo"/>
                    <p>Neurex</p>
                </div>
            

                <SideDrawer isOpen={isOpen} action={() => setIsOpen(false)}>
                    <div className="nav-items">
                        <div className="header-left-branding">
                            <span className="toShow" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                            </span>
                            <img src="nrx-logo.png" className="img-logo" alt="logo" />
                            <p>Neurex</p>
                        </div>
                        <div style={{overflow:'auto'}}>
                            <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                            <p className="animated-orange-underline  current-highlighted">Guide</p>
                            <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                            <p className="animated-orange-underline" onClick={() => navigate('/demo')}>Demos</p>
                            <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex')}>Github</p>
                            <p className="animated-orange-underline" onClick={() => NavigateTo('https://www.npmjs.com/package/neurex')}>NPM</p>
                            <p className="animated-orange-underline" onClick={() => NavigateTo('https://github.com/KarkAngelo114/Neurex/blob/main/CHANGELOG.md')}>Changelog</p>
                            <hr style={{padding:1, background:'black'}}/>
                            <div>
                                <p><a href = "#installation" onClick={() => setIsOpen(false)}>Installation guide</a></p>
                                <p><a href = "#getting-started" onClick={() => setIsOpen(false)}>Getting Started</a></p>
                                <p><a href = "#runtime-class" onClick={() => setIsOpen(false)}>The Runtime class</a></p>
                                <p><a href = "#load-saved-model" onClick={() => setIsOpen(false)}>&nbsp;&nbsp;loadSavedModel()</a></p>
                                <p><a href = "#predict" onClick={() => setIsOpen(false)}>&nbsp;&nbsp;predict()</a></p>
                            </div>
                        </div>
                    </div>
                </SideDrawer>

                <div className="nav toHide">
                    <p className="animated-orange-underline" onClick={() => navigate("/")}>Overview</p>
                    <p className="animated-orange-underline  current-highlighted">Guide</p>
                    <p className="animated-orange-underline" onClick={() => navigate("/models")}>Models</p>
                    <p className="animated-orange-underline" onClick={() => navigate('/demo')}>Demos</p>
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
            
            <div className="top-ribbon">
                <div className="ribbon-nav">
                    <p className="animated-orange-underline" onClick={() => navigate('/javascript-nodejs')}>NodeJS</p>
                    <p className="animated-orange-underline current-highlighted">Browser-based</p>
                </div>
            </div>
            <div className="ribbon">
                <p>Javascript (Browser)</p>
            </div>

            <section className = "main-wrapper">
                <div className="navigation toHide">
                    <aside className="navigation-container">
                        <p><a href = "#installation">Installation guide</a></p>
                        <p><a href = "#getting-started">Getting Started</a></p>
                        <p><a href = "#runtime-class">The <code>Runtime</code> class</a></p>
                        <p><a href = "#load-saved-model">&nbsp;&nbsp;<code>loadSavedModel()</code></a></p>
                        <p><a href = "#predict">&nbsp;&nbsp;<code>predict()</code></a></p>
                    </aside>
                </div>

                <div className="main-container" style={{padding: '5%'}}>

                    <div id = "installation" className="content-box">
                        <h1 className="orange-accent-underline">Installation Guide</h1>
                        <p>Install via NPM:</p>

                        <div style={{padding: '10px', borderRadius:10, backgroundColor:'#1e1e1e', color:'white', width:'100%'}}>
                            <code>
                                npm install neurex-runtime
                            </code>
                        </div>

                        <p>Via CDN:</p>

                        <div style={{padding: '10px', borderRadius:10, backgroundColor:'#1e1e1e', color:'white', width:'100%'}}>
                            <code>
                                {`<script src="https://cdn.jsdelivr.net/npm/neurex-runtime/dist/neurex-runtime.umd.js"></script>`}
                            </code>
                        </div>
                    </div>

                    <div id = "getting-started" className="content-box">
                        <h1 className="orange-accent-underline">Getting Started</h1>

                        <p>
                            The <code>neurex-runtime</code> is a browser-compatible port of the main library <code>NeurexJS</code> wherein you can run in-browser inference
                            predictions, without having to setup backend applications just to serve a trained model, and without the need for user data to leave on browser,
                            enhancing user-privacy and safety. You can also run inference predictions offline if done correctly, which can give a huge advantage for most web apps
                            that can work offline.
                        </p>

                        <p>
                            The library does not directly load an <code>.nrx</code> model — <code>loadSavedModel()</code> accepts parsed JSON only.
                            To use your trained model, convert your <code>.nrx</code> file to JSON format by visiting{' '}
                            <a href="/convert-to-json">the converter tool</a>. Once converted, you can fetch the JSON file and pass the parsed data to <code>loadSavedModel()</code>.
                        </p>

                        <h3>Usage — Vanilla HTML</h3>
                        <p>
                            If you're working on a plain HTML project, include the library via CDN and use the <code>NeurexRuntime</code> global.
                            The example below loads an XOR model and runs inference on two inputs:
                        </p>

                        <pre>
                            <code className="language-html" style={{backgroundColor: '#000000'}}>
{`<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/neurex-runtime/dist/neurex-runtime.umd.js"></script>
    </head>

    <body>
        <input type="number" id="num1" />
        <input type="number" id="num2" />
        <button type="button" onclick="predict()">Predict</button>
        <p>Output is: <span id="output"></span></p>
    </body>

    <script>
        let nrx;

        (async () => {
            const res = await fetch('./XOR.json'); // fetch the JSON model file
            const model = await res.json();        // parse the JSON response

            nrx = new NeurexRuntime.Runtime();     // initialize the Runtime
            await nrx.loadSavedModel(model);       // load the model
        })();

        async function predict() {
            const num1 = document.getElementById('num1').value;
            const num2 = document.getElementById('num2').value;
            const input = [parseInt(num1), parseInt(num2)];

            // predict() accepts a matrix: [[val1, val2], [val3, val4], ...]
            const pred = await nrx.predict([input]);

            document.getElementById('output').innerText = Array.from(pred[0]);
        }
    </script>
</html>`}
                            </code>
                        </pre>

                        <h3>Usage — JS Frameworks (e.g. React)</h3>
                        <p>
                            When working inside a JS framework, import the <code>Runtime</code> class directly from the package.
                            Use <code>useRef</code> to hold the class instance across renders so it isn't re-initialized on every render cycle.
                        </p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`import { useEffect, useState, useRef } from 'react';
import { Runtime } from 'neurex-runtime';

function App() {
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const nrx = useRef(null); // hold the instance across renders

    useEffect(() => {
        const init = async () => {
            nrx.current = new Runtime();

            // ensure your model JSON is placed inside the "public" folder
            const res = await fetch('/model.json');
            const modelData = await res.json();

            await nrx.current.loadSavedModel(modelData);
            setIsModelLoaded(true);
        };

        init();
    }, []);

    const handlePrediction = async () => {
        // prepare your input — can be preprocessed image pixels,
        // sensor readings, or any numeric feature array
        const input = [0.0834, 0.4968, 0.4535];

        const pred = await nrx.current.predict([input]);

        // outputs are Float32Array — use Array.from() to convert if needed
        console.log(Array.from(pred[0]));
    };

    return (
        <>
            <button onClick={handlePrediction} disabled={!isModelLoaded}>
                Run Inference
            </button>
        </>
    );
}

export default App;`}
                            </code>
                        </pre>
                    </div>

                    <div id = "runtime-class" className="content-box">
                        <h1 className="orange-accent-underline">The <code>Runtime</code> class</h1>

                        <p>
                            <code>Runtime</code> is the core class of <code>neurex-runtime</code>. It mirrors the <code>Neurex</code> class
                            from the main <code>NeurexJS</code> library but is designed exclusively for browser environments — it can load
                            models and run inference predictions, but does not expose training functionality.
                        </p>

                        <p>When using the CDN build, the class is accessed via the <code>NeurexRuntime</code> global namespace:</p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`// CDN / vanilla JS
const nrx = new NeurexRuntime.Runtime();

// NPM / ES module import
import { Runtime } from 'neurex-runtime';
const nrx = new Runtime();`}
                            </code>
                        </pre>

                        <p>After instantiation, call <code>loadSavedModel()</code> before making any predictions.</p>
                    </div>

                    <div id = "load-saved-model" className="content-box">
                        <h2 className="orange-accent-underline"><code>loadSavedModel(modelData)</code></h2>

                        <p>
                            Loads and reconstructs a trained model from parsed JSON data. This method must be called and awaited
                            before any calls to <code>predict()</code>.
                        </p>

                        <p>
                            Unlike the main <code>NeurexJS</code> library which can load <code>.nrx</code> binary files directly,
                            the browser runtime accepts only parsed JSON. To convert a <code>.nrx</code> model to JSON, use the{' '}
                            <a href="/convert-to-json" style={{color:"orangered", fontWeight:600}} className="animated-orange-underline">converter tool</a>.
                        </p>

                        <h4>Parameters</h4>
                        <table style={{width:'100%', borderCollapse:'collapse', marginBottom:'1rem'}}>
                            <thead>
                                <tr style={{borderBottom:'2px solid #e0e0e0', textAlign:'left'}}>
                                    <th style={{padding:'8px 12px'}}>Name</th>
                                    <th style={{padding:'8px 12px'}}>Type</th>
                                    <th style={{padding:'8px 12px'}}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{borderBottom:'1px solid #e0e0e0'}}>
                                    <td style={{padding:'8px 12px'}}><code>modelData</code></td>
                                    <td style={{padding:'8px 12px'}}><code>Object</code></td>
                                    <td style={{padding:'8px 12px'}}>The parsed JSON object representing the model. Obtain this by calling <code>JSON.parse()</code> or <code>res.json()</code> on your model file.</td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>Returns</h4>
                        <p><code>Promise&lt;void&gt;</code> — resolves when the model is fully reconstructed and ready for inference.</p>

                        <h4>Throws</h4>
                        <div style={{display:'flex', alignItems:'flex-start', gap:'10px', padding:'12px', borderRadius:'8px', backgroundColor:'#fff3cd', border:'1px solid #ffc107', marginBottom:'1rem'}}>
                            <FontAwesomeIcon icon={faExclamationCircle} style={{color:'#856404', marginTop:'3px', flexShrink:0}}/>
                            <p style={{margin:0, color:'#856404'}}>
                                Throws an <code>Error</code> if the JSON data is malformed, missing required fields, or the model configuration is invalid.
                            </p>
                        </div>

                        <h4>Example</h4>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`const nrx = new NeurexRuntime.Runtime();

const res = await fetch('./my-model.json');
const modelData = await res.json(); // parse the JSON first

await nrx.loadSavedModel(modelData); // then pass the parsed object`}
                            </code>
                        </pre>
                    </div>

                    <div id = "predict" className="content-box">
                        <h2 className="orange-accent-underline"><code>predict(input)</code></h2>

                        <p>
                            Runs a forward-pass inference on the loaded model and returns the output predictions.
                            <code>loadSavedModel()</code> must be called and awaited before using this method.
                        </p>

                        <h4>Parameters</h4>
                        <table style={{width:'100%', borderCollapse:'collapse', marginBottom:'1rem'}}>
                            <thead>
                                <tr style={{borderBottom:'2px solid #e0e0e0', textAlign:'left'}}>
                                    <th style={{padding:'8px 12px'}}>Name</th>
                                    <th style={{padding:'8px 12px'}}>Type</th>
                                    <th style={{padding:'8px 12px'}}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{borderBottom:'1px solid #e0e0e0'}}>
                                    <td style={{padding:'8px 12px'}}><code>input</code></td>
                                    <td style={{padding:'8px 12px'}}><code>Number[][]</code></td>
                                    <td style={{padding:'8px 12px'}}>
                                        A 2D matrix of numeric input values. Each inner array is one sample.
                                        You can pass multiple samples at once — e.g. <code>[[0,1],[1,0],[1,1],[0,0]]</code>.
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h4>Returns</h4>
                        <p>
                            <code>Promise&lt;Float32Array&gt;</code> — the raw output of the network's final layer.
                            Use <code>Array.from(pred[0])</code> to convert the result to a standard JavaScript array if needed.
                        </p>

                        <h4>Throws</h4>
                        <div style={{display:'flex', alignItems:'flex-start', gap:'10px', padding:'12px', borderRadius:'8px', backgroundColor:'#fff3cd', border:'1px solid #ffc107', marginBottom:'1rem'}}>
                            <FontAwesomeIcon icon={faExclamationCircle} style={{color:'#856404', marginTop:'3px', flexShrink:0}}/>
                            <p style={{margin:0, color:'#856404'}}>
                                Throws an <code>Error</code> if the input data is missing, empty, or its shape does not match the model's expected input shape.
                            </p>
                        </div>

                        <h4>Example</h4>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`// single sample
const pred = await nrx.predict([[0, 1]]);
console.log(Array.from(pred[0])); // e.g. [0.987]

// batch of samples
const batchPred = await nrx.predict([[0, 1], [1, 0], [1, 1], [0, 0]]);
batchPred.forEach((output, i) => {
    console.log(\`Sample \${i}:\`, Array.from(output));
});

// with preprocessed float data (e.g. image pixels)
const pixels = [0.0834, 0.4968, 0.4535]; // flattened, normalized pixel array
const result = await nrx.predict([pixels]);
console.log(Array.from(result[0]));`}
                            </code>
                        </pre>
                    </div>

                </div>

                <div className="bottom-btn-container">
                    <button className="scrollTop-btn" onClick={scrollTop}><FontAwesomeIcon icon={faChevronUp}/></button>
                </div>
            </section>
        </>
    );
}
