import React, { useRef, useEffect } from "react";
import { useCarouselControl } from "./CarouselContext";

export const GridViewButton = ({ uniqueId }) => {
  const {
    isGlobalGridView,
    gridView,
    addGridViewCount,
    removeGridViewCount,
    toggleLocalGridView,

    addCarouselCount,
    removeCarouselCount,
  } = useCarouselControl();

  const isGridView = gridView[uniqueId]; // Safely access the specific instance's state

  return (
    <div className="carousel-switch-view">
      <button
        className="carousel-switch-btn"
        onClick={() => {
          toggleLocalGridView(uniqueId);

          if (isGridView) {
            removeGridViewCount(uniqueId);
            addCarouselCount(uniqueId);
          } else {
            addGridViewCount(uniqueId);
            removeCarouselCount(uniqueId);
          }
        }}
      >
        {isGlobalGridView || isGridView
          ? "Switch to Carousel View"
          : "Switch to Grid View"}
      </button>
    </div>
  );
};

export const CarouselListItems = ({
  uniqueId,
  slides,
  currentSlide,
  handleKeyDown,
  handlePlay,
  handlePause,
  handleFocus,
  handleBlur,
}) => {
  const slideRefs = useRef([]);

  return (
    <div className="carousel-view">
      <ul
        className="carousel"
        aria-describedby={`${uniqueId}_title carouselAdditionalInstructions`}
      >
        {slides.map((slide, index) => {
          let slideClass = "";

          if (index === currentSlide) {
            slideClass = "active";
          } else if (
            index ===
            (currentSlide - 1 + slides.length) % slides.length
          ) {
            slideClass = "previous";
          } else if (index === (currentSlide + 1) % slides.length) {
            slideClass = "next";
          }

          return (
            <li
              ref={(el) => (slideRefs.current[index] = el)}
              key={index}
              className={`carousel-slide ${slideClass}`}
              onKeyDown={handleKeyDown}
            >
              <ImageSlide
                currentSlide={currentSlide}
                slide={slide}
                index={index}
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const GridlListItems = ({ slides }) => {
  // const slideRefs = useRef([]);

  return (
    <div className="grid-view">
      <ul className="grid">
        {slides.map((slide, index) => (
          <li key={index} className="grid-item">
            <ImageSlide slide={slide} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ImageSlide = ({ slide }) => {
  const {
    // global variables
    isMobileView,
  } = useCarouselControl();

  return (
    <a
      href={slide.href}
      tabIndex={"-1"}
      onMouseEnter={(event) => {}}
      onMouseLeave={(event) => {}}
      onMouseDown={(event) => {}}
      onMouseUp={(event) => {}}
      onFocus={(event) => {}}
      onBlur={(event) => {}}
    >
      <img
        src={isMobileView ? slide.mobile_image : slide.full_image}
        alt=""
        role="presentation"
        aria-hidden="true"
      />
      <span className="hide508">{slide.alt}</span>
    </a>
  );
};

//TODO: working here Ai
export const StopPlayButton = ({ uniqueId }) => {
  const { playingStatus, toggleLocalPlayPause, isGlobalPaused} = useCarouselControl();
  const isPlaying =
    playingStatus[uniqueId] !== undefined ? playingStatus[uniqueId] : false;

  return (
    <button onClick={() => toggleLocalPlayPause(uniqueId)}>
      <SvgContainer>
        {isPlaying && !isGlobalPaused ? (
          <path d="M4.5 4.5h15v15h-15z" />
        ) : (
          <path d="M6 19.5v-15L18 12 6 19.5Z" />
        )}
      </SvgContainer>
      <span className="hide508">{isPlaying ? "Stop" : "Play"}</span>
    </button>
  );
};

export const DotControls = (slides, currentSlide, handleDotClick) => {
  return (
    <ul className="carousel-indicators">
      {slides.map((_, index) => (
        <li
          key={index}
          className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
        >
          <button
            onClick={(e) => {
              handleDotClick(index);
            }}
          >
            <span className="hide508">Go to Slide: {index + 1}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export const NextPrevControls = ({
  uniqueId,
  isPlaying,
  resetOnStop,
  handlePause,
  handlePlay,
  handleDotClick,
  handlePrev,
  handleNext,
  slides,
  currentSlide,
  showPrevNext = true,
  showSlideDots = true,
}) => {
  return (
    <div className="carousel-nav">
      <StopPlayButton
        uniqueId={uniqueId}
        isPlaying={isPlaying}
        resetOnStop={resetOnStop}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />

      {showPrevNext && (
        <button onClick={handlePrev}>
          <SvgContainer>
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </SvgContainer>
          <span className="hide508">Previous Slide</span>
        </button>
      )}

      {/* Conditionally render the dot controls */}
      {showSlideDots && DotControls(slides, currentSlide, handleDotClick)}

      {showPrevNext && (
        <button onClick={handleNext}>
          <SvgContainer>
            <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </SvgContainer>
          <span className="hide508">Next Slide</span>
        </button>
      )}
    </div>
  );
};

export const taskDone = (fn, time, id) => {
  const timers = {};
  if (typeof fn === "function") {
    if (timers[id]) clearTimeout(timers[id]);
    timers[id] = setTimeout(fn, time);
  }
};

function SvgContainer({ color = "#003566", size = "24", children }) {
  return (
    /* prettier-ignore */
    <svg focusable="false" role="presentation" aria-hidden="true"
      fill={color} 
      viewBox={`0 0 ${size} ${size}`}
    >
      {children}
    </svg>
  );
}

// //TODO: working here
// const preventEvent = (e, reactName, useCount = false) => {
//   if (useCount) {
//     if (count >= propStopAfter && e?._reactName === reactName) return;
//   } else {
//     if (e?._reactName === reactName) return;
//   }
// };

export default SvgContainer;
