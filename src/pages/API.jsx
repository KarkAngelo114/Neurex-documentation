import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faChevronCircleUp, faChevronUp, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../scripts";
import { useEffect, useState } from "react";
import { SideDrawer } from "../custom-components/side-drawer";


export const API_page = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
                                <p><a href = "#APIs" onClick={() => setIsOpen(false)}>APIs</a></p>
                                <div style={{marginLeft:'30px'}}>
                                    <p><b>Core</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#neurex" onClick={() => setIsOpen(false)}><code>Neurex</code></a></p>
                                        <p><a href="#layers" onClick={() => setIsOpen(false)}><code>Layers</code></a></p>
                                    </div>
                                    
                                    <p><b>Data Handling</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#csvdatahandler" onClick={() => setIsOpen(false)}><code>CsvDataHandler</code></a></p>
                                        <p><a href="#minmaxscaler" onClick={() => setIsOpen(false)}><code>MinMaxScaler</code></a></p>
                                        <p><a href="#load_images_from_directory" onClick={() => setIsOpen(false)}><code>load_images_from_directory</code></a></p>
                                        <p><a href="#load_single_image" onClick={() => setIsOpen(false)}><code>load_single_image</code></a></p>
                                        <p><a href="#load_multiple_images" onClick={() => setIsOpen(false)}><code>load_multiple_images</code></a></p>
                                    </div>
                                    
                                    <p><b>Preprocessing</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#split_dataset" onClick={() => setIsOpen(false)}><code>split_dataset</code></a></p>
                                        <p><a href="#onehotencoded" onClick={() => setIsOpen(false)}><code>OneHotEncoded</code></a></p>
                                        <p><a href="#integerlabeling" onClick={() => setIsOpen(false)}><code>IntegerLabeling</code></a></p>
                                        <p><a href="#binarylabeling" onClick={() => setIsOpen(false)}><code>BinaryLabeling</code></a></p>
                                    </div>

                                    <p><b>Math Ops</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#element-wise-mul"><code>element_wise_mul</code></a></p>
                                        <p><a href="#relu"><code>relu</code></a></p>
                                        <p><a href="#sigmoid"><code>sigmoid</code></a></p>
                                        <p><a href="#tanh"><code>tanh</code></a></p>
                                        <p><a href="#softmax"><code>softmax</code></a></p>
                                        <p><a href="#linear"><code>linear</code></a></p>
                                    </div>
                                    
                                    <p><b>Evaluation metrics</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#regressionmetrics" onClick={() => setIsOpen(false)}><code>RegressionMetrics</code></a></p>
                                        <p><a href="#classificationmetrics" onClick={() => setIsOpen(false)}><code>ClassificationMetrics</code></a></p>
                                    </div>

                                    <p><b>Annotation module</b></p>
                                    <div style={{marginLeft:'30px'}}>
                                        <p><a href="#Annotator" onClick={() => setIsOpen(false)}><code>Annotator</code></a></p>
                                    </div>
                                </div>
                                <p><b>Basic usage</b></p>
                                <p><a href = "#loading-datasets" onClick={() => setIsOpen(false)}>Loading datasets</a></p>
                                <p><a href = "#building-a-neural-network" onClick={() => setIsOpen(false)}>Building a neural network</a></p>
                                <p><a href = "#save-and-load-models" onClick={() => setIsOpen(false)}>Saving and loading models</a></p>
                                <p><a href = "#model-evaluation" onClick={() => setIsOpen(false)}>Model evaluation</a></p>
                                <p><a href = "#annotation" onClick={() => setIsOpen(false)}>Semi-automating annotation</a></p>
                                <p><a href="#templates">Templates</a></p>
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
                </div>
            </header>

            <section className = "main-wrapper">
                <div className="navigation toHide">
                    <aside className="navigation-container">
                        <p><a href = "#installation">Installation guide</a></p>
                        <p><a href = "#getting-started">Getting Started</a></p>
                        <p><a href = "#APIs">APIs</a></p>
                        <div style={{marginLeft:'30px'}}>
                            <p><b>Core</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#neurex"><code>Neurex</code></a></p>
                                <p><a href="#layers"><code>Layers</code></a></p>
                            </div>
                            
                            <p><b>Data Handling</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#csvdatahandler"><code>CsvDataHandler</code></a></p>
                                <p><a href="#minmaxscaler"><code>MinMaxScaler</code></a></p>
                                <p><a href="#load_images_from_directory"><code>load_images_from_directory</code></a></p>
                                <p><a href="#load_single_image"><code>load_single_image</code></a></p>
                                <p><a href="#load_multiple_images"><code>load_multiple_images</code></a></p>
                            </div>
                            
                            <p><b>Preprocessing</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#split_dataset"><code>split_dataset</code></a></p>
                                <p><a href="#onehotencoded"><code>OneHotEncoded</code></a></p>
                                <p><a href="#integerlabeling"><code>IntegerLabeling</code></a></p>
                                <p><a href="#binarylabeling"><code>BinaryLabeling</code></a></p>
                            </div>

                            <p><b>Math Ops</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#element-wise-mul"><code>element_wise_mul</code></a></p>
                                <p><a href="#relu"><code>relu</code></a></p>
                                <p><a href="#sigmoid"><code>sigmoid</code></a></p>
                                <p><a href="#tanh"><code>tanh</code></a></p>
                                <p><a href="#softmax"><code>softmax</code></a></p>
                                <p><a href="#linear"><code>linear</code></a></p>
                            </div>
                            
                            <p><b>Evaluation metrics</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#regressionmetrics"><code>RegressionMetrics</code></a></p>
                                <p><a href="#classificationmetrics"><code>ClassificationMetrics</code></a></p>
                            </div>

                            <p><b>Annotation module</b></p>
                            <div style={{marginLeft:'30px'}}>
                                <p><a href="#Annotator"><code>Annotator</code></a></p>
                            </div>
                        </div>
                        <p><b>Basic usage</b></p>
                        <p><a href = "#loading-datasets">Loading datasets</a></p>
                        <p><a href = "#building-a-neural-network">Building a neural network</a></p>
                        <p><a href = "#save-and-load-models">Saving and loading models</a></p>
                        <p><a href = "#model-evaluation">Model evaluation</a></p>
                        <p><a href = "#annotation">Semi-automating annotation</a></p>
                        <p><a href="#templates">Templates</a></p>
                    </aside>
                </div>

                <div className="main-container" style={{padding: '5%'}}>

                    <div id = "installation" className="content-box">
                       <h1 className="orange-accent-underline">Installation Guide</h1>
                       <p>Install via NPM:</p>

                        <div style={{padding: '10px', borderRadius:10, backgroundColor:'gray', color:'white', width:'100%'}}>
                            <code>
                                npm install neurex
                            </code>
                        </div>
                        
                        <p>You must have NodeJS installed to your machine. In case you haven't install it, download it <a href = "https://nodejs.org/en/download">here</a></p>

                        <p>You may also install via Github directly</p>
                        <div style={{padding: '10px', borderRadius:10, backgroundColor:'gray', color:'white', width:'100%', overflow:'auto'}}>
                            <div style={{width:"500px"}}>
                                <code>
                                    npm install git+https://github.com/KarkAngelo114/Neurex.git
                                </code>
                            </div>
                        </div>

                        <div className="installation-note">
                            <span style={{color:"blue"}}><FontAwesomeIcon icon={faExclamationCircle}/> NOTE</span>
                            <p>Installation directly from Github might be possible, it is highly discourage to use it on production as it may contain breaking changes, bugs, or incomplete features.  </p>
                            <p>It is used only for local development on trying out features that are currently in development.</p>
                        </div>

                    </div>

                    <div id = "getting-started" className="content-box">
                       <h1 className="orange-accent-underline">Getting Started</h1>

                       <p>
                            NeurexJS is a trainable neural network in NodeJS. It simplifies model training without touching 
                            the underlying logics of a neural network such as weight initialization, feedforward and backpropagation, allowing you to prototype quickiy.
                            In this page, you will learn how it's functions works, how can build your own model and how you can train it.
                        </p>
                    </div>

                    <div id = "APIs" className="content-box">
                        <h1 className="orange-accent-underline">APIs</h1>
                        <p>Learn what are the exposed functions that you can use and what they do.</p>
                        <p>This library supports CommonJS and ESM module importing, allowing to work on different setup, whether using <code>require()</code> or using <code>import</code></p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
