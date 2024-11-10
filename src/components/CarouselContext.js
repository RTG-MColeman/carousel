/* prettier-ignore */
import React, { createContext, useState, useCallback, useContext, useRef, useEffect, } from "react";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  // Centralized state management
  const [uniqueIds, setUniqueIds] = useState([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 639);
  const [globalInstanceCount, setGlobalInstanceCount] = useState([]);
  const [carouselCount, setCarouselCount] = useState([]);

  //grid views
  const [gridView, setGridView] = useState({});
  const [gridViewCount, setGridViewCount] = useState([]);
  const [isGlobalGridView, setGlobalGridView] = useState(false);

  //paused views
  const [pauseCount, setPauseCount] = useState([]);
  const [isGlobalPaused, setGlobalPaused] = useState(false);

  //play views
  const [autoPlay, setAutoPlay] = useState({});
  const [playCount, setPlayCount] = useState([]);

  const [showControls, setShowControls] = useState(true);
  const [showSlideDots, setShowSlideDots] = useState(true);
  const [showPrevNext, setShowPrevNext] = useState(true);

  //slides

  const [currentSlides, setCurrentSlides] = useState({});
  const [slideDelayInt, setSlideDelayInt] = useState(3);

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

  //slide views
  const updateCurrentSlide = (uniqueId, slideIndex, propGridView) => {
    if (propGridView) {
      return; // Prevent state update if in grid view
    }

    setCurrentSlides((prev) => {
      if (prev[uniqueId] !== slideIndex) {
        return { ...prev, [uniqueId]: slideIndex };
      }
      return prev;
    });
  };

  // Utility function for announcements
  const ariaLiveRef = useRef(null);
  const announce = useCallback((message) => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message;
    }
  }, []);

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

  const { addHandler: addPlayCount, removeHandler: removePlayCount } =
    useAddRemoveHandlers(setPlayCount, pauseCount);

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

  // Add a new state to manage play status per uniqueId
  const [playingStatus, setPlayingStatus] = useState(() => {
    const initialStatus = {};
    uniqueIds.forEach((id) => {
      initialStatus[id] = true; // Set initial state to true (playing) or false as needed
    });
    return initialStatus;
  });

  const toggleLocalPlayPause = useCallback(
    (uniqueId) => {
      setPlayingStatus((prev) => {
        const newStatus = { ...prev, [uniqueId]: !prev[uniqueId] };
        return newStatus;
      });

      setPauseCount((prev) => {
        if (prev.includes(uniqueId)) {
          // Remove from pauseCount if resuming
          return prev.filter((id) => id !== uniqueId);
        } else {
          // Add to pauseCount if pausing
          return [...prev, uniqueId];
        }
      });
    },
    [setPlayingStatus, setPauseCount]
  );

  const toggleLocalGridView = (uniqueId) => {
    setGridView((prev) => {
      const newGridState = { ...prev, [uniqueId]: !prev[uniqueId] };
      return newGridState;
    });

    setPauseCount(
      (prev) =>
        !prev.includes(uniqueId)
          ? [...prev, uniqueId] //add if switching to grid view
          : prev.filter((id) => id !== uniqueId) //remove if switching back to carousel
    );
  };

  const toggleGlobalPause = useCallback(() => {
    setGlobalPaused((prev) => {
      if (!prev) {
        // Pause all carousels
        setPlayingStatus((prevStatus) => {
          const updatedStatus = { ...prevStatus };
          globalInstanceCount.forEach((id) => {
            updatedStatus[id] = false; // Set all to paused
          });
          return updatedStatus;
        });

        setPauseCount(globalInstanceCount); // Add all uniqueIds to pauseCount
        return true;
      } else {
        // Resume all carousels
        setPlayingStatus((prevStatus) => {
          const updatedStatus = { ...prevStatus };
          globalInstanceCount.forEach((id) => {
            updatedStatus[id] = true; // Set all to playing
          });
          return updatedStatus;
        });

        setPauseCount([]); // Clear the paused array
        return false;
      }
    });
  }, [globalInstanceCount, setPlayingStatus]);

  // LEAVE LAST SO UPDATE HAPPENS AFTER FUNCTIONS
  const updateGridView = useCallback((value) => {
    if (typeof value !== "object" || value === null) {
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

        // carousel, paused and gridview counts
        carouselCount,
        setCarouselCount,
        addCarouselCount,
        removeCarouselCount,

        playingStatus,
        toggleLocalPlayPause,

        isGlobalPaused,
        toggleGlobalPause,

        autoPlay,
        setPlayCount,
        addPlayCount,
        removePlayCount,
        setPlayingStatus,

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
      <>
        <span ref={ariaLiveRef} className="hide508" aria-live="polite"></span>
        <span id="carouselAdditionalInstructions" className="hide508">
          Use arrow keys to navigate between slides.
        </span>
      </>

      {children}
    </CarouselContext.Provider>
  );
};

export const useCarouselControl = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "useCarouselControl must be used within a CarouselProvider"
    );
  }
  return context;
};
