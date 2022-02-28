import { useState, useEffect, useRef } from "react";

const useComponentVisible = initialVisibilityState => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialVisibilityState);

    const ref = useRef(null);

    const handleHideDropdown = event => {
        if (event.key === "Escape") {
            setIsComponentVisible(false);
        }
    };

    const handleClickOutside = event => {
        // In order for this to work, ref element and the element that is clicked should be siblings
        if (ref.current && !ref.current.parentElement.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true);
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return [ ref, isComponentVisible, setIsComponentVisible ];
}

export default useComponentVisible;