// CommonJS
const { Neurex, Layers } = require('neurex');

// ES
import { Neurex, Layers } from 'neurex';

// choose only one type depends on your project structure
`}
                            </code>
                        </pre>


                        <div id = "neurex" className="sub-sections">
                            <h1 className="orange-accent-underline">Core classes</h1>
                            <h2><code>Neurex</code></h2>
                            <p>
                                The <code>Neurex</code> class is the core class of the library. This is where the training loop, layer registry, saving/loading models, configuration, and inferencing function lives
                            </p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`const nrx = new Neurex();`}
                                </code>
                            </pre>
                            <p>Within this class, there are core methods you can use such as:</p>

                            <p><b><code>loadSavedModel()</code></b></p>
                            <p>Use <code>loadSavedModel()</code> to load your trained model. Ensure that the model and the script that uses the Neurex module is in the same root project directory. Models are typically in <code>.nrx</code> file format. Note: You cannot load any other file format of models here.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`nrx.loadSavedModel('nrx-model.nrx');`}
                                </code>
                            </pre>

                            <p><b><code>saveModel()</code></b></p>
                            <p>Saves your model after training. This saves the trained parameters, layer definitions, network architecture and states</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`nrx.saveModel('nrx-model');`}
                                </code>
                            </pre>

                            <p><b><code>configure()</code></b></p>
                            <p>This configure your network by initialize learning rate, optimizer to set and setting up checkpoint per epoch</p>
                            <p>As for optimizers, these are what's only available:</p>
                            <ul>
                                <li>sgd</li>
                                <li>adam</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
nrx.configure({
    optimizer:'adam',
    learning_rate:0.0001,
    checkpoint_per_epoch: 10
});
`}
                                </code>
                            </pre>

                            <p><b><code>sequentialBuild()</code></b></p>
                            <p>An interface where you can add layers here sequentially</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
nrx.sequentialBuild([
    // layers here
]);
`}
                                </code>
                            </pre>

                            <p><b><code>modelSummary()</code></b></p>
                            <p>Shows model architecture information</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
nrx.modelSummary();
`}
                                </code>
                            </pre>
                            <p>Example output:</p>

                            <div style={{fontFamily:'monospace', background:"black", color:'white', padding: '20px', textWrap:'nowrap', overflow:'auto'}}>
                                <pre>
{`____________________________________________________________________________________________
                                       Model Summary
____________________________________________________________________________________________
Input size: 784
Input Shape: [28,28,1]
Number of layers: 8
--------------------------------------------------------------------------------------------
Layer (type)            Output Shape          Activation    Parameters          Padding     
============================================================================================
Convolutional Layer     (28x28x8)             relu          80                  same        
Max Pooling             (14x14x8)             None          0 (non-param)       valid       
Convolutional Layer     (14x14x12)            relu          876                 same        
Max Pooling             (7x7x12)              None          0 (non-param)       valid       
Connected Layer         (1x1x128)             relu          75,392              None        
Connected Layer         (1x1x64)              relu          8,256               None        
Connected Layer         (1x1x32)              relu          2,080               None        
Connected Layer         (1x1x10)              softmax       330                 None        
============================================================================================
Total learnable parameters: 87,014
Total size (MegaBytes): 0.33 MB
============================================================================================`}
                                </pre>

                            </div>

                            <p><b><code>getTensorShape()</code></b></p>
                            <p>Get the input shape. Works only after loading a model or after sequential building</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

// assume the moded is trained on 100x100x3
nrx.loadSavedModel('Model.nrx');

const shape = nrx.getTensorShape();

