import { useState, useEffect } from 'react';

interface AnalyticsData {
    views: number;
    clicks: number;
}

interface AnalyticsCardLogic {
    data: AnalyticsData;
}

const useAnalyticsCard = (): AnalyticsCardLogic => {
    const [data, setData] = useState<AnalyticsData>({ views: 0, clicks: 0 });

    useEffect(() => {
        // Simulate fetching analytics data
        setTimeout(() => {
            setData({ views: 1200, clicks: 300 });
        }, 1000); // Simulate a delay for fetching data
    }, []);

    return { data };
};

export default useAnalyticsCard;