import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slidebar = () => {
    const images = ["assets/img1.jpg","assets/img2.jpg","assets/img3.jpg","assets/img4.jpg","assets/img5.jpg"];

    return (
        <Zoom scale={1.4} indicators={true}>
            {images.map((each, index) => (
                <div key={index} style={{ width: "100%", align:"center" }}>
                    
                    <img style={{ objectFit: "cover", width: "100%" , align:"center" }} alt="Slide Image" src={each} />
                </div>
            ))}
        </Zoom>
    );
};

export default Slidebar;