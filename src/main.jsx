import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import './styles/page-styling.css';
import './styles/demo-style.css';
import './styles/accent-underline-styles.css';
import './styles/animated-underline.css';
import './styles/gradient-text.css';
import './styles/gradient-background.css';
import './styles/api-page.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
