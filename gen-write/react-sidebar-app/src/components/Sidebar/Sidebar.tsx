import React, { useState } from 'react';
import './Sidebar.module.css';
import MenuItem from '../MenuItem';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button onClick={toggleSidebar} className="toggle-button">
                {isOpen ? 'Close' : 'Open'} Sidebar
            </button>
            <nav className="menu">
                <MenuItem title="Generate Content" action={() => {}} />
                <MenuItem title="Analytics" action={() => {}} />
                <MenuItem title="Past Content" action={() => {}} />
                <MenuItem title="Profile" action={() => {}} />
                <MenuItem title="Settings" action={() => {}} />
            </nav>
            <button className="logout-button">Logout</button>
        </div>
    );
};

export default Sidebar;