console.log(shape); // [100, 100, 3]
`}
                                </code>
                            </pre>

                            <p><b><code>getInputSize()</code></b></p>
                            <p>The input size equivalent of number of features as input</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

// assume the moded is trained on 34 features
nrx.loadSavedModel('Model.nrx');

const size = nrx.getInputSize();

console.log(size); // 34
`}
                                </code>
                            </pre>

                            <p><b><code>get_task_type()</code></b></p>
                            <p>Get the task type. Can be use to identify what model is trained on and what it is trained for.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

nrx.loadSavedModel('Model.nrx');

const task = nrx.get_task_type();

console.log(task); // regression | multi_class_classification | binary_classification
`}
                                </code>
                            </pre>

                            <p><b><code>train()</code></b></p>
                            <p>Starts the training process loop. Accepts 5 parameters which are:</p>
                            <ul>
                                <li>X_train - the datasets</li>
                                <li>Y_train - these are labels that corresponds to a datapoint in the dataset</li>
                                <li>loss - available loss functions are: <b>binary_cross_entropy</b>, <b>categorical_cross_entropy</b>, <b>sparse_categorical_cross_entropy</b>, <b>mse</b>, and <b>mae</b></li>
                                <li>epoch - number of interation loop for training the model</li>
                                <li>batch_size - defining the number of training samples processed in one forward/backward pass before updating model weights</li>
                            </ul>
                            <p>
                                Note: The loss function to be use depends on the formatting of your labels (Y_train). If you use <code>categorical_cross_entropy</code>, your labels must be one hot encoded. If you use <code>sparse_categorical_cross_entropy</code>, your labels must be integer-labeled. As for <code>binary_cross_entropy</code>, labels must be binary encoded (0s and 1s only).
                            </p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
nrx.train(X_train, Y_train, "binary_cross_entropy", 1000, 12);
`}
                                </code>
                            </pre>

                            <p><b><code>predict()</code></b></p>
                            <p>Produces predictions based on the input data.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
nrx.predict(X_test);
`}
                                </code>
                            </pre>

                            <p><b>pop()</b></p>
                            <p>Removes the last layer of the model including it's initialzed or trained parameters and optimizer states.</p>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
    {`
    const { Neurex, Layers } = require('neurex');

    (async () => {

        const nrx = new Neurex();
        const layer = new Layers();

        nrx.sequentialBuild([
            layer.inputShape({ height: 28, width: 28, depth:1}),
            /* other layers */
        ]);


        nrx.pop();

    })(); 
    `}  
                                </code>
                            </pre>
                            <p><b>add_layer()</b></p>
                            <p>Appends a new layer to an existing model architecture. Upon appending a new layer will initiates untrained parameters.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
    {`
    const { Neurex, Layers } = require('neurex');

    (async () => {

        const nrx = new Neurex();
        const layer = new Layers();

        nrx.sequentialBuild([
            layer.inputShape({ height: 28, width: 28, depth:1}),
            /* other layers */
        ]);


        nrx.add_layer(layer.connectedLayer("relu", 10));

    })(); 
    `}  
                                </code>
                            </pre>

                        </div>

                        <div id = "layers" className="sub-sections">
                            <h2><code>Layers</code></h2>
                            <p>
                                The <code>Layers</code> class contains collections of layer types that can be added to <code>sequentialBuild()</code> method.
                                Adding layers will return layer definitions and store them inside the <code>Neurex</code> class internal variables.
                            </p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`const layer = new Layers();`}
                                </code>
                            </pre>
                            <p>Within this class, there are methods you can use such as:</p>

                            <p><b><code>inputShape()</code></b></p>
                            <p>The input layer tells the network the shape of your inputs.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
layer.inputShape({ features: 8 })
`}
                                </code>
                            </pre>

                            <p>Or</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
layer.inputShape({ height: 28, width: 28, depth: 1 })
`}
                                </code>
                            </pre>

                            <p><b><code>connectedLayer()</code></b></p>
                            <p>Allows you to build a layer with number of neurons and the activation function to use in a layer. Stacking more layers will build fully connected layers.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>activation_function - activation function to use in the layer</li>
                                <li>layer_size - set the number of neurons to this layer</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
layer.connectedLayer("relu", 5)
`}
                                </code>
                            </pre>

                            <p><b><code>convolutionalLayer()</code></b></p>
                            <p>Adds a convolutional layer.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>filters - number of kernels will be initialize for the layer</li>
                                <li>strides - defines the number of pixels a kernel (filter) moves across an input image, both horizontally and vertically, during a convolution scan</li>
                                <li>kernel_size - set the kernel size</li>
                                <li>activation_function - activation function to use in the layer</li>
                                <li>padding - Set padding for this layer. Available paddings: <b>same</b> or <b>valid</b></li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid')
`}
                                </code>
                            </pre>

                            <p><b><code>maxPooling()</code></b></p>
                            <p>Adds a max pooling layer.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>poolSize - determines the pool size window</li>
                                <li>strides - defines the number of pixels a sliding window moves across an input image, both horizontally and vertically, during a convolution scan</li>
                                <li>padding - Set padding for this layer. Available paddings: <b>same</b> or <b>valid</b></li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
layer.maxPooling([2, 2]),
`}
                                </code>
                            </pre>
                            
                        </div>

                        <div id = "csvdatahandler" className="sub-sections">
                            <h1 className="orange-accent-underline">Data Handling</h1>
                            <h2><code>CsvDatahandler</code></h2>
                            <p>This class is useful for loading CSV datasets that your model can be trained on. Consists a collection of methods for loading, formatting, and preparing data for training.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const csv = new CsvDataHandler();
`}
                                </code>
                            </pre>
                            <p>Within this class, there are methods you can use such as:</p>

                            <p><b><code>read_csv()</code></b></p>
                            <p>Opens and reads the provided CSV file and maps its contents into an array of arrays. The first row is treated as column names and stored separately</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>filename - filename of the CSV dataset</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.read_csv("my-dataset.csv");
`}
                                </code>
                            </pre>

                            <p><b><code>tabularize()</code></b></p>
                            <p>Displays the provided data in a tabular format, including column names.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data - extracted data after loading the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.tabularize(data);
