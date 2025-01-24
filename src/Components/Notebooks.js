import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useEffect } from "react";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const Notebooks = () => {
  const [imagePathIndex, setImagePathIndex] = useState(0);
  const notebooks = [
    "Five Star Spiral Notebooks",
    "Mead Composition Notebooks",
  ];
  const [toggledIndex, setToggledIndex] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  const containerRef = useRef();
  const notebook = [
    {
      name: "Five Star Spiral Notebooks",
      price: "$5.99",
      files: [
        "/products/notebooks/Five Star Spiral Notebooks/61Vm3FhFofL._AC_SL1500_.jpg",
        "/products/notebooks/Five Star Spiral Notebooks/71bYk23alFL._AC_SL1500_.jpg",
        "/products/notebooks/Five Star Spiral Notebooks/71hKp4rTl5L._AC_SL1500_.jpg",
      ],
    },
    {
      name: "Mead Composition Notebooks",
      price: "$6.99",
      files: [
        "/products/notebooks/Mead Composition Notebooks/81bmdcVh7aS._AC_SL1500_.jpg",
        "/products/notebooks/Mead Composition Notebooks/81lTo36RdPL._AC_SL1500_.jpg",
        "/products/notebooks/Mead Composition Notebooks/6116qiJH14S._AC_SL1500_.jpg",
      ],
    },
  ];

  // Toggle a specific notebook's dropdown
  const toggleOption = (index, e) => {
    e.stopPropagation(); // Prevent container's onClick from firing
    setToggledIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    // This function runs any time there's a click on the entire document
    const handleClickOutside = (e) => {
      // If our container is rendered AND the click was NOT inside it
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        // Close any open dropdown
        setToggledIndex(null);
      }
    };

    // Listen for mousedown on the entire document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: remove listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2>Notebooks</h2>
      {/* Clicking in this container (except the ellipsis) closes any open dropdown */}
      <div
        className="productsForSale"
        ref={containerRef}
        onClick={() => setToggledIndex(null)}
      >
        {notebooks.map((item, index) => (
          <div
            className="product"
            key={index}
            onClick={() => setProductSelected(item)}
          >
            <div className="product-name">
              {item}
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="ellipsisV"
                onClick={(e) => toggleOption(index, e)}
              />
            </div>
            <div className="product-price">
              {notebook
                .filter((notebook_item) => notebook_item.name === item)
                .map((price) => price.price)}
            </div>
            {/* If toggledIndex matches, show the dropdown. Otherwise, hide it. */}
            {toggledIndex === index && (
              <div
                className="product-options"
                // (Optional) Stop propagation to keep open if user clicks inside
                // onClick={(e) => e.stopPropagation()}
              >
                {/* Dropdown content here */}
                <ul>
                  <li>Option A</li>
                  <li>Option B</li>
                </ul>
              </div>
            )}
            <div className="product-gallery">
              {notebook
                .filter((notebook_item) => notebook_item.name === item)
                .map((img, imgIndex) => (
                  <img
                    className="product-image"
                    key={imgIndex}
                    src={img.files[1]}
                    alt="Notebook"
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="product-expand">
        {notebook
          .filter((nb) => nb.name === productSelected)
          .map((value) => (
            <>
              <div>
                <div className="large-photo">
                  <FontAwesomeIcon
                    className="arrow-left"
                    icon={faArrowAltCircleLeft}
                    onClick={() =>
                      setImagePathIndex((prev) =>
                        prev > 0 ? prev - 1 : value.files.length - 1
                      )
                    }
                  />
                  <img
                    className="product-photos"
                    src={value.files[imagePathIndex]}
                    alt="product_image"
                  />
                  <FontAwesomeIcon
                    className="arrow-right"
                    icon={faArrowAltCircleRight}
                    onClick={() =>
                      setImagePathIndex((prev) =>
                        prev < value.files.length - 1 ? prev + 1 : 0
                      )
                    }
                  />
                </div>
                <div>
                  {value.files.map((file) => (
                    <img
                      className="product-photo-array"
                      src={file}
                      alt="product"
                    />
                  ))}
                </div>
              </div>
              <div className="product-info">
                <h2>{value.name}</h2>
                <h2>{value.price}</h2>
                <button>Buy It Now</button>
                <button>Add to cart</button>
                <button>See all details</button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Notebooks;
