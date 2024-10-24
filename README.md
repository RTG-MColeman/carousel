# RTG-Carousel

This project was created to correct several issues with accessibility when carousels are used. Some of the main features this build corrects are:

- [x] Easy SEO interjection function with exposed variables using the 'onTranssionEvent' prop
- [x] Prop Controled UI features
    - [x] 'onlyImages' Used to create slides of a11y compliant banners
    - [ ] 'cellsToShow' Used when showing multiple HTML tiles
    - [x] 'ariaLive' Renders a container for announcing slide transissions (only works with 'autoPlay')
    - [ ] 'isGridView' HTML slide containers that do not 'autoPlay'
    - [x] 'showGridButton' Will turn banner sliders into stacked images for easy viewing
    - [x] 'autoPlay' Option to have the carousel auto play slides or not
    - [x] 'stopAfter' Option to turn off 'autoPlay' after {x} number of slides
    - [x] 'slideDelayInt' A whole number in seconds to show each slide
    - [x] 'showControls' Turn on/off display of Play/Pause/Prev/Next/Dots
    - [x] 'showSlideDots' Turn on/off Dots navigation
    - [x] 'showPrevNext' Turn on/off Previous/Next navigation
    - [x] 'resetOnStop' When stop button is pressed resets slide back to first slide
- [x] Autoplay is not forver. Prop created for 'stopAfter = 100' default value can change
- [x] Keyboard navigation including
    - [x] Auto Stop 'onFocus' of current slide
    - [x] Navigation Previous / Next slides with Left / Right arrow keys (when active slide is focused)
    - [x] Structured tab higharchy controled with 'tabindex'
        - [x] Button - 1st: "Switch to Grid View"
        - [x] Anchor.active - 2nd: "Currently visible slide -aka- "Active"
        - [x] Button - 3rd: "Stop / Play" toggle
        - [x] Button - 4th: "Previous Slide" 
        - [x] Button - 5th: "Dot Navigation" dot count per slide index
        - [x] Button - 6th: "Next Slide"
    - [x] - All navigation controls active with 'spacebar' or 'enter' keys

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More