import React, { useState } from "react";

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

export const ImageSlide = ({
  slide,
  index,
  currentSlide,
  gridView,
  handlePlay,
  handlePause,
  handleFocus,
  handleBlur,
}) => {
  const [mouseDown, setMouseDown] = useState(false); // Track mouseDown state
  const isActive = index === currentSlide;

  return (
    <a
      href={slide.href}
      tabIndex={gridView ? null : isActive ? null : "-1"}
      onMouseEnter={(event) => {
        if (!gridView) {
          handlePause(event);
        }
      }}
      onMouseLeave={(event) => {
        if (!gridView) {
          handlePlay(event);
        }
      }}
      onMouseDown={(event) => {
        // Set mouseDown to true when the mouse is pressed
        setMouseDown(true);
      }}
      onMouseUp={(event) => {
        // Set mouseDown to false when the mouse is released
        setMouseDown(false);
      }}
      onFocus={(event) => {
        if (!mouseDown) {
          // Only handle focus if the mouse isn't down
          handleFocus(event, index, currentSlide);
        }
      }}
      onBlur={handleBlur}
    >
      <img src={slide.image} alt="" role="presentation" aria-hidden="true" />
      <span className="hide508">{slide.alt}</span>
    </a>
  );
};

export const StopPlayButton = (
  isPlaying,
  resetOnStop,
  handlePause,
  handlePlay
) => {
  const buttonLabel = () => {
    if (isPlaying) {
      return resetOnStop ? "Stop and reset" : "Stop";
    }
    return "Play";
  };
  return (
    <button
      onClick={() => {
        isPlaying ? handlePause() : handlePlay();
      }}
    >
      <SvgContainer>
        {isPlaying ? (
          <path d="M4.5 4.5h15v15h-15z" />
        ) : (
          <path d="M6 19.5v-15L18 12 6 19.5Z" />
        )}
      </SvgContainer>
      <span className="hide508">{buttonLabel()}</span>
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
      {StopPlayButton(isPlaying, resetOnStop, handlePause, handlePlay)}

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

export default SvgContainer;
