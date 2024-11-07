import React from "react";
import { CarouselProvider } from "./components/CarouselContext";
import Carousel from "./components/Carousel";
import GlobalCarouselControls from "./components/GlobalCarouselControls";
import { Debug } from "./components/Debug";

function App() {
  const livingRoomPromos = [
    {
      full_image: "/banners/one.jpg",
      mobile_image: "/banners/one_mobile.jpg",
      alt: "Fall Sale. Terrific rooms! Thrilling prices! Time to save! Show now",
      href: "/sales/fall/living-rooms",
    },
    {
      full_image: "/banners/two.jpg",
      mobile_image: "/banners/two_mobile.jpg",
      alt: "Introducing SHAQ Recliner by Lazboy. Exclusively at Rooms To Go. Shop Now",
      href: "/furniture/product/the-shaq-black-leather-rocker-recliner/18517776",
    },
    {
      full_image: "/banners/three.jpg",
      mobile_image: "/banners/three_mobile.jpg",
      alt: "Shop by style. Your style adventure begins here. View More",
      href: "/inspiration/shop-by-style",
    },
    {
      full_image: "/banners/four.jpg",
      mobile_image: "/banners/four_mobile.jpg",
      alt: "The story of reclining. Sit back. Relax. End of story. Shop Now",
      href: "/furniture/living-rooms/reclining",
    },
  ];

  const diningRoomPromos = [
    {
      full_image: "/banners/three.jpg",
      mobile_image: "/banners/three_mobile.jpg",
      alt: "Shop By Style. Your style adventure begins here. View More",
      href: "/inspiration/shop-by-style",
    },
    {
      full_image: "/banners/four.jpg",
      mobile_image: "/banners/four_mobile.jpg",
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
          showSwitch={true}
          slides={livingRoomPromos} // Slides Array Obj with keys: image & alt
          slideDelayInt={3} // Change slides every 3 seconds
          // onTranssionEvent={({ descriptionTitle, slides, currentSlide, count, stopAfter }) => {
          //   console.group("%c Explination of exposed variables","background-color: #000; color: yellow; padding: 5px 10px;");
          //   console.log("onTranssionEvent:")
          //   console.log("\tdescriptionTitle:",descriptionTitle)
          //   console.log("\tslides:",slides)
          //   console.log("\tcurrentSlide:",currentSlide)
          //   console.log("\tcount:",count)
          //   console.log("\tstopAfter:",stopAfter)
          //   // Perform any SEO-related tasks / analytics or additional functions you would like to apply
          //   console.groupEnd();
          // }}
          stopAfter={25} // Stop slider after {x} only valid when autoPlay=true
          gridView={false} // Turns slides into top stacked content on load





          ariaLive={true} // 508 Announce slide change

          autoPlay={true} // Play slides on load
          


          
          // controls show / hide
          showControls={true} // Show Play, Pause, Stop controls
          showPrevNext={true} // Show Previous / Next Buttons
          showSlideDots={true} // Show the slide dot navigation
          resetOnStop={false} // Stop on current slide | reset to first
        />

        <Carousel
          descriptionTitle="Dining Room Promos"
          showSwitch={true}
          slides={diningRoomPromos} // Slides Array Obj with keys: image & alt
          slideDelayInt={3} // Change slides every 3 seconds
          // onTranssionEvent={({ descriptionTitle, slides, currentSlide, count, stopAfter }) => {
          //   console.group("%c Explination of exposed variables","background-color: #000; color: yellow; padding: 5px 10px;");
          //   console.log("onTranssionEvent:")
          //   console.log("\tdescriptionTitle:",descriptionTitle)
          //   console.log("\tslides:",slides)
          //   console.log("\tcurrentSlide:",currentSlide)
          //   console.log("\tcount:",count)
          //   console.log("\tstopAfter:",stopAfter)
          //   // Perform any SEO-related tasks / analytics or additional functions you would like to apply
          //   console.groupEnd();
          // }}
          stopAfter={25} // Stop slider after {x} only valid when autoPlay=true
          gridView={false} // Turns slides into top stacked content on load




          ariaLive={true} // 508 Announce slide change

          autoPlay={true} // Play slides on load
          

          
          
          // controls show / hide
          showControls={true} // Show Play, Pause, Stop controls
          showPrevNext={true} // Show Previous / Next Buttons
          showSlideDots={true} // Show the slide dot navigation
          resetOnStop={false} // Stop on current slide | reset to first
        />
        <Debug />
      </div>
    </CarouselProvider>
  );
}

export default App;
