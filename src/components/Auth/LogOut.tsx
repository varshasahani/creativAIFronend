import React from 'react';

interface LogoutProps {
    handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;