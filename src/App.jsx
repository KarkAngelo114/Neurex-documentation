import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/home';
import { ModelsPage } from './pages/models-page';
import { Javascript_Node } from './pages/API_1';
import { Demo_Page } from './pages/demo';
import { Analytics } from "@vercel/analytics/react"
import { ToastContainer } from 'react-toastify';
import { Convert } from './pages/conversion';
import { Javascript_Browser } from './pages/API_2';
import { Demo_1 } from './pages/demo_pages/demo1';
import { Demo_2 } from './pages/demo_pages/demo2';
import { Demo_3 } from './pages/demo_pages/demo3';
import { Demo_4 } from './pages/demo_pages/demo4';
import { Demo_5 } from './pages/demo_pages/demo5';
import { Demo_6, ManualDriving } from './pages/demo_pages/demo6';

const App = () => {
  const ScrollTop = () => {
    
    const { pathname }= useLocation();

    useEffect(() => {
      window.scrollTo(0,0);
    }, [pathname]);

    return null
  };

  return (
    <BrowserRouter>
      <ScrollTop/>
      <ToastContainer position="top-right" autoClose={3000} style={{zIndex:10000}}/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path= "/models" element = {<ModelsPage/>}/>
        <Route path = "/javascript-nodejs" element = {<Javascript_Node/>}/>
        <Route path='/javascript-browser' element={<Javascript_Browser/>}/>
        <Route path='/demo' element = {<Demo_Page/>}/>
        <Route path='/face-liveliness-tests' element={<Demo_1/>}/>
        <Route path='/digits-recognition' element = {<Demo_2/>}/>
        <Route path= "/spam-ham" element = {<Demo_3/>}/>
        <Route path='/XOR' element={<Demo_4/>}/>
        <Route path='/ai-snake-game' element={<Demo_5/>}/>
        <Route path='/ai-car' element={<Demo_6/>}/>
        <Route path="/convert-to-json" element={<Convert/>}/>
        <Route path='/manual-driving' element={<ManualDriving/>}/>
        
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;