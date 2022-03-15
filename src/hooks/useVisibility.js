import { useState, useEffect, useRef } from 'react';

const useVisibility = (offset, containerRef) => {
    const [isVisible, setIsVisible] = useState(false);
    const currentElement = useRef(null);

    useEffect(() => {
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }

        const elementRect = currentElement.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setIsVisible(elementRect.top > containerRect.top - offset && elementRect.bottom < containerRect.bottom + offset);
    }, [offset, containerRef]);

    const onScroll = () => {
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }

        const elementRect = currentElement.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setIsVisible(elementRect.top > containerRect.top - offset && elementRect.bottom < containerRect.bottom + offset);
    }

    useEffect(() => {
        document.addEventListener('scroll', onScroll, true);

        return () => {
            document.removeEventListener('scroll', onScroll, true)
        }
    });

    return [isVisible, currentElement];
}

export default useVisibility;