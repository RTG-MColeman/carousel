
# Carousel Component Documentation

The Carousel component provides a highly customizable and accessible carousel that can be integrated into various parts of an application. It supports both image-only slides and complex HTML content. It also allows for a global pause/play control and a grid view toggle.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Context and Global Controls](#context-and-global-controls)
- [Functions and Callbacks](#functions-and-callbacks)

---

## Installation

Add the carousel component and supporting files to your project and import as needed.

```javascript
import Carousel from './components/Carousel';
import { CarouselProvider } from './components/CarouselContext';
import GlobalCarouselControls from './components/GlobalCarouselControls';
```

## Usage

Wrap the Carousel component in a `CarouselProvider` to use the global controls and state context.

```javascript
<CarouselProvider>
  <GlobalCarouselControls />
  <Carousel
    descriptionTitle="Living Room Promos"
    slides={livingRoomPromos}
    autoPlay={true}
    cellsToShow={3}
    ariaLive={true}
    showControls={true}
    onTransitionEvent={/* callback function */}
  />
</CarouselProvider>
```

---

## Props

| Prop               | Type       | Default      | Description |
|--------------------|------------|--------------|-------------|
| `descriptionTitle` | `string`   | "Title"      | Accessible label for the carousel describing the content. |
| `slides`           | `array`    | `[]`         | Array of slide objects. Each slide object should include `image`, `alt`, and optionally `href` for linking. |
| `onlyImages`       | `boolean`  | `true`       | Indicates if slides are image-only. If `false`, slides can include HTML content. |
| `cellsToShow`      | `number`   | `1`          | Number of items to display per slide. |
| `ariaLive`         | `boolean`  | `true`       | Enables ARIA live region announcements for screen readers on slide change. |
| `isGridView`       | `boolean`  | `false`      | Initial layout mode, grid or carousel. Grid mode displays slides in a grid layout without autoplay. |
| `showGridButton`   | `boolean`  | `true`       | Toggles the display of the button that switches between grid and carousel view. |
| `autoPlay`         | `boolean`  | `false`      | Enables automatic slide transition on component mount. |
| `stopAfter`        | `number`   | `100`        | Number of automatic transitions before autoplay stops. |
| `slideDelayInt`    | `number`   | `3`          | Time (in seconds) between each slide transition in autoplay mode. |
| `showControls`     | `boolean`  | `true`       | Enables play/pause and stop controls for autoplay. |
| `showSlideDots`    | `boolean`  | `true`       | Displays dot navigation for slides. |
| `showPrevNext`     | `boolean`  | `true`       | Displays next and previous buttons. |
| `resetOnStop`      | `boolean`  | `false`      | If `true`, autoplay restarts from the first slide after stopping. |
| `onTransitionEvent`| `function` | `undefined`  | Callback function triggered on slide transition. Exposes carousel state variables. |

---

## Context and Global Controls

The `CarouselProvider` manages the global carousel state, enabling features like pausing all carousels and toggling all carousels between grid and standard views.

### Context Properties

- **`globalInstanceCount`**: Total number of Carousel instances on the page.
- **`carouselActiveCount`**: Number of active carousels currently in view (i.e., not in grid view).
- **`isGlobalPaused`**: Boolean indicating if all carousels are paused.
- **`isGlobalGridView`**: Boolean indicating if all carousels are in grid view.
- **`uniqueIds`**: An array of unique IDs associated with each carousel for ARIA referencing and control linkage.

### Global Controls

**GlobalCarouselControls** component provides the following buttons:

- **Pause All**: Pauses all carousels. Button text changes to `Resume All` when paused.
- **Switch All to Grid View**: Switches all carousels to grid view. Button text changes to `Restore All to Carousel View` when all carousels are in grid view.

---

## Functions and Callbacks

### Global Context Functions

1. **`toggleGlobalPause()`**  
   Pauses or resumes all carousels based on the current state.

2. **`toggleGlobalGridView()`**  
   Switches all carousels to grid view if they are in carousel view, and vice versa.

### Local Component Callbacks

1. **`onTransitionEvent({ slides, currentSlide, count, stopAfter, gridView, isFocused })`**  
   Callback triggered on each slide transition. Provides access to:
   - `slides`: Array of slide objects.
   - `currentSlide`: Index of the currently active slide.
   - `count`: Number of automatic transitions made.
   - `stopAfter`: Maximum number of automatic transitions before stopping.
   - `gridView`: Indicates if the carousel is currently in grid view.
   - `isFocused`: Boolean indicating if a slide is currently focused.

---

## Example

```javascript
<CarouselProvider>
  <GlobalCarouselControls />
  <Carousel
    descriptionTitle="Dining Room Deals"
    slides={diningRoomPromos}
    onlyImages={true}
    cellsToShow={3}
    autoPlay={true}
    slideDelayInt={5}
    showControls={true}
    showPrevNext={true}
    showSlideDots={true}
  />
</CarouselProvider>
```

This setup initializes a `Carousel` component with autoplay enabled, 5-second transitions, and custom controls, alongside global pause and grid view controls.

---

## Notes

- Ensure each `Carousel` component is wrapped inside a `CarouselProvider` to utilize global controls.
- ARIA properties are implemented for screen reader compatibility, enhancing accessibility.
- `onTransitionEvent` can be used for tracking and analytics integration based on carousel interactions.

