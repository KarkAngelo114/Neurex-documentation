import { useState } from 'react';
import './styles.css';

/**
 * @param {Object} props
 * @param {Boolean} props.isClicked 
 * @param {*} props.action
 * @param {*} props.children
 * @param {*} props.component_label - eitehr a React component, or stirng
 * @param {String} props.bg - sets the background color for the dropdown component
 * @param {String} props.fg - sets the font color of the label (if its a string)
 * @param {String} props.dropdownWidth - sets the width of the component (in `px` value)
 */
export const Dropdown = ({isClicked, action, children, component_label, bg, fg, dropdownWidth}) => {
    return (
        <>  
            <div style={{flexDirection:"column", cursor:'pointer'}}>
                <div onClick={action}>
                    {component_label} 
                </div>
                <div style={{position:'relative', zIndex: 1000, userSelect:"none"}}>
                    <div className={`dropdown-div${isClicked ? ' open' : ''}`} style={{width: `${dropdownWidth}px` || "120px", }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

/**
 * @param {Object} props
 * @param {*} props.action
 * @param {String} props.label - set the label of the dropdown option
 * @param {String} props.backgroundColor - sets the default background color of the dropdown option
 * @param {String} props.fontColor - sets the defualt font color of the dropdown option
 * @param {String} props.onHoverBackgroundColor - sets the background color of the dropdown option when hovered
 * @param {String} props.onHoverFontColor - sets the font color of the dropdown option when hovered
 * @param {*} props.onChange - handles on change activities
 * @returns 
 */
export const DropdownOption = ({action, label, backgroundColor, fontColor, onHoverBackgroundColor, onHoverFontColor, onChange, children}) => {
    const [isHovered, setIsHovered] = useState(false);

    // defaults
    const onHoveredBg = onHoverBackgroundColor || "blue";
    const onHoveredFg = onHoverFontColor || "white";

    const styles = {
        cursor:'pointer',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: isHovered ? onHoveredBg : backgroundColor || "white",
        color: isHovered ? onHoveredFg : fontColor || "black"

    }
    return (
        <>
            <div 
                className='dropdown-option'
                onClick={action} 
                style={styles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                onChange={onChange}
            >
                {label || children}
            </div>
        </>
    );
}

export const DynamicDropdown = ({children, isClicked, action, component_label, bg}) => {
    return (
        <>
            <div onClick={action} className='dynamic-dropdown' style={{background: !bg || !component_label ? "#e3e2e2":"white",}}>
                {component_label || <p>Dynamic Dropdown (place your JSX component here)</p>}
            </div>
            
            <div className={`dynamic-dropdown-list-view ${isClicked ? 'open-dynamic-dropdown' : ''}`}>
                <div className='dynamic-dropdown-list-container'>
                    {children}
                </div>
            </div>
        </>
    );
}