`}
                                </code>
                            </pre>

                            <p><b><code>rowsToInt()</code></b></p>
                            <p>Converts all elements in every row of the provided data array to numerical values. Ensure that all elements are numeric, otherwise, they will result in `NaN`</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data - extracted data after loading the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.rowsToInt(data);
`}
                                </code>
                            </pre>

                            <p><b><code>getRowElements()</code></b></p>
                            <p>Selects a range of elements from each row of the provided array. Note that this will alter the structure of your dataset
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>setRange — The number of elements to select from the beginning of each row.</li>
                                <li>data - extracted data after loading/formatting the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.getRowElements(5, data);
`}
                                </code>
                            </pre>

                            <p><b><code>removeColumns()</code></b></p>
                            <p>Removes specified columns from the dataset and updates the column names. Note that this will alter the structure of the dataset.
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>fileds- An array of column names to remove.</li>
                                <li>data - extracted data after loading/formatting the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.removeColumns(["column_1","column_2", "column_3"], data);
`}
                                </code>
                            </pre>

                            <p><b><code>extractColumn()</code></b></p>
                            <p>
                                Exctract an entire column. This alters also the structure of the dataset
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>columnName — The name of the column to extract.</li>
                                <li>data - extracted data after loading/formatting the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.extractColumn("column_1", data);
`}
                                </code>
                            </pre>

                            <p><b><code>normalize()</code></b></p>
                            <p>
                                Normalizes the provided data using the specified method
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>method — the normalization method to use. Available normalization method: <b>MinMax</b></li>
                                <li>data - extracted data after loading/formatting the datasets</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
csv.normalize("MinMax", data);
`}
                                </code>
                            </pre>

                        </div>

                        <div id = "minmaxscaler" className="sub-sections">
                            <h2><code>MinMaxScaler</code></h2>
                            <p>Scales input features (array of arrays) to [0, 1] based on feature-wise min/max. This is used for normalizing data before feeding to your model. Requires fitting on training data first.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const scaler = new MinMaxScaler();
`}
                                </code>
                            </pre>
                            <p>Within this class, there are methods you can use such as:</p>

                            <p><b><code>fit()</code></b></p>
                            <p>
                                Calculates min and max for each feature from the input data.
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data - an array containing of rows of your features</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
scaler.fit(X_train);
`}
                                </code>
                            </pre>

                            <p><b><code>transform()</code></b></p>
                            <p>
                                Transforms the input data using the fitted min and max values.
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data - an array containing of rows of your features</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
scaler.transform(X_train);
`}
                                </code>
                            </pre>

                            <p><b><code>inverseTransform()()</code></b></p>
                            <p>
                                Inverse transforms the normalized data back to original scale (requires fitting again).
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data - an array containing of rows of your features</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
scaler.inverseTransform(X_train);
`}
                                </code>
                            </pre>

                        </div>

                        <div id = "load_images_from_directory" className="sub-sections">
                            <h2><code>load_images_from_directory()</code></h2>
                            <p>
                                This function allows you to load image datasets for training easily. 
                                Once your dataset is loaded, it will return an array of tensors representing color channels of an image being processed, labels that corresponds to the image and classes.
                                The folder names inside the target directory will represents as class names that the image inside that folder belongs.
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>target_dir - the target directory.</li>
                                <li>resize - an array containing the values for resizing [H, W].</li>
                                <li>pixelFormat - grayscale, rgb, or rgba. "grayscale" - 1 channel, "rgb" - 3 channels, and "rgba" - 4 channels.</li>
                                <li>limit_per_class - limit the number of items per class. Default is 0</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { datasets, labels, classes } = await load_images_from_directory("mnist-digits", [28, 28], 'grayscale', 50);
`}
                                </code>
                            </pre>

                        </div>

                        <div id = "load_single_image" className="sub-sections">
                            <h2><code>load_single_image()</code></h2>
                            <p>
                                This function allows you to load a single image by specifying it's path
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>file_path — points to the directory of the image</li>
                                <li>resize — resize the image to [h][w]</li>
                                <li>pixelFormat - grayscale, rgb, or rgba. "grayscale" - 1 channel, "rgb" - 3 channels, and "rgba" - 4 channels.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const {datasets} = await load_single_image('uploads/image.jpg', [100, 100], 'rgb');
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "load_multiple_images" className="sub-sections">
                            <h2><code>load_multiple_images()</code></h2>
                            <p>
                                This function allows you to load a multiple images at once by specifying the folder that contains images
                            </p>
                            <p>Parameters:</p>
                            <ul>
                                <li>file_path — points to the directory of the image</li>
                                <li>resize — resize the image to [h][w]</li>
                                <li>pixelFormat - grayscale, rgb, or rgba. "grayscale" - 1 channel, "rgb" - 3 channels, and "rgba" - 4 channels.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const {datasets, paths} = await load_multiple_images('uploads/', [28, 28],"grayscale");
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "split_dataset" className="sub-sections">
                            <h1 className="orange-accent-underline">Preprocessing</h1>
                            <h2><code>split_dataset()</code></h2>
                            <p>Splits a dataset into training and testing sets.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>X — array of features (input data)</li>
                                <li>Y — array of labels (target data)</li>
                                <li>split_ratio — the ratio for the test set (e.g., 0.2 for 20%)</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const {X_train, Y_train, X_test, Y_test} = await split_dataset(datasets, labels, 0.2);
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "onehotencoded" className="sub-sections">
                            <h2><code>OneHotEncoded()</code></h2>
                            <p>Converts a column of categorical labels into one-hot encoded vectors.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data — An array where each inner array represents a row and contains a single categorical label.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
// [["cat"],["dog"], ["bird"], ["dog"]]
const formatted_labels = await OneHotEncoded(labels);

console.log(formatted_labels);
// [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 0]]
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "integerlabeling" className="sub-sections">
                            <h2><code>IntegerLabeling()</code></h2>
                            <p>Converts labels that cannot be converted to interger labels (example: words). If your labels already integer-labeled (ex: 0, 1, 2, 3, ...), no need to use this function</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data — An array where each inner array represents a row and contains a single categorical label.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
// [["cat"],["dog"], ["bird"], ["dog"]]
const formatted_labels = await IntegerLabeling(labels);

console.log(formatted_labels);
// [[1],[2],[3],[2]]
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "binarylabeling" className="sub-sections">
                            <h2><code>BinaryLabeling()</code></h2>
                            <p>Converts labels that cannot be converted to binary labels (example: words). If your labels already 0s and 1s, no need to use this function</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>data — An array where each inner array represents a row and contains a single categorical label.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
// [["good"],["bad"], ["bad"], ["good"]]
const formatted_labels = await BinaryLabeling(labels);

console.log(formatted_labels);
// [[1],[0],[0],[1]]
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "basic-math" className="content-box">
                            <h1 className="orange-accent-underline" >Math Ops</h1>
                            <p>Neurex exposes some math functions being used internally</p>

                            <h2 id = "element-wise-mul"><b><code>element_wise_mul()</code></b></h2>
                            <p>Takes two 1D arrays having same length and perform element-wise multiplication.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>flat_arr_1 - a flat array input</li>
                                <li>flat_arr_2 - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { element_wise_mul } = require('neurex');

const a = [1, 2, 3, 4, 5];
const b = [6, 7, 8, 9, 10];
const output = element_wise_mul(a, b);

console.log(output); // [ 6, 14, 24, 36, 50 ]
`}
                                </code>
                            </pre>

                            <h2 id = "element-wise-sub"><b><code>element_wise_sub()</code></b></h2>
                            <p>Use to subtract elements inside both arrays. Requires both arrays has same length.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>flat_arr_1 - a flat array input</li>
                                <li>flat_arr_2 - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { element_wise_sub } = require('neurex');

