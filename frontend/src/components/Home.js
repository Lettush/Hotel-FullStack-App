import React from "react";
import { RiHotelFill } from "react-icons/ri";
import { TbHotelService } from "react-icons/tb";
import { MdOutlineHotelClass } from "react-icons/md";

import "./styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="hero"></div>
      <div className="content-group">
        <div>
          <RiHotelFill size="5em" />
          <h3>Beautiful Rooms</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            nisi?
          </p>
        </div>
        <div>
          <TbHotelService size="5em" />
          <h3>Amazing Service</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            nisi?
          </p>
        </div>
        <div>
          <MdOutlineHotelClass size="5em" />
          <h3>Best Reviews</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            nisi?
          </p>
        </div>
      </div>
      <div className="recentRooms">
        
      </div>
    </div>
  );
};

export default Home;
