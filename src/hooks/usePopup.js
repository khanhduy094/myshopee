import { useState } from "react";

export const usePopup = () => {
    const [activePopup, setActivePopup] = useState(false); 
    const showPopup = () => setActivePopup(true);
    const hidePopup = () => setActivePopup(false);

    return {
        activePopup,
        showPopup,
        hidePopup
    }
  
}