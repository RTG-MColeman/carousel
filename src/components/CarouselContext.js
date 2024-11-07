/* prettier-ignore */
import React, { createContext, useState, useCallback, useContext, useRef, useEffect, } from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  // Centralized state management
  const [uniqueIds, setUniqueIds] = useState([]);
  const [globalInstanceCount, setGlobalInstanceCount] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 639);



  const [isGlobalPaused, setGlobalPaused] = useState(false);
  const [isGlobalGridView, setGlobalGridView] = useState(false);




  const [autoPlay, setAutoPlay] = useState({});







  // Track props per instance
  const [currentSlides, setCurrentSlides] = useState({});
// TODO: working here
const updateCurrentSlide = (uniqueId, slideIndex, propGridView) => {
  console.log("updateCurrentSlide called during:", new Date(), "with uniqueId:", uniqueId);
  if (propGridView) {
    return; // Prevent state update if in grid view
  }

  setCurrentSlides((prev) => {
    if (prev[uniqueId] !== slideIndex) {
      console.log("Updating current slide for uniqueId:", uniqueId, "to slideIndex:", slideIndex);
      return { ...prev, [uniqueId]: slideIndex };
    }
    return prev;
  });
};



  // const updateCurrentSlide = (uniqueId, slideIndex) => {
  //   setCurrentSlides((prev) => {
  //     if (prev[uniqueId] !== slideIndex) {
  //       return { ...prev, [uniqueId]: slideIndex };
  //     }
  //     return prev; // Avoid state update if value hasn't changed
  //   });
  // };




  const [gridView, setGridView] = useState({});


  const [slideDelayInt, setSlideDelayInt] = useState(3);
  const [showControls, setShowControls] = useState(true);
  const [showSlideDots, setShowSlideDots] = useState(true);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [gridViewCount, setGridViewCount] = useState([]);
  const [pauseCount, setPauseCount] = useState([]);
  const [carouselCount, setCarouselCount] = useState([]);
  

  // Update isMobileView when the window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 639);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Utility function for announcements
  const ariaLiveRef = useRef(null);
  const announce = useCallback((message) => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message;
    }
  }, []);






  // Handlers for state updates
  const toggleGlobalPause = useCallback(() => {
    setGlobalPaused((prev) => !prev);
  }, []);










// TODO: NEW effort
  useEffect(() => {
    if (gridViewCount.length === globalInstanceCount.length) {
      setGlobalGridView(true);
    } else {
      setGlobalGridView(false);
    }
  }, [gridViewCount, globalInstanceCount]);
  
  useEffect(() => {
    if (pauseCount.length === globalInstanceCount.length) {
      setGlobalPaused(true);
    } else {
      setGlobalPaused(false);
    }
  }, [pauseCount, globalInstanceCount]);











  // Custom hook to create add and remove handlers
  const useAddRemoveHandlers = (setter, state) => {
    const addHandler = useCallback(
      (uniqueId) => {
        setter((prevIds) => [...prevIds, uniqueId]);
        return state + 1;
      },
      [state, setter]
    );

    const removeHandler = useCallback(
      (uniqueId) => {
        setter((prevIds) => prevIds.filter((id) => id !== uniqueId));
        return state - 1;
      },
      [state, setter]
    );

    return { addHandler, removeHandler };
  };

  // Usage of custom hook:useAddRemoveHandlers
  const { addHandler: addUniqueIds, removeHandler: removeUniqueIds } =
    useAddRemoveHandlers(setUniqueIds, uniqueIds);
    
  const {
    addHandler: addGlobalInstanceCount,
    removeHandler: removeGlobalInstanceCount,
  } = useAddRemoveHandlers(setGlobalInstanceCount, globalInstanceCount);

  const { addHandler: addCarouselCount, removeHandler: removeCarouselCount } =
    useAddRemoveHandlers(setCarouselCount, carouselCount);

  const { addHandler: addPauseCount, removeHandler: removePauseCount } =
    useAddRemoveHandlers(setPauseCount, pauseCount);

  const { addHandler: addGridViewCount, removeHandler: removeGridViewCount } =
    useAddRemoveHandlers(setGridViewCount, gridViewCount);





    






















