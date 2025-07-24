import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";

// PhotoService - כולל בתוך אותו קובץ
const PhotoService = {
  getImages() {
    return Promise.resolve([
      {
        itemImageSrc: "/pics/LIFE.jpg",
        alt: "Image 1",
      },
      {
        itemImageSrc: "/pics/slippers.jpg",
        alt: "Image 2",
      },
      {
        itemImageSrc: "/pics/suka.jpg.jpg",
        alt: "Image 3",
      },
    //   {
    //     itemImageSrc: "/images/image4.jpg",
    //     alt: "Image 4",
    //   },
      // הוסף תמונות נוספות בהתאם לצורך
    ]);
  },
};

const Home = () => {
  const [images, setImages] = useState(null);

  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        style={{ maxWidth: "640px" }}
        showThumbnails={false}
        showIndicators
        item={itemTemplate}
        responsiveOptions={responsiveOptions}
        numVisible={5}
      />
    </div>
  );
};

export default Home;
