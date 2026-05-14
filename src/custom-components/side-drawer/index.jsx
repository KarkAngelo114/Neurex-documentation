import './style.css';

export const SideDrawer = ({isOpen, action, children}) => {
    return (
        <>
            <div className={`side-drawer-parent ${isOpen ? 'active' : ''}`} onClick={action}>
                <div className="side-drawer" onClick={(e) => e.stopPropagation()}>
                    <div className="side-drawer-items">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};