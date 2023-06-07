import "./Carousel.css";
import { useState } from "react";

interface CarouselProps {
  imageBaseUrl: string;
  photo_ver: number;
  product_photo: string;
  car_id: number;
}

const Carousel: React.FC<CarouselProps> = ({ imageBaseUrl, car_id, product_photo, photo_ver}) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleRowMouseEnter = () => {
    setIsHovered(true);
  };

  const handleRowMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOverlayMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setActiveIndex(index);
  };

  const handleOverlayMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getImageUrl = (index: number) => {
    return `${imageBaseUrl.replace("{PHOTO_INDEX}", index.toString())}?v=${photo_ver}`;
  };

  return (
    <div className="container">
      <div className="image-container">
        <img className="image" src={getImageUrl(activeIndex)} alt="Image" />
      </div>
      <div
        className={`overlay-row ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleRowMouseEnter}
        onMouseLeave={handleRowMouseLeave}
      >
        <div
          className={`overlay ${hoveredIndex === 1 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(1)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 1 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 2 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(2)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 2 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 3 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(3)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 3 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 4 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(4)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 4 ? "red" : ""}`}></span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;


//   return (
//     <div className="carousel">
//       {[...Array(totalPhotos)].map((_, index) => (
//         <div
//           key={index}
//           className={`carousel-item${activeIndex === index ? " active" : ""}`}
//           onMouseOver={() => handleMouseOver(index)}
//         >
//           <img alt={`Image ${index + 1}`} />
//         </div>
//       ))}
//     </div>
//   );
// };

// {
//   /* <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="/en/pr/92732970/for-sell-cars-sedan-volkswagen-jetta-2014-petrol-tbilisi?offerType=superVip"
//       >
//         <div className="list-item__thumbnail flex-shrink-0 w-m-200px mb-12px mb-m-0 px-16px px-m-0">
//           <div className="list-item__thumbnail__container">
//             <div className="list-item__thumbnail__items ratio-4-3 w-100">
//               <div className="items">
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_1.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_2.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_3.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_4.jpg?v=4"
//                       alt=""
//                     />
//                     <div className="position-relative d-flex flex-column align-items-center justify-content-center rgba-gray-800-80 h-100">
//                       <span className="mb-16px">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           width="24"
//                           height="24"
//                         >
//                           <path
//                             fill="#ffffff"
//                             d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
//                           ></path>
//                         </svg>
//                       </span>
//                       <div className="d-flex align-items-end">
//                         <span className="d-flex font-bold font-size-32 line-height-1 text-white">
//                           + 4
//                         </span>
//                         <span className="d-flex font-base font-size-16 line-height-1 text-white opacity-70 ml-4px mb-2px">
//                           Photo
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </a> */
// }

// export default Carousel;


//   return (
//     <div className="carousel">
//       {[...Array(totalPhotos)].map((_, index) => (
//         <div
//           key={index}
//           className={`carousel-item${activeIndex === index ? " active" : ""}`}
//           onMouseOver={() => handleMouseOver(index)}
//         >
//           <img alt={`Image ${index + 1}`} />
//         </div>
//       ))}
//     </div>
//   );
// };

// {
//   /* <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="/en/pr/92732970/for-sell-cars-sedan-volkswagen-jetta-2014-petrol-tbilisi?offerType=superVip"
//       >
//         <div className="list-item__thumbnail flex-shrink-0 w-m-200px mb-12px mb-m-0 px-16px px-m-0">
//           <div className="list-item__thumbnail__container">
//             <div className="list-item__thumbnail__items ratio-4-3 w-100">
//               <div className="items">
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_1.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_2.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_3.jpg?v=4"
//                       alt=""
//                     />
//                   </div>
//                   <div className="items__button"></div>
//                 </div>
//                 <div className="items__page">
//                   <div className="items__image-wrapper">
//                     <img
//                       className="items__image"
//                       src="https://static.my.ge/myauto/photos/7/9/2/3/7/thumbs/92732970_4.jpg?v=4"
//                       alt=""
//                     />
//                     <div className="position-relative d-flex flex-column align-items-center justify-content-center rgba-gray-800-80 h-100">
//                       <span className="mb-16px">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           width="24"
//                           height="24"
//                         >
//                           <path
//                             fill="#ffffff"
//                             d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
//                           ></path>
//                         </svg>
//                       </span>
//                       <div className="d-flex align-items-end">
//                         <span className="d-flex font-bold font-size-32 line-height-1 text-white">
//                           + 4
//                         </span>
//                         <span className="d-flex font-base font-size-16 line-height-1 text-white opacity-70 ml-4px mb-2px">
//                           Photo
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </a> */
// }

// export default Carousel;
