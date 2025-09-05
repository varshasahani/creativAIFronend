import React from 'react';
import styles from './Sidebar.module.css';
import useSidebar from './useSidebar.ts';

interface SidebarProps {
    setActiveComponent: (component: string) => void;
    handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent, handleLogout }) => {
    const { menuItems, handleMenuClick } = useSidebar(setActiveComponent);

    return (
        <div className={styles.sidebar}>
            <div className={styles.appName}>GenWrite</div>
            <nav className={styles.menu}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={styles['menu-item']}
                        onClick={() => handleMenuClick(item.id)}
                    >
                        {item.label}
                    </div>
                ))}
            </nav>
            <div className={styles.logout}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;