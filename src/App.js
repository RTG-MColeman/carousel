import React from 'react';
import Carousel from './components/Carousel'; // Import the Carousel component

function App() {
  const livingRoomPromos = [
    {
      image: 'https://assets.roomstogo.com/C8_R1_Category_LR_FL_SW_1660x400.png?f=webp&cache-id=C8_R1_Category_LR_FL_SW_1660x400_e2e05cfca6',
      alt: 'Fall Sale. Terrific rooms! Thrilling prices! Time to save! Show now',
      href: '/sales/fall/living-rooms',
    },
    {
      image: 'https://assets.roomstogo.com/Shaq_Content_Updated_Desktop.jpg?f=webp&cache-id=Shaq_Content_Updated_Desktop_29c45d54b7',
      alt: 'Introducing SHAQ Recliner by Lazboy. Exclusively at Rooms To Go. Shop Now',
      href: '/furniture/product/the-shaq-black-leather-rocker-recliner/18517776',
    },
    {
      image: 'https://assets.roomstogo.com/sbs_lr_desktop.png?f=webp&cache-id=sbs_lr_desktop_1c963dc77f',
      alt: 'Shop by style. Your style adventure begins here. View More',
      href: '/inspiration/shop-by-style',
    },
    {
      image: 'https://assets.roomstogo.com/Reclining_Category_Banner_1660x400_SE.png?f=webp&cache-id=Reclining_Category_Banner_1660x400_SE_508cc0c452',
      alt: 'The story of reclining. Sit back. Relax. End of story. Shop Now',
      href: '/furniture/living-rooms/reclining',
    },
  ];

  const diningRoomPromos = [
    {
      image: 'https://assets.roomstogo.com/Shop_By_Style_Banner_DR_Page-Desktop.png?f=webp&cache-id=Shop_By_Style_Banner_DR_Page_Desktop_8c07fd78e3',
      alt: 'Shop By Style. Your style adventure begins here. View More',
      href: '/inspiration/shop-by-style',
    },
    {
      image: 'https://assets.roomstogo.com/RTG_FL_Hero_DR_DiningRoomSet_Category_VO_1660x400.png?f=webp&cache-id=RTG_FL_Hero_DR_Dining_Room_Set_Category_VO_1660x400_3c369a4bdb',
      alt: 'Dining Room Sets. Cool or casual. Elegant or extravagant. Your new dining room awaits! Shop Now',
      href: '/furniture/dining-rooms/sets',
    },
  ];


  return (
    <div className="App">
      <Carousel
        descriptionTitle="Living Room Promos"
        slides={livingRoomPromos} // Slides Array Obj with keys: image & alt
        onlyImages={true} // If carousel slides are only images
        cellsToShow={4} // Number of columns per-slide
        ariaLive={true} // 508 Announce slide change
        isGridView={false} // Turns slides into top stacked content on load
        showGridButton={true} // Show toggle for stacked content or carousel
        autoplay={true} // Play slides on load
        stopAfter={2} // Stop slider after {x} only valid when autoplay=true
        slideDelayInt={3} // Change slides every 3 seconds
        showControls={true} // Show Play, Pause, Stop controls
        showPrevNext={true} // Show Previous / Next Buttons
        showSlideDots={true} // Show the slide dot navigation
        resetOnStop={false} // Stop on current slide | reset to first

        onTranssionEvent={({ slides, currentSlide, count, stopAfter, gridView, isFocused }) => {
          // Perform any SEO-related tasks / analytics or additional functions you would like to apply
          // console.clear();
          // console.group("%c Explination of exposed variables", "background-color: #000; color: yellow; padding: 5px 10px;")
          // console.log("%c Variables:", "background-color: #f00; color: #fff");
          // console.log("slides:%c %o %c // Full object of the data used to build the slides", "background-color: #f00; color: #fff", slides, "color: #0f0")
          // console.table(slides)
          // console.log("currentSlide:%c %s %c // Current active slide index - array[index]", "background-color: #f00; color: #fff", currentSlide, "color: #0f0")
          // console.log("count:%c %s %c // Count of the slider's transsion during autoplay", "background-color: #f00; color: #fff", count, "color: #0f0")
          // console.log("\tOnly used when 'autoplay' prop is 'true'")
          // console.log("\tWorks with the 'stopAfer' prop to prevent the carousel from looping forever")
          // console.log("stopAfter:%c %s %c // Total times slider will transsion before stopping", "background-color: #f00; color: #fff", stopAfter, "color: #0f0")
          // console.log("\tOnly used when 'autoplay' prop is 'true'")
          // console.log("gridView:%c %s %c // Bool to check if slider has been switched to grid view", "background-color: #f00; color: #fff", gridView, "color: #0f0")
          // console.log("\tWill disable 'count' & 'stopAfter' exposed variables in this function")
          // console.log("isFocused:%c %s %c // Is a slide currently focused?", "background-color: #f00; color: #fff", isFocused, "color: #0f0")
          // console.log("\t'<a>' tags are the only ones in the tabindex when 'onlyImages' prop is 'true'")
          // console.log("\tHelpful if you are wanting to capture if 'keyDown' events are being triggered within the slider's container")
          // console.groupEnd()

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
        autoplay={true} // Play slides on load
        slideDelayInt={3} // Change slides every 3 seconds
        showControls={true} // Show Play, Pause, Stop controls
        showPrevNext={true} // Show Previous / Next Buttons
        showSlideDots={true} // Show the slide dot navigation
        resetOnStop={false} // Stop on current slide | reset to first
      />
    </div>
  );
}

export default App;