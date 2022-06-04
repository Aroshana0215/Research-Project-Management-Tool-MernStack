import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

function Home() {
    const images = [
        { url: "https://static.sliit.lk/wp-content/uploads/2020/01/06040608/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Data-Science.jpg" },
        { url: "https://static.sliit.lk/wp-content/uploads/2020/01/06040550/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Cyber-Security.jpg" },
        { url: "https://static.sliit.lk/wp-content/uploads/2020/01/06040527/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Software-Engineering.jpg" },
        { url: "https://static.sliit.lk/wp-content/uploads/2020/01/06040648/SLIIT-BSc-Hons-in-Information-Technology-Specializing-in-Information-Systems-Engineering.jpg" },
      ];
  return (
    <div>
        
      <SimpleImageSlider
        width="100%"
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  )
}

export default Home