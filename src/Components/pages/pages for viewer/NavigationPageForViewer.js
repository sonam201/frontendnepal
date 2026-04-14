import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import { SlCalender } from "react-icons/sl";
import { AiFillSetting } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useUser from "../../../auth/useUser";

export default function NavigationPageForViewer() {
  const user = useUser();
  const email = user.email;

  const role = user.role;
  console.log(user);
  //getting user ID
  const [userId, setUser] = useState(user.id);
  //state for notification

  /// testing
  //for profile image
  const [getInfoViewer, setGetInfoViewer] = useState();
  const Viewerinformation = async () => {
    try {
      const ViewerInfo = await axios.get(
        `https://nepal-groove-backend-hrxj.vercel.app/api/profilebeforeedit/${email}`
      );

      // console.log(ArtistInfo);
      const data = ViewerInfo.data.getprofileinfo;

      setGetInfoViewer(data);
      // console.log(getInfoArtist);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    Viewerinformation();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );
  return (
    <div className="text-center bg-[#010101]">
      <div className=" flex justify-between bg-[#adadb167]   drop-shadow-xl">
        <div>
          <Link to="/">
            <img
              className="h-[14vh] w-[14vh] relative left-6  pointer-cursor "
              alt="logo "
              src={require("../../../Images/gig.png")}
            />
          </Link>
        </div>
        <div className="flex mt-[28px]">
          <Link to="/dashboardforviewer">
            <button className=" w-[90px] h-[35px] border-transparent mt-[-5px] rounded-2xl  border-2 hover:border-[#A7727D] font-bold text-[15px]  items-center text-center text-white mr-[40px] ">
              DashBoard
            </button>
          </Link>
          <Link to="/findshows">
            <button className=" w-[150px] h-[35px] pt-1 mt-[-5px]  border-transparent rounded-2xl  font-bold text-[15px] hover:border-[#A7727D] border-2 text-center text-white mr-[40px] ">
              Find Shows
            </button>
          </Link>
          {/* gig */}
          <Link to="/viewartist">
            <button className=" w-[150px] h-[35px] pt-1 mt-[-5px]  border-transparent rounded-2xl  font-bold text-[15px] hover:border-[#A7727D] border-2 text-center text-white mr-[40px] ">
              View Artists
            </button>
          </Link>
          {/*  */}
        </div>

        <div className="flex text-center text-white gap-6 items-center">
          <div style={{ position: "relative" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={`https://gold-fair-firefly.cyclic.app/${getInfoViewer?.profile_image}`}
                alt="profile"
                className="w-[7vh] h-[7vh] rounded-[25px]  mr-5 "
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
