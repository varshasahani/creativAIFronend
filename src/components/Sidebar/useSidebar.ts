import { useCallback } from 'react';

interface SidebarLogic {
    menuItems: { id: string; label: string }[];
    handleMenuClick: (id: string) => void;
}

const useSidebar = (setActiveComponent: (component: string) => void): SidebarLogic => {
    // Define menu items
    const menuItems = [
        { id: 'generateContent', label: 'Generate Content' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'pastContent', label: 'Past Content' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' },
    ];

    // Handle menu item click
    const handleMenuClick = useCallback(
        (id: string) => {
            setActiveComponent(id);
        },
        [setActiveComponent]
    );

    return { menuItems, handleMenuClick };
};

export default useSidebar;