const a = [0.98, -0.23, 0.34, 0.32, -0.39];
const b = [-0.84, 0.37, 0.33, 0.19, 0.10];

const output = element_wise_sub(a, b);

console.log(output); // Float32Array(5) [1.82, -0.60, 0.00, 0.12, -0.49]

`}
                                </code>
                            </pre>

                            <h2 id = "scaleDiff"><b><code>scaleDiff()</code></b></h2>
                            <p>A function that takes 3 input arrays and perform subtraction of values from <code>arr1[i]</code> to <code>arr2[i]</code> then multiply to <code>arr3[i]</code></p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr1 - a flat array input</li>
                                <li>arr2 - a flat array input</li>
                                <li>arr3 - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { scaleDiff } = require('neurex');

const a = [0.98, -0.23, 0.34, 0.32, -0.39];
const b = [-0.84, 0.37, 0.33, 0.19, 0.10];
const c = [0.23, 0.2, -1.32, 0.24, -0.24];

const output = scaleDiff(a, b, c); 

console.log(output); // Float32Array(5) [0.41, -0.11, -0.01, 0.03, 0.11]
`}
                                </code>
                            </pre>

                            <h2 id = "relu"><b><code>relu()</code></b></h2>
                            <p>ReLu (Rectified Linear Unit) is an activation function where all the values are passed the same and zeroed out negative values</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { relu } = require('neurex');

const a = [1, 2, 3, 4, 5];
const output = relu(a);

console.log(output);
`}
                                </code>
                            </pre>

                            <h2 id = "sigmoid"><b><code>sigmoid()</code></b></h2>
                            <p>Sigmoid is an activation function that squashes all values between 0 to 1. Ideal for binary classificaton tasks</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { sigmoid } = require('neurex');

const a = [1, 2, 3, 4, 5];
const output = sigmoid(a);

console.log(output);
`}
                                </code>
                            </pre>

                            <h2 id = "tanh"><b><code>tanh()</code></b></h2>
                            <p>Tanh (hyperbolic tangent) is an activation function that squashes all values between -1 to 1. Ideal for binary classificaton tasks</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { tanh } = require('neurex');

const a = [1, 2, 3, 4, 5];
const output = tanh(a);

console.log(output);
`}
                                </code>
                            </pre>

                            <h2 id = "softmax"><b><code>softmax()</code></b></h2>
                            <p>The softmax function is a mathematical tool that converts a vector of raw, real-numbered scores (logits) into a probability distribution, with values between 0 and 1 that sum up to exactly 1. This activation function is primarily use in output layer.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { softmax } = require('neurex');

const a = [1, 2, 3, 4, 5];
const output = softmax(a);

console.log(output);
`}
                                </code>
                            </pre>

                            <h2 id = "linear"><b><code>linear()</code></b></h2>
                            <p>The linear activation function outputs the same inputs directly without non-linear transformation. This means that whateveer being passed here, the same will be the output</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>arr - a flat array input</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`

const { linear } = require('neurex');

const a = [1, 2, 3, 4, 5];
const output = linear(a);

console.log(output);
`}
                                </code>
                            </pre>

                        </div>

                        <div id = "regressionmetrics" className="sub-sections">
                            <h1 className="orange-accent-underline">Evaluation Metrics</h1>
                            <h2><code>RegressionMetrics()</code></h2>
                            <p>Computes evaluation metrics for regression tasks given test features and labels.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>predictions — The input features for the test set.</li>
                                <li>actuals — The true target values for the test set.</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
RegressionMetrics(preds, labels);
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "classificationmetrics" className="sub-sections">
                            <h2><code>ClassificationMetrics()</code></h2>
                            <p>Computes evaluation metrics for regression tasks given test features and labels.</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>predictions — The input features for the test set.</li>
                                <li>actuals — The true target values for the test set.</li>
                                <li>classificationType — binary, categorical, or sparse_categorical</li>
                                <li>labels — (Optional) - add labels that represents a class</li>
                            </ul>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const classes = ["class_1", "class_2"];
