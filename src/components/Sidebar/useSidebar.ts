import { useCallback } from 'react';

interface SidebarLogic {
    menuItems: { id: string; label: string; disabled?: boolean; tooltip?: string }[];
    handleMenuClick: (id: string) => void;
}

const useSidebar = (setActiveComponent: (component: string) => void): SidebarLogic => {
    // Define menu items
    const menuItems = [
        { id: 'generateContent', label: 'Generate Content' },
        { id: 'analytics', label: 'Analytics', disabled: true, tooltip: 'Coming Soon' },
        { id: 'pastContent', label: 'Past Content' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings', disabled: true, tooltip: 'Coming Soon' },
    ];

    // Handle menu item click
    const handleMenuClick = useCallback(
        (id: string) => {
            const clickedItem = menuItems.find((item) => item.id === id);
            if (!clickedItem?.disabled) {
                setActiveComponent(id);
            }
        },
        [setActiveComponent, menuItems]
    );

    return { menuItems, handleMenuClick };
};

export default useSidebar;