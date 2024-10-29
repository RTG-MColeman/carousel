import React, { createContext, useState, useCallback, useContext, useRef } from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [instanceCount, setInstanceCount] = useState(0); // Total instances
  const [activeInstanceCount, setActiveInstanceCount] = useState(0); // Only active carousels (not in grid view)
  const [isGlobalPaused, setIsGlobalPaused] = useState(false);
  const [isGlobalGridView, setIsGlobalGridView] = useState(false);
  const [uniqueIds, setUniqueIds] = useState([]); // Array to track unique IDs

  // Ref for the aria-live region
  const ariaLiveRef = useRef(null);

  // Function to handle announcements
  const announce = useCallback((message) => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message;
    }
  }, []);

  const incrementInstanceCount = useCallback(
    (uniqueId) => {
      setInstanceCount((prevCount) => prevCount + 1);
      setActiveInstanceCount((prevCount) => prevCount + 1);
      setUniqueIds((prevIds) => [...prevIds, uniqueId]); // Add uniqueId

      return instanceCount === 1; // True if this is the first instance
    },
    [instanceCount]
  );

  const decrementInstanceCount = useCallback(
    (uniqueId) => {
      setInstanceCount((prevCount) => prevCount - 1);
      setActiveInstanceCount((prevCount) => prevCount - 1);
      setUniqueIds((prevIds) => prevIds.filter((id) => id !== uniqueId)); // Remove uniqueId
    },
    []
  );

  const toggleGlobalPause = useCallback(() => {
    setIsGlobalPaused((prev) => !prev);
    announce(prev => `Carousels are now ${prev ? 'paused' : 'playing'}`);
  }, []);

  const toggleInstanceActiveStatus = useCallback(
    (isActive) => {
      setActiveInstanceCount((prevCount) => prevCount + (isActive ? 1 : -1));
    },
    []
  );

  const toggleGlobalGridView = useCallback(() => {
    setIsGlobalGridView((prev) => {
      const newState = !prev;
      setActiveInstanceCount(newState ? 0 : instanceCount);
      announce(`All carousels switched to ${newState ? 'grid view' : 'carousel view'}`);
      return newState;
    });
  }, [instanceCount]);

  return (
    <CarouselContext.Provider
      value={{
        instanceCount,
        activeInstanceCount,
        isGlobalPaused,
        isGlobalGridView,
        uniqueIds, // Expose uniqueIds array
        incrementInstanceCount,
        decrementInstanceCount,
        toggleInstanceActiveStatus,
        toggleGlobalPause,
        toggleGlobalGridView,
        announce // Expose announce to context
      }}
    >
      {children}
      <div ref={ariaLiveRef} aria-live="polite" style={{ position: "absolute", left: "-9999px" }} />
    </CarouselContext.Provider>
  );
};

export const useCarouselControl = () => useContext(CarouselContext);
