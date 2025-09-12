import { useCallback } from 'react';

interface SidebarLogic {
    menuItems: { id: string; label: string; icon: string; disabled?: boolean; tooltip?: string }[];
    handleMenuClick: (id: string) => void;
}

const useSidebar = (setActiveComponent: (component: string) => void): SidebarLogic => {
    // Define menu items with icons
    const menuItems = [
        { id: 'generateContent', label: 'Generate Content', icon: 'magic' },
        { id: 'analytics', label: 'Analytics', icon: 'chart-bar', disabled: true, tooltip: 'Coming Soon' },
        { id: 'pastContent', label: 'Past Content', icon: 'history' },
        { id: 'profile', label: 'Profile', icon: 'user' },
        { id: 'settings', label: 'Settings', icon: 'cog', disabled: true, tooltip: 'Coming Soon' },
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