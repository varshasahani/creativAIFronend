import { useState } from 'react';

interface UserProfile {
    name: string;
    email: string;
    role: string;
}

interface ProfileCardLogic {
    user: UserProfile;
}

const useProfileCard = (): ProfileCardLogic => {
    const [user] = useState<UserProfile>({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
    });

    return { user };
};

export default useProfileCard;