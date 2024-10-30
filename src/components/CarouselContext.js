import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [globalInstanceCount, setGlobalInstanceCount] = useState([]); // track all carousel's on page

  const [isGlobalGridView, setGlobalGridView] = useState(false); // global grid view check
  const [carouselActiveCount, setCarouselActiveCount] = useState([]); // only active carousels (not in grid view)

  const [isGlobalPaused, setGlobalPaused] = useState(false); // global pause check
  const [carouselPauseCount, setCarouselPauseCount] = useState([]); // Only active carousels (not paused)

  const [instanceCount, setInstanceCount] = useState(0); // Total instances

  const [uniqueIds, setUniqueIds] = useState([]); // Array to track unique IDs

  // Ref for the aria-live region
  const ariaLiveRef = useRef(null);

  // Function to handle announcements
  const announce = useCallback((message) => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message;
    }
  }, []);

  const addGlobalInstanceCount = useCallback(
    (uniqueId) => {
      setUniqueIds((prevIds) => [...prevIds, uniqueId]);
      setGlobalInstanceCount((prevIds) => [...prevIds, uniqueId]);
      return globalInstanceCount + 1;
    },
    [globalInstanceCount]
  );
  const removeGlobalInstanceCount = useCallback(
    (uniqueId) => {
      setUniqueIds((prevIds) => prevIds.filter((id) => id !== uniqueId));
      setGlobalInstanceCount((prevIds) =>
        prevIds.filter((id) => id !== uniqueId)
      );
      return globalInstanceCount - 1;
    },
    [globalInstanceCount]
  );

  const addCarouselActiveCount = useCallback((uniqueId) => {
    setCarouselActiveCount((prevIds) => {
      if (!prevIds.includes(uniqueId)) {
        const updatedIds = [...prevIds, uniqueId];
        return updatedIds;
      }
      return prevIds;
    });
  }, []);

  const removeCarouselActiveCount = useCallback((uniqueId) => {
    console.log("removeCarouselActiveCount:", uniqueId)
    setCarouselActiveCount((prevIds) => {
      const updatedIds = prevIds.filter((id) => id !== uniqueId);
      return updatedIds;
    });
  }, []);
  
  const addCarouselPauseCount = useCallback((uniqueId) => {
    setCarouselPauseCount((prevIds) => {
      if (!prevIds.includes(uniqueId)) {
        const updatedIds = [...prevIds, uniqueId];
        return updatedIds;
      }
      return prevIds;
    });
  }, []);

  const removeCarouselPauseCount = useCallback((uniqueId) => {
    setCarouselPauseCount((prevIds) => {
      const updatedIds = prevIds.filter((id) => id !== uniqueId);
      return updatedIds;
    });
  }, []);

  const toggleGlobalGridView = useCallback(() => {
    setGlobalGridView((prev) => !prev);

    setCarouselActiveCount((prevPauseCount) => {
      if (prevPauseCount.length !== 0) {
        prevPauseCount.forEach((item) => removeCarouselActiveCount(item));
        return [];
      } else {
        const uniqueInstances = globalInstanceCount.filter(
          (item) => !prevPauseCount.includes(item)
        );
        uniqueInstances.forEach((item) => addCarouselActiveCount(item));
        return [...prevPauseCount, ...uniqueInstances];
      }
    });
  }, [globalInstanceCount, addCarouselActiveCount, removeCarouselActiveCount]);

  const toggleGlobalPause = useCallback(() => {
    setGlobalPaused((prev) => !prev);

    setCarouselPauseCount((prevPauseCount) => {
      if (prevPauseCount.length !== 0) {
        prevPauseCount.forEach((item) => removeCarouselPauseCount(item));
        return [];
      } else {
        const uniqueInstances = globalInstanceCount.filter(
          (item) => !prevPauseCount.includes(item)
        );
        uniqueInstances.forEach((item) => addCarouselPauseCount(item));
        return [...prevPauseCount, ...uniqueInstances];
      }
    });
  }, [globalInstanceCount, addCarouselPauseCount, removeCarouselPauseCount]);






















  const toggleInstanceActiveStatus = useCallback((isActive) => {
    setCarouselActiveCount((prevCount) => prevCount + (isActive ? 1 : -1));
  }, []);

  const incrementInstanceCount = useCallback((uniqueId) => {
    if (!uniqueId) {
      return;
    }

    setInstanceCount((prevCount) => prevCount + 1);
    setCarouselActiveCount((prevCount) => prevCount + 1);
    setUniqueIds((prevIds) => [...prevIds, uniqueId]);

    return instanceCount + 1;
  }, []);

  const decrementInstanceCount = useCallback(
    (uniqueId) => {
      if (!uniqueId) {
        return;
      }

      setInstanceCount((prevCount) => prevCount - 1);
      setCarouselActiveCount((prevCount) => prevCount - 1);
      setUniqueIds((prevIds) => prevIds.filter((id) => id !== uniqueId));

      return instanceCount - 1;
    },
    [instanceCount, carouselActiveCount]
  );


  return (
    <CarouselContext.Provider
      value={{
        uniqueIds,
        announce,

        isGlobalGridView,
        setGlobalGridView,

        globalInstanceCount,
        addGlobalInstanceCount,
        removeGlobalInstanceCount,

        carouselActiveCount,
        addCarouselActiveCount,
        removeCarouselActiveCount,

        carouselPauseCount,
        addCarouselPauseCount,
        removeCarouselPauseCount,

        instanceCount,
        isGlobalPaused,

        incrementInstanceCount,
        decrementInstanceCount,
        toggleInstanceActiveStatus,
        toggleGlobalPause,
        toggleGlobalGridView,
      }}
    >
      {children}
      <div
        ref={ariaLiveRef}
        aria-live="polite"
        style={{ position: "absolute", left: "-9999px" }}
      />
    </CarouselContext.Provider>
  );
};

export const useCarouselControl = () => useContext(CarouselContext);
