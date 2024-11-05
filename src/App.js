import React from "react";
import { CarouselProvider } from "./components/CarouselContext";
import Carousel from "./components/Carousel";
import GlobalCarouselControls from "./components/GlobalCarouselControls";

function App() {
  const livingRoomPromos = [
    {
      image:
        "/banners/one.jpg",
      alt: "Fall Sale. Terrific rooms! Thrilling prices! Time to save! Show now",
      href: "/sales/fall/living-rooms",
    },
    {
      image:
        "/banners/two.jpg",
      alt: "Introducing SHAQ Recliner by Lazboy. Exclusively at Rooms To Go. Shop Now",
      href: "/furniture/product/the-shaq-black-leather-rocker-recliner/18517776",
    },
    {
      image:
        "/banners/three.jpg",
      alt: "Shop by style. Your style adventure begins here. View More",
      href: "/inspiration/shop-by-style",
    },
    {
      image:
        "/banners/four.jpg",
      alt: "The story of reclining. Sit back. Relax. End of story. Shop Now",
      href: "/furniture/living-rooms/reclining",
    },
  ];

  const diningRoomPromos = [
    {
      image:
        "/banners/three.jpg",
      alt: "Shop By Style. Your style adventure begins here. View More",
      href: "/inspiration/shop-by-style",
    },
    {
      image:
        "/banners/four.jpg",
      alt: "Dining Room Sets. Cool or casual. Elegant or extravagant. Your new dining room awaits! Shop Now",
      href: "/furniture/dining-rooms/sets",
    },
  ];

  // prettier-ignore
  return (
    <CarouselProvider>
      <GlobalCarouselControls />
      <div className="App">
        <Carousel
          descriptionTitle="Living Room Promos"
          slides={livingRoomPromos} // Slides Array Obj with keys: image & alt
          onlyImages={true} // If carousel slides are only images
          cellsToShow={4} // Number of columns per-slide
          ariaLive={true} // 508 Announce slide change
          isGridView={false} // Turns slides into top stacked content on load
          showGridButton={true} // Show toggle for stacked content or carousel
          autoPlay={true} // Play slides on load
          //stopAfter={25} // Stop slider after {x} only valid when autoPlay=true
          slideDelayInt={3} // Change slides every 3 seconds
          showControls={true} // Show Play, Pause, Stop controls
          showPrevNext={true} // Show Previous / Next Buttons
          showSlideDots={true} // Show the slide dot navigation
          resetOnStop={false} // Stop on current slide | reset to first
          onTranssionEvent={({ slides, currentSlide, count, stopAfter, gridView, isFocused, }) => {
            // Perform any SEO-related tasks / analytics or additional functions you would like to apply
            // console.clear();
            // console.group("%c Explination of exposed variables","background-color: #000; color: yellow; padding: 5px 10px;");
            // console.log("%c Variables:", "background-color: #f00; color: #fff");
            // console.log("slides:%c %o %c // Full object of the data used to build the slides","background-color: #f00; color: #fff",slides,"color: #0f0");
            // console.table(slides);
            // console.log("currentSlide:%c %s %c // Current active slide index - array[index]","background-color: #f00; color: #fff",currentSlide,"color: #0f0");
            // console.log("count:%c %s %c // Count of the slider's transsion during autoPlay","background-color: #f00; color: #fff",count,"color: #0f0");
            // console.log("\tOnly used when 'autoPlay' prop is 'true'");
            // console.log("\tWorks with the 'stopAfer' prop to prevent the carousel from looping forever");
            // console.log("stopAfter:%c %s %c // Total times slider will transsion before stopping","background-color: #f00; color: #fff",stopAfter,"color: #0f0");
            // console.log("\tOnly used when 'autoPlay' prop is 'true'");
            // console.log("gridView:%c %s %c // Bool to check if slider has been switched to grid view","background-color: #f00; color: #fff",gridView,"color: #0f0");
            // console.log("\tWill disable 'count' & 'stopAfter' exposed variables in this function");
            // console.log("isFocused:%c %s %c // Is a slide currently focused?","background-color: #f00; color: #fff",isFocused,"color: #0f0");
            // console.log("\t'<a>' tags are the only ones in the tabindex when 'onlyImages' prop is 'true'");
            // console.log("\tHelpful if you are wanting to capture if 'keyDown' events are being triggered within the slider's container");
            // console.groupEnd();
          }}
        />

        <Carousel
          descriptionTitle="Dining Room Promos"
          slides={diningRoomPromos} // Slides Array Obj with keys: image & alt
          onlyImages={true} // If carousel slides are only images
          cellsToShow={4} // Number of columns per-slide
          ariaLive={true} // 508 Announce slide change
          isGridView={false} // Turns slides into top stacked content on load
          showGridButton={true} // Show toggle for stacked content or carousel
          autoPlay={true} // Play slides on load
          slideDelayInt={3} // Change slides every 3 seconds
          showControls={true} // Show Play, Pause, Stop controls
          showPrevNext={true} // Show Previous / Next Buttons
          showSlideDots={true} // Show the slide dot navigation
          resetOnStop={false} // Stop on current slide | reset to first
        />
      </div>
    </CarouselProvider>
  );
}

export default App;
