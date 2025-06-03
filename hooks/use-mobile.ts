import { useEffect, useState } from 'react';

interface UseDeviceOutput {
    isMobile: boolean;
    isTablet: boolean;
}

const useMobile = (): UseDeviceOutput => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Mark that we're on the client side
        setIsClient(true);
        
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

    // Return false for both during SSR to prevent hydration mismatch
    return { 
        isMobile: isClient ? isMobile : false, 
        isTablet: isClient ? isTablet : false 
    };
};

export default useMobile;