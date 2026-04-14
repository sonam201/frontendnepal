import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import MyModal3 from "../modals/ModalForArtist";
import useUser from "../../../auth/useUser";
//
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NavigationPageForArtist() {
  const user = useUser();
  const email = user.email;

  //stae for modal
  const [visibleModal, setVisibleModal] = useState(false);

  const role = user.role;
  // console.log(user);
  //for collpsable setting

  //state for notification
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notiArray, setNotiArray] = useState([]);
  const getmybooking = async (user) => {
    const MyBooking = await axios.get(
      `https://nepal-groove-backend-hrxj.vercel.app/api/mybooking/${user.id}?role=${user.role}`
    );

    setNotifications(MyBooking.data);
    const data = MyBooking.data;
    console.log(notiArray, "ghar jwai ho");
    setNotiArray(data);

    setNotificationCount(MyBooking.data.length || 0);
  };
  useEffect(() => {
    getmybooking(user);
  }, []);

  //tedting
  const [getInfoArtist, setGetInfoArtist] = useState();
  const Artistinformation = async () => {
    try {
      const ArtistInfo = await axios.get(
        `https://gold-fair-firefly.cyclic.app/api/profilebeforeedit/${email}`
      );

      // console.log(ArtistInfo);
      const data = ArtistInfo.data.getprofileinfo;

      setGetInfoArtist(data);
      // console.log(getInfoArtist);
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(Artistinformation, "dai cha");
  useEffect(() => {
    Artistinformation();
  }, []);

  //for changin the status
  const acceptHandler = async (id, bookedTo) => {
    const response = await axios.put(
      `https://gold-fair-firefly.cyclic.app/api/booking/${id}`,
      {
        status: "accepted",
        bookedTo: bookedTo,
      }
    );
    setVisibleModal(false);
    toast.success("Booking Accpeted", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };
  const deleteHandler = async (id) => {
    const respond = await axios.put(
      `https://gold-fair-firefly.cyclic.app/api/booking/${id}`,
      {
        status: "declined",
      }
    );
    setVisibleModal(false);
    toast.error("Booking Declined", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );
  const NaviNotification = (
    <Menu>
      {notiArray.map((array, i) => {
        console.log(array.status, "sai cha ta");
        if (array.status === "accepted" || array.status === "declined") {
          return <p>no notifications</p>;
        } else {
          return (
            <div key={i}>
              <Menu.Item
                key="1"
                className=" border-2 border-black rounded-2xl"
                onClick={() => showBooker(array._id)}
              >
                {array.bookedBy.firstname} is trying to book you
              </Menu.Item>
            </div>
          );
        }
      })}
    </Menu>
  );
  //for date
  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  //
  const [bookerID, setBookerID] = useState();

  const showBooker = (id) => {
    setVisibleModal(true);
    setBookerID(id);
  };
  return (
    <div className="text-center bg-[#010101] sticky top-0">
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
          <Link to="/dashboardforartist">
            <button className=" w-[90px] h-[35px] border-transparent mt-[-5px] rounded-2xl  border-2 hover:border-[#A7727D] font-bold text-[15px]  items-center text-center text-white mr-[40px] ">
              DashBoard
            </button>
          </Link>
          {/* gig */}
          <Link to="/applyforgig">
            <button className=" w-[150px] h-[35px] pt-1 mt-[-5px]  border-transparent rounded-2xl  font-bold text-[15px] hover:border-[#A7727D] border-2 text-center text-white mr-[40px] ">
              Apply For Gig
            </button>
          </Link>
          {/*  */}
        </div>

        <div className="flex text-center text-white gap-6 items-center">
          <div>
            <Dropdown overlay={NaviNotification} trigger={["click"]}>
              <MdNotificationsActive className="text-[25px] mt-5 hover:text-[#7F669D]" />
            </Dropdown>
            <span>{notificationCount} </span>
          </div>

          <div style={{ position: "relative" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={`https://gold-fair-firefly.cyclic.app/${getInfoArtist?.profile_image}`}
                alt="profile"
                className="w-[7vh] h-[7vh] rounded-[25px]  mr-5 "
              />
            </Dropdown>
          </div>
        </div>
      </div>
      {/* sidebar for dashboard */}
      <MyModal3
        data
        isvisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        className="pt-[200px]"
      >
        {/* contents here */}
        {notiArray.map((array, i) => {
          if (array._id === bookerID) {
            //for converting the date in suitable format
            var startDateTime = new Date(array.date);
            const newStartDate = startDateTime.toLocaleDateString(
              "en-US",
              dateOptions
            );

            return (
              <div key={i}>
                <div>
                  <div>
                    <h1 className="font-bold text-[25px] text-transform: uppercase animate-bounce">
                      {array.gigname}
                    </h1>
                    <div className="flex justify-between mt-5">
                      <h1 className="font-bold text-[15px] ">
                        <p className="text-red-900 text-[20px] ">Genre</p>
                        {array.gigtype}
                      </h1>
                      <h1 className="font-bold text-[15px]">
                        <p className="text-red-900 text-[20px] ">Date</p>
                        {newStartDate}
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <h1 className="font-bold text-[15px] ">
                      <p className="text-red-900 text-[20px] ">payment Type</p>
                      {array.showtype}
                    </h1>
                    <h1 className="font-bold text-[15px]">
                      <p className="text-red-900 text-[20px] ">Address</p>
                      {array.Address}
                    </h1>
                  </div>
                  <div className="flex justify-between mt-2">
                    <h1 className="font-bold text-[15px] ">
                      <p className="text-red-900 text-[20px] ">Start Time</p>
                      {array.startingtime}
                    </h1>
                    <h1 className="font-bold text-[15px]">
                      <p className="text-red-900 text-[20px] ">End Time</p>
                      {array.endingtime}
                    </h1>
                  </div>
                  <div className="flex justify-center">
                    <h1 className="font-bold text-[15px]">
                      <p className="text-red-900 text-[20px] ">Budget</p>
                      {array.budget}
                    </h1>
                  </div>
                  {/* {status === "pending" && ( */}
                  <div className="flex justify-center gap-[20%] mt-5">
                    <button
                      className="bg-blue-600 px-6 py-2 rounded-xl text-white hover:bg-orange-400"
                      onClick={() => acceptHandler(array._id, array.bookedTo)}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deleteHandler(array._id)}
                      className="bg-green-600 px-6 py-2 rounded-xl text-white hover:bg-purple-500"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </MyModal3>
    </div>
  );
}