// TODO: working here
const toggleGlobalGridView = () => {
  setGlobalGridView((prev) => {
    if (!prev) {
      // Turn all instances ON: Populate pauseCount and gridViewCount, and empty carouselCount
      setCarouselCount([]); // Empty the carouselCount array
      setPauseCount(globalInstanceCount); // Populate with all uniqueIds to mark as paused
      setGridViewCount(globalInstanceCount); // Populate with all uniqueIds to mark as grid view

      // Update the gridView state for each uniqueId
      setGridView((prevGrid) => {
        const newGridView = {};
        globalInstanceCount.forEach((id) => {
          newGridView[id] = true; // Set each instance to grid view
        });
        return newGridView;
      });

      return true; // Set isGlobalGridView to true
    } else {
      // Turn all instances OFF: Empty pauseCount and gridViewCount, and populate carouselCount
      setPauseCount([]); // Clear the pauseCount array
      setGridViewCount([]); // Clear the gridViewCount array
      setCarouselCount(globalInstanceCount); // Populate with all uniqueIds to mark as carousel view

      // Update the gridView state for each uniqueId
      setGridView((prevGrid) => {
        const newGridView = {};
        globalInstanceCount.forEach((id) => {
          newGridView[id] = false; // Set each instance to carousel view
        });
        return newGridView;
      });

      return false; // Set isGlobalGridView to false
    }
  });
};


    


    
    const toggleLocalGridView = (uniqueId) => {
      setGridView((prev) => {
        const newGridState = { ...prev, [uniqueId]: !prev[uniqueId] };
        return newGridState;
      });
    
      setPauseCount((prev) =>
        !prev.includes(uniqueId)
          ? [...prev, uniqueId] // Add if switching to grid view
          : prev.filter((id) => id !== uniqueId) // Remove if switching back to carousel
      );
    };
    
 
    
    
    























  // LEAVE LAST SO UPDATE HAPPENS AFTER FUNCTIONS
  const updateGridView = useCallback((value) => {
    if (typeof value !== 'object' || value === null) {
      console.error("updateGridView expects an object. Received:", value);
      return;
    }
    setGridView((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  
  const updateSlideDelayInt = (value) => setSlideDelayInt(value);
  const updateShowControls = (value) => setShowControls(value);
  const updateShowSlideDots = (value) => setShowSlideDots(value);
  const updateShowPrevNext = (value) => setShowPrevNext(value);

  return (
    <CarouselContext.Provider
      value={{
        // hooks
        useAddRemoveHandlers, //removed need for add/remove{X}

        // props
        // stopAfter = 100,

        // global variables
        isMobileView,
        uniqueIds,
        addUniqueIds,
        removeUniqueIds,

        announce,
        globalInstanceCount,
        addGlobalInstanceCount,
        removeGlobalInstanceCount,

        isGlobalGridView,
        toggleGlobalGridView,

        toggleLocalGridView,

        isGlobalPaused,
        toggleGlobalPause,

        // carousel, paused and gridview counts
        carouselCount,
        setCarouselCount,
        addCarouselCount,
        removeCarouselCount,

        pauseCount,
        setPauseCount,
        addPauseCount,
        removePauseCount,

        gridViewCount,
        setGridViewCount,
        addGridViewCount,
        removeGridViewCount,

        gridView,
        setGridView,
        updateGridView,


        // animation info
        autoPlay,


        slideDelayInt,
        updateSlideDelayInt,
        currentSlides,
        setCurrentSlides,
        updateCurrentSlide,

        // controls
        showControls,
        updateShowControls,
        showPrevNext,
        updateShowPrevNext,
        showSlideDots,
        updateShowSlideDots,
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