ClassificationMetrics(preds, labels, "binary", classes);
`}
                                </code>
                            </pre>
                        </div>

                        <div id = "Annotator" className="sub-sections">
                            <h2><code>Annotator</code></h2>
                            <p>A special tool where in you can semi-automate annotations for images or tabularized data through classifications. This will help you to evaluate model's performance and accuracy on classifying new and unseen data. </p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();

`}
                                </code>
                            </pre>
                            <p>Within this class, there are core methods you can use such as:</p>

                            <p><b><code>configure()</code></b></p>
                            <p>Set configuration for annotation</p>
                            <p>Parameters:</p>
                            <ul>
                                <li>model_path - <code>.nrx</code> Model file to be loaded</li>
                                <li>target_directory - Target directory of images</li>
                                <li>classes - Array of class names</li>
                            </ul>

                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
annotator.configure({
    model_path: 'model.nrx',
    target_directory_path: 'path/to/images',
    classes: ["class1", "class2", "class3", /* and so on*/]
});

`}
                                </code>
                            </pre>

                            <p><b><code>init()</code></b></p>
                            <p>Initialize instances, loading the model and setting internal variables</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
annotator.init();
`}
                                </code>
                            </pre>

                            <p><b><code>imageClassifier()</code></b></p>
                            <p>Prepares data and internal variales for annotation</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
annotator.imageClassifier();
`}
                                </code>
                            </pre>

                            <p><b><code>image_classify()</code></b></p>
                            <p>Starts the annotation process. Automatically classify images and sorting them based on the predicted class.</p>
                            <pre>
                                <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
annotator.image_classify();
`}
                                </code>
                            </pre>

                        </div>

                    </div>

                    <div id = "loading-datasets" className="content-box">
                       <h1 className="orange-accent-underline">Loading datasets</h1>
                       <p>This section will show comprehensive guide on how to load you dataset for training the functions like <code>load_images_from_directory()</code> and <code>CsvDatahandler()</code></p>

                        <p>The image below shows the project directory where our dataset folder that contains images and a CSV file to be loaded later.</p>
                       <img src = "sample_root_project.png"></img>

                       <p>Here we have 2 datasets, one is the MNIST handwritten digits datasets and the other is a CSV file of an iris-datasets.</p>

                       <p>To load the images, we simply use the <code>load_images_from_directory()</code> like so:</p>
                       <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { load_images_from_directory } = require('neurex');

(async () => {

    const { datasets, labels, classes } = await load_images_from_directory("mnist-digits", [28, 28], 'grayscale', 50); 

})(); 
`}
                            </code>
                        </pre>

                        <p>The function will return an object containing the datasets, labels, and classes. To access one if the preprocessed data, simply log them and access their value by indexing.</p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { load_images_from_directory } = require('neurex');

(async () => {

    const { datasets, labels, classes } = await load_images_from_directory("mnist-digits", [28, 28], 'grayscale', 50);

    console.log(datasets[0]); // log the first preprocessed image.
    console.log(labels);
    console.log(classes);

})(); 
`}
                            </code>
                        </pre>
                        <p>That's it! You can now proceed on formatting the labels using <code>IntegerLabeling()</code>, <code>OneHotEncoded()</code> or <code>BinaryLabeling()</code> and proceed for dataset splitting before training. The returned dataset doens't need
                        for another normalization step because during image loading, the values are already normalized inside the function before returning the output.</p>

                        <p>
                            To load a CSV file dataset, we simply use the <code>CsvDatahandler()</code> and create an instance of it. Then load the CSV file, use <code>read_csv()</code>
                        </p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { CsvDatahandler } = require('neurex');

(() => {

    const csv = new CsvDatahandler();
    const dataset = csv.read_csv("iris-dataset.csv");
})(); 
`}
                            </code>
                        </pre>

                        <p>And that's it! You can now proceed for further processing (like normalization, formatting, or dropping data) before training just like the example below:</p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { CsvDatahandler } = require('neurex');

(() => {

    const csv = new CsvDatahandler();
    const dataset = csv.read_csv("iris-dataset.csv");
    const extract_column = csv.extractColumn('iris', dataset);
    const features = csv.normalize('MinMax',csv.rowsToInt(dataset));

})(); 
`}  
                            </code>
                        </pre>
                    </div>

                    <div id = "building-a-neural-network" className="content-box">
                       <h1 className="orange-accent-underline">Building a neural network</h1>
                       <p>This section shows you basic usage of Neurex and how you build your network through <b>layer stacking</b>.</p>
                       <p>Layer stacking can be done using the <code>sequentialBuild()</code> method. This allows you to stack layers sequentially.</p>
                       <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex } = require('neurex');

