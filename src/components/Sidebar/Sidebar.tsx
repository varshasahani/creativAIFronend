import React from 'react';
import styles from './Sidebar.module.css';
import useSidebar from './useSidebar.ts';

interface SidebarProps {
    setActiveComponent: (component: string) => void;
    handleLogout: () => void;
    isOpen: boolean; // Prop to control sidebar open/close state
    toggleSidebar: () => void; // Function to toggle the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent, handleLogout, isOpen, toggleSidebar }) => {
    const { menuItems, handleMenuClick } = useSidebar(setActiveComponent);

    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.toggleButtonContainer}>
                <button className={styles.toggleButton} onClick={toggleSidebar}>
                    {isOpen ? '←' : '→'}
                </button>
            </div>
            {isOpen && <div className={styles.appName}>CreativAI</div>}
            <nav className={styles.menu}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`${styles['menu-item']} ${item.disabled ? styles.disabled : ''}`}
                        onClick={() => handleMenuClick(item.id)}
                        title={item.disabled ? item.tooltip : ''}
                    >
                        <i className={`fas fa-${item.icon}`}></i> {/* Icon */}
                        <span>{item.label}</span> {/* Text */}
                    </div>
                ))}
            </nav>
            <div className={styles.logout}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    <i className="fas fa-sign-out-alt"></i> {/* Logout Icon */}
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;