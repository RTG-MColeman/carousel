// CarouselContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

// Define context
const CarouselContext = createContext();

export const useCarouselControl = () => useContext(CarouselContext);

export const CarouselProvider = ({ children }) => {
  const [isGlobalPaused, setIsGlobalPaused] = useState(false);
  const [isGlobalGridView, setIsGlobalGridView] = useState(false);
  const [instanceCount, setInstanceCount] = useState(0);
  const [activeInstanceCount, setActiveInstanceCount] = useState(0);

  const incrementInstanceCount = useCallback(() => {
    setInstanceCount((count) => count + 1);
    setActiveInstanceCount((count) => count + 1);
  }, []);

  const decrementInstanceCount = useCallback(() => {
    setInstanceCount((count) => Math.max(0, count - 1));
    setActiveInstanceCount((count) => Math.max(0, count - 1));
  }, []);

  const toggleInstanceActiveStatus = useCallback((isActive) => {
    setActiveInstanceCount((count) => count + (isActive ? 1 : -1));
  }, []);

  const toggleGlobalPause = useCallback(() => {
    setIsGlobalPaused((paused) => !paused);
  }, []);

  const toggleGlobalGridView = useCallback(() => {
    setIsGlobalGridView((isGrid) => !isGrid);
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        isGlobalPaused,
        isGlobalGridView,
        incrementInstanceCount,
        decrementInstanceCount,
        toggleInstanceActiveStatus,
        toggleGlobalPause,
        toggleGlobalGridView,
        activeInstanceCount,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};
