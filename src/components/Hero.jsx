import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";

const Hero = () => {
  const sliderRef = useRef(null);
  const [direction, setDirection] = useState("");
  const [sliderItems, setSliderItems] = useState([
    {
      src: "https://images.unsplash.com/photo-1715987587174-b8be6a743337?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "MAGIC SLIDER",
      type: "FLOWER",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.",
    },
    {
      src: "https://images.unsplash.com/photo-1597839219216-a773cb2473e4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "MAGIC SLIDER",
      type: "NATURE",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.",
    },
    {
      src: "https://images.unsplash.com/photo-1613385119733-de72e1bb1c89?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "MAGIC SLIDER",
      type: "PLANT",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.",
    },
    {
      src: "https://images.unsplash.com/photo-1610872827842-bd0c8c461a6f?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "MAGIC SLIDER",
      type: "JOURNAL",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.",
    },
  ]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleAnimationEnd = () => {
      if (direction === "next") {
        setSliderItems((prevItems) => {
          const [first, ...rest] = prevItems;
          return [...rest, first];
        });
      } else if (direction === "prev") {
        setSliderItems((prevItems) => {
          const last = prevItems[prevItems.length - 1];
          return [last, ...prevItems.slice(0, prevItems.length - 1)];
        });
      }
      slider.classList.remove("next", "prev");
      setDirection("");
    };

    slider.addEventListener("animationend", handleAnimationEnd);

    return () => {
      slider.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [direction]);

  const moveSlider = (direction) => {
    setDirection(direction);
    const slider = sliderRef.current;
    if (slider) {
      slider.classList.add(direction);
    }
  };

  return (
    <div>
      <div
        className="slider h-screen  w-[100%] overflow-hidden relative"
        ref={sliderRef}
      >
        <div className="list">
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className="item w-full h-full absolute inset-0 z-[1] "
            >
              <img
                className="w-full h-full object-cover"
                src={item.src}
                alt=""
              />
              <div className="content absolute top-20 md:top-32 w-[1140px] max-w-[80%] left-1/2 transform -translate-x-1/2 pr-[30%] box-border text-white text-shadow-[0_5px_10px_#0004]">
                <div className="title text-[5em] font-bold leading-[1.3em]">
                  {item.title}
                </div>
                <div className="type text-[5em] font-bold leading-[1.3em] text-[#14ff72cb]">
                  {item.type}
                </div>
                <div className="description">{item.description}</div>
                <div className="button grid grid-cols-[repeat(2,130px)] grid-rows-[40px] gap-[5px] mt-[20px]">
                  <button className="border-none bg-[#eee] text-black font-medium cursor-pointer transition duration-400 tracking-wider hover:tracking-[3px]">
                    SEE MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail absolute bottom-[30px] left-1/2 w-max z-[100] flex gap-[20px]">
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className="item w-[150px] md:h-[220px] h-[148px] flex-shrink-0 relative"
            >
              <img
                className="w-full h-full object-cover rounded-[20px] shadow-[5px_0_15px_rgba(0,0,0,0.3)]"
                src={item.src}
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="nextPrevArrows absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
          <button
            className="prev w-[40px] h-[40px] rounded-full bg-[#14ff72cb] border-none text-white font-mono font-bold transition duration-[500ms] cursor-pointer hover:bg-white hover:text-black"
            onClick={() => moveSlider("prev")}
          >
            &lt;
          </button>
          <button
            className="next w-[40px] h-[40px] rounded-full bg-[#14ff72cb] border-none text-white font-mono font-bold transition duration-[500ms] cursor-pointer hover:bg-white hover:text-black"
            onClick={() => moveSlider("next")}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
