// CarouselContext.js
import React, { createContext, useState, useContext, useCallback } from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [isGlobalPaused, setIsGlobalPaused] = useState(false);
  const [activeInstanceCount, setActiveInstanceCount] = useState(0);

  const incrementInstanceCount = useCallback(() => {
    setActiveInstanceCount((count) => count + 1);
  }, []);

  const decrementInstanceCount = useCallback(() => {
    setActiveInstanceCount((count) => Math.max(count - 1, 0));
  }, []);

  const toggleGlobalPause = () => {
    setIsGlobalPaused((paused) => !paused);
  };

  return (
    <CarouselContext.Provider
      value={{
        isGlobalPaused,
        activeInstanceCount,
        incrementInstanceCount,
        decrementInstanceCount,
        toggleGlobalPause,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselControl = () => useContext(CarouselContext);