(() => {

    const nrx = new Neurex();

    nrx.sequentialBuild([
       // your layers here
    ]);

})(); 
`}  
                            </code>
                        </pre>
                        
                        <p>Attempting to train  without creating your network will cause this error:</p>
                        <pre>
                            <code style={{backgroundColor: '#000000', color:'white'}}>
    {`Error: [ERROR]------- No layers constructed
        at Neurex.train (C:/project/neurex/core/core.js:395:44)
        at run (C:/project/mnist.js:31:15)

    Node.js v22.11.0`}
                            </code>
                        </pre>

                        <p>If you attempt to build your network after loading your model, it will skip sequential building and use the loaded model instead.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex } = require('neurex');

(() => {

    const nrx = new Neurex();

    nrx.loadSavedModel("model.nrx");

    // Skips sequential building and use the loaded model instead.
    nrx.sequentialBuild([
       // your layers here
    ]);

})(); 
`}  
                            </code>
                        </pre>

                        <div style={{fontFamily:'monospace', background:"black", color:'orange', padding: '20px'}}>
                            <p>[INFO]------- Skipping sequential build:</p> 
                            <p>reason:</p>
                            <p>There/you might have loaded a model already. Please check if already load a model.</p>
                        </div>

                        <p>
                            To add layers, you would need the <code>Layers</code> class. Now in building your network, you would need to think what kind of network you want to build.
                            If you're working it non-spatial data (structured or tabularized), you would only need to build networks that works on those types of data (e.g. building a fully connected networks).
                            However, if your working with spatial data like images, consider adding convolutial layers to build a CNN. 
                        </p>
                        <p>In building any networks, the first layer should always be the <code>inputShape()</code> as this represets the input layer and tells the network about the size of your inputs.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(() => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({features: 4}), // or layer.inputShape({ height: 28, width: 28, depth:1}) if you're working with images
        // other layers....
    ]);

})(); 
`}  
                            </code>
                        </pre>

                        <p>Neurex supports training standard artificial neural networks and convolutional neural networks (traditional)</p>
                        <p>Standard Aritifical Neural Networks:</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(() => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({features: 4}),
        layer.connectedLayer("relu", 5),
        layer.connectedLayer("relu", 5),
        layer.connectedLayer("softmax", 3)
    ]);

})(); 
`}  
                            </code>
                        </pre>

                        <p>Traditional Convolutional Neural Networks:</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(() => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

})(); 
`}  
                            </code>
                        </pre>
                        
                        <p>Once you have constructed your network, you can start the training loop</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);

})(); 
`}  
                            </code>
                        </pre>

                        <p>
                            Using <code>pop()</code> and <code>add_layer()</code> is very handy on transfer learning. You can do this by removing the layers starting at the end using <code>pop()</code> and 
                            appending a new layer to the existing architecture using <code>add_layer()</code> methods.
                        </p>

                        <p>Removing a layer using <code>pop()</code> can alter the model structure because it modifies in place. This is helpful when using an existing pre-trained model and training it for other dataset.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

    nrx.pop(); // <- removes the last layer
    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);

})(); 
`}  
                            </code>
                        </pre>

                        <p>Will also work after loading a model </p>
                        
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.loadSavedModel('model.nrx');

    nrx.pop();

    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);
    const predictions = nrx.predict(Y_train);
    nrx.saveModel('model');

})(); 
`}  
                            </code>
                        </pre>

                        <p>You can check the changes after building or loading a model and after popping using <code>modelSummary()</code></p>

                        <p>
                            Adding a new layer/s can be done using <code>add_layer()</code>. You would need the layer data from the <code>Layers</code> class which returns layer data to be added to the existing model.
                            This will initiate untrained parameters.
                        </p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

    nrx.pop(); // <- removes the last layer
    nrx.add_layer(layer.connectedLayer('sigmoid', 1); // <- append a new layer

    await nrx.train(X_train, Y_train, 'binary_cross_entropy', 500, 25);

})(); 
`}  
                            </code>
                        </pre>

                        <p>Will also work after loading a model </p>
                        
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.loadSavedModel('model.nrx');

    nrx.pop(); // <- removes the last layer
    nrx.add_layer(layer.connectedLayer('sigmoid', 1); // <- append a new layer

    await nrx.train(X_train, Y_train, 'binary_cross_entropy', 500, 25);
    const predictions = nrx.predict(Y_train);
    nrx.saveModel('model');

})(); 
`}  
                            </code>
                        </pre>

                        <p>You can check the changes after building or loading a model and after popping using <code>modelSummary()</code></p>


                    </div>

                    <div id = "save-and-load-models" className="content-box">
                        <h1 className="orange-accent-underline">Saving and loading models</h1>
                        <p>Save your models by using <code>saveModel()</code> after training. This will save your network's parameters (weights and biases), model architecture, states, and other configurations.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);

    nrx.saveModel('model');

})(); 
`}  
                            </code>
                        </pre>

                        <p>And to load the model again for running inference or retraining, use <code>loadSavedModel()</code>. This will map back the model's architecture, states and parameters as well as other saved configurations.</p>
                        <p>Note: when you attempt to load your model when there's a build, it will cause an error.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.sequentialBuild([
        layer.inputShape({ height: 28, width: 28, depth:1}),
        layer.convolutionalLayer(2, 1, [3, 3], 'relu', 'valid'),
        layer.convolutionalLayer(4, 2, [4, 3], 'relu', 'same'),
        layer.convolutionalLayer(6, 1, [3, 4], 'relu', 'valid'),
        layer.connectedLayer('relu', 16),
        layer.connectedLayer('relu', 8),
        layer.connectedLayer('softmax', 10)
    ]);

    nrx.loadSavedModel('model.nrx'); // ❌ will cause an error
    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);
    nrx.saveModel('model');

})(); 
`}  
                            </code>
                        </pre>

                        <div style={{fontFamily:'monospace', background:"black", color:'red', padding: '20px'}}>
                            <p>[ERROR]------- Failed to load model.</p>
                            <p>Reason:</p>
                            <p>There's already a new network being built.</p>
                        </div>

                        <p>If there's no new network to build, loading models will work. Now you can retrain or use your model for inferencing.</p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers();

    nrx.loadSavedModel('model.nrx');
    await nrx.train(X_train, Y_train, 'categorical_cross_entropy', 500, 25);
    const predictions = nrx.predict(Y_train);
    nrx.saveModel('model');

})(); 
`}  
                            </code>
                        </pre>

                    </div>

                    <div id = "model-evaluation" className="content-box">
                       <h1 className="orange-accent-underline">Model evaluation functions</h1>
                        <p>
                            Model evaluation is essential in machine learning because it assesses a model's accuracy, dependability, and ability to generalize to novel, unseen data. 
                            It stops the use of ineffective models by identifying overfitting, underfitting, and biases. Thorough assessment guarantees safety, confidence, and 
                            alignment with business needs prior to execution.
                        </p>
                        
                        <p>Neurex has out-of-the-box functions to evaluate your model's performance, regardless if it's trained to classify data or for regression tasks.</p>

                        <p>
                            You can use <code>ClassificationMetrics()</code> to evaluate models that are trained for classification task. This access model's accuracy in classifying new and unseen data.
                        </p>

                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { ClassificationMetrics, Neurex } = require('neurex');

(async () => {

    const nrx = new Neurex();

    nrx.loadSavedModel('model.nrx');
    const predictions = nrx.predict(X_test);

    ClassificationMetrics(predictions, Y_tests, 'categorical', ["class1", "class2"]);

})(); 
`}  
                            </code>
                        </pre>
                        <p>Note that on the third parameter, it will depend on the output shape of the model and the inferencing tasks it is trained on.</p>

                        <p>If your model is trained for regression task, you can use <code>RegressionMetrics()</code></p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { RegressionMetrics, Neurex } = require('neurex');

