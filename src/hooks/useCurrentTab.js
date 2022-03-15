import { useState, useEffect } from 'react';

const useCurrentTab = initValue => {
    const [isCurrentTab, setIsCurrentTab] = useState(initValue);

    const tabStateChange = () => {
        setIsCurrentTab(!document.hidden);
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', tabStateChange);

        return () => {
            document.removeEventListener('visibilitychange', tabStateChange);
        }
    });

    return isCurrentTab;
}

export default useCurrentTab;