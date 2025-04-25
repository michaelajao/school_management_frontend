import { useEffect, useState } from 'react';

interface UseDeviceOutput {
    isMobile: boolean;
    isTablet: boolean;
}

const useMobile = (): UseDeviceOutput => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768); // Mobile breakpoint
            setIsTablet(width >= 768 && width < 1024); // Tablet breakpoint
        };

        // Check on mount
        checkDevice();

        // Add event listener for window resize
        window.addEventListener('resize', checkDevice);

        // Cleanup
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return { isMobile, isTablet };
};

export default useMobile;