(async () => {

    const nrx = new Neurex();

    nrx.loadSavedModel('model.nrx');
    const predictions = nrx.predict(X_test);

    RegressionMetrics(predictions, Y_test);

})(); 
`}  
                            </code>
                        </pre>

                    </div>

                    <div id = "annotation" className="content-box">
                        <h1 className="orange-accent-underline">Semi-automating annotation with <code>Annotator</code></h1>
                        <p>
                            Within <code>Neurex</code>, you can automate manual data annotation using <code>Annotator</code>. Using this module, you can annotate images to their respective class and tabular data to assign labels on them.

                        </p>
                        <p>
                           The examples below shows the basic usage of the module in annotating images. To get started, simply import the class and create an instance of it.
                        </p>
                         <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();
`}  
                            </code>
                        </pre>

                        <p>You would need to configure it first using <code>configure()</code>.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();
annotator.configure({
    model_path: 'model.nrx',
    target_directory_path: 'uploads',
    classes: ["class1", "class2", "class3"]
});
`}  
                            </code>
                        </pre>

                        <p>After configuring, you need to initialize it by calling <code>init()</code> as this will initiate the internal instance.</p>
<pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();

annotator.configure({
    model_path: 'model.nrx',
    target_directory_path: 'uploads',
    classes: ["class1", "class2", "class3"]
});

annotator.init();
`}  
                            </code>
                        </pre>

                        <p>Then you can use imageClassifier() method. This will initiatlize internal variables, loading the model and preparing the images</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();
annotator.configure({
    model_path: 'model.nrx',
    target_directory_path: 'uploads',
    classes: ["class1", "class2", "class3"]
});

annotator.init();
(async () => {

    await annotator.imageClassifier()

})();
`}  
                            </code>
                        </pre>
                        
                        <p>To start annotation, call <code>image_classify()</code>. This will start the annotation process.</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Annotator } = require('neurex');

const annotator = new Annotator();
annotator.configure({
    model_path: 'model.nrx',
    target_directory_path: 'uploads',
    classes: ["class1", "class2", "class3"]
});

annotator.init();
(async () => {

    await annotator.imageClassifier();
    await annotator.image_classify();
})();
`}  
                            </code>
                        </pre>
                        <p>
                            The will annotate the images and assigned them on their respective classes by placing them on a folder that represents the class.
                            WHen annotating images, the results are inside the generated <code>annotator_dumps</code> folder where you can see that there are also folders that represents classes
                            and each subfolders contains the images where the <code>image_classify()</code> placed them based on predictions.
                        </p>
                    </div>

                    <div id = "templates" className="content-box">
                        <h1 className="orange-accent-underline">Templates</h1>
                        <p>
                            Building neural networks from scratch can be overwhelming, especially when you need to decide how many layers to stack, 
                            which activation unctions to use, and how to structure your model. Neurex provides pre-configured neural network templates 
                            that serve as building blocks for common machine learning tasks. These templates are drop-in architectures that already 
                            follow best practices and conventions. Rather than manually specifying every layer, you can leverage a template as the 
                            foundation of your model and customize it as needed.
                        </p>
                        <p>
                            When dropping in templated networks into the <code>sequentialBuild()</code>, you must use a spread operator (<code>...</code>). 
                            This is because the function only accepts 1D array, but the template functions returns an array. So, you must use the operator to spread
                            the layer configuration objects returned by the template function.
                        </p>

                        <p>Below are some available templated architectures you can use.</p>
                        <br/>

                        <p><b><code>simpleNeuralNetwork()</code></b></p>
                        <p>A straightforward multilayer perceptron ideal for getting started or handling structured (non-image) data.</p>
                        <ul>
                            <li>Architecture: 3 hidden layers with 5 neurons each</li>
                            <li>Activation: ReLU for all hidden layers</li>
                            <li>Best for: Tabular datasets, regression, binary/multi-class classification</li>
                        </ul>

                        <p>Example usage</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers, templates } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers()

    nrx.sequentialBuild([
        layer.inputShape({features: 3}),
        ...templates.simpleNeuralNetwork(), // this consists of 3 hidden layers having 5 neurons each
        layer.connectedLayer('sigmoid', 3)
    ]);

})(); 
`}  
                            </code>
                        </pre>

                        <p><b><code>simpleCNN()</code></b></p>
                        <p>A compact convolutional neural network perfect for image classification tasks without excessive complexity.</p>
                        <ul>
                            <li>Architecture: 2 convolutional layers → max pooling → 3 fully-connected layers</li>
                            <li>Activation: ReLU on convolutional layers</li>
                            <li>Padding: "same" for convolutions, "valid" for pooling</li>
                            <li>Best for: Image classification on smaller datasets (e.g. is the famous MNIST dataset)</li>
                        </ul>

                        <p>Example usage</p>
                        <pre>
                            <code className="language-js" style={{backgroundColor: '#000000'}}>
{`
const { Neurex, Layers, templates } = require('neurex');

(async () => {

    const nrx = new Neurex();
    const layer = new Layers()

    nrx.sequentialBuild([
        layer.inputShape({features: 3}),
        ...templates.simpleCNN(), // drops in a simple convolutional neural network
        layer.connectedLayer('sigmoid', 3)
    ]);

})(); 
`}  
                            </code>
                        </pre>

                        <br/>
                        <p>All templated neural network architectures doesn't have input layer nor a predefined output layer so that you can add your own.</p>
                    </div>
                </div>

                <div className="bottom-btn-container">
                    <button className="scrollTop-btn" onClick={scrollTop}><FontAwesomeIcon icon={faChevronUp}/></button>
                </div>
            </section>
        </>
    );
}