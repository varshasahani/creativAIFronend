export interface UserPreferencesDto {
    theme: string;
    notificationsEnabled: boolean;
}

export interface UserContextDto {
    lastActivePage: string;
    preferredLanguage: string;
}

export interface UserDto {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    preferences: UserPreferencesDto;
    context: UserContextDto;
    isOnboarded: boolean;
    isActive: boolean;
    lastLoginAt?: Date;
    totalContentRequests: number;
    subscriptionTier: string;
    subscriptionExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}