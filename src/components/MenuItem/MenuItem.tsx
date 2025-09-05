import React from 'react';
import styles from './MenuItem.module.css'; // Importing CSS as a module

interface MenuItemProps {
    title: string;
    action?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, action }) => {
    return (
        <div className={styles['menu-item']} onClick={action}>
            {title}
        </div>
    );
};

export default MenuItem;