import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const Scissors = () => {
  const notebooks = ["notebook1", "notebook2", "notebook3", "notebook4"];
  const [toggledIndex, setToggledIndex] = useState(null);
  const containerRef = useRef();

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
      <h2>Scissors</h2>
      {/* Clicking in this container (except the ellipsis) closes any open dropdown */}
      <div
        className="productsForSale"
        ref={containerRef}
        onClick={() => setToggledIndex(null)}
      >
        {notebooks.map((item, index) => (
          <div className="product" key={index}>
            <div className="product-name">
              {item}
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="ellipsisV"
                onClick={(e) => toggleOption(index, e)}
              />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scissors;
