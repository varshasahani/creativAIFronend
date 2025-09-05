import React from 'react';
import './MenuItem.module.css';

interface MenuItemProps {
    title: string;
    action: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, action }) => {
    return (
        <div className="menu-item" onClick={action}>
            {title}
        </div>
    );
};

export default MenuItem;