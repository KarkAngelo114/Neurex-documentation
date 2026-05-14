import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/home';
import { ModelsPage } from './pages/models-page';
import { API_page } from './pages/API';
import { Demo_1, Demo_2, Demo_Page } from './pages/demo';

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
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path= "/models" element = {<ModelsPage/>}/>
        <Route path = "/api" element = {<API_page/>}/>
        <Route path='/demo' element = {<Demo_Page/>}/>
        <Route path='/face-liveliness-tests' element={<Demo_1/>}/>
        <Route path='/digits-recognition' element = {<Demo_2/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;