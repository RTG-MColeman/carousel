import React, { createContext, useState, useCallback, useContext } from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [instanceCount, setInstanceCount] = useState(0); // Total instances
  const [activeInstanceCount, setActiveInstanceCount] = useState(0); // Only active carousels (not in grid view)
  const [isGlobalPaused, setIsGlobalPaused] = useState(false);
  const [isGlobalGridView, setIsGlobalGridView] = useState(false);

  const incrementInstanceCount = useCallback(() => {
    setInstanceCount((prev) => {
      return prev + 1;
    });
    setActiveInstanceCount((prev) => {
      return prev + 1;
    });
  }, []);

  const decrementInstanceCount = useCallback(() => {
    setInstanceCount((prev) => {
      const newCount = Math.max(prev - 1, 0);
      return newCount;
    });
    setActiveInstanceCount((prev) => {
      const newCount = Math.max(prev - 1, 0);
      return newCount;
    });
  }, []);

  const toggleInstanceActiveStatus = useCallback((isActive) => {
    setActiveInstanceCount((prev) => {
      const newCount = isActive ? prev + 1 : Math.max(prev - 1, 0);
      return newCount;
    });
  }, []);

  const toggleGlobalPause = useCallback(() => {
    setIsGlobalPaused((prev) => !prev);
  }, []);

  const toggleGlobalGridView = useCallback(() => {
    setIsGlobalGridView((prev) => {
      const newState = !prev;
      setActiveInstanceCount(newState ? 0 : instanceCount); // Set active count based on grid view
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
        incrementInstanceCount,
        decrementInstanceCount,
        toggleInstanceActiveStatus,
        toggleGlobalPause,
        toggleGlobalGridView,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselControl = () => useContext(CarouselContext);
