import React from "react";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import useUser from "../../../auth/useUser";
import { useState, useEffect } from "react";
//
import { ImLocation2, ImHeadphones } from "react-icons/im";
import { SlCalender } from "react-icons/sl";
import NavigationPageForViewer from "./NavigationPageForViewer";
import axios from "axios";
import MyModal6 from "../modals/ModalForEachUser";
import KhaltiCheckout from "khalti-checkout-web";
import { Config } from "../Khalti/khaltiConfig.js";
import { useNavigate } from "react-router-dom";

export default function FindShows() {
  const user = useUser();
  const email = user.email;

  const navigate = useNavigate();

  //initialize khalti
  let checkout = new KhaltiCheckout(Config);
  //
  const [getEvent, setGetEvent] = useState([]);
  const getAllEvents = async () => {
    const EventData = await axios.get("https://nepal-groove-backend-hrxj.vercel.app/api/allevents");
    const data = EventData.data.allevent;
    setGetEvent(data);
    console.log(setGetEvent);
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  const [showeventdetails, setShowEventDetials] = useState(false);
  const [storeevent, setStoreEvent] = useState([]);
  const clicksingle = async (id) => {
    const singleevent = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/singleevent/${id}`
    );
    const data = singleevent.data.allevent;
    setStoreEvent(data);
    setShowEventDetials(true);
  };
  //for correct date format
  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  //for single data
  var startDateTime = new Date(storeevent.eventdate);
  const newStartDate1 = startDateTime.toLocaleDateString("en-US", dateOptions);
  return (
    <div className="text-center bg-[#010101]">
      <NavigationPageForViewer />
      <div className="flex gap-[200px]  ">
        <div className=" p-5 border-r-2 border-b-1 border-w-[20px] border-gray-300 bg-[#adadb12a] pb-[249px]">
          <h1 className="text-white">FILTER BY</h1> <br />
          <hr className="w-[100px] " />
          <h2 className="mt-5 text-white">Genre +</h2>
          <br />
          <h2 className="text-white">Band Type +</h2>
          <br />
          <button className="border-2 border-transparent bg-orange-600 w-full rounded-2xl drop-shadow-2xl">
            Apply
          </button>
          <br />
          <br />
          <button className="border-2 border-transparent bg-orange-600 w-full rounded-2xl drop-shadow-2xl">
            Reset
          </button>
        </div>
        <div>
          {/* getall artist registered */}
          <div className="pb-10">
            {/* mapping  */}
            {getEvent.map((event, i) => {
              return (
                <div
                  key={i}
                  className=" flex gap-20 justify-between px-8 py-4 mt-[80px] bg-[#adadb167] rounded-lg"
                >
                  <div onClick={() => clicksingle(event._id)}>
                    <img
                      className="w-[20vh] h-[20vh] rounded-lg"
                      alt="naruto"
                      src={`https://gold-fair-firefly.cyclic.app/${event.EventPic}`}
                    />
                  </div>

                  <div>
                    <h1 className="font-bold text-[18px] text-white">
                      {event.eventName}
                    </h1>
                    <h1 className="text-[15px] font-medium flex gap-2  text-white ">
                      <SlCalender className="mt-1" />
                      {event.eventdate}
                    </h1>
                    <h1 className="flex justify-center gap-2 text-white ">
                      {event.ArtistName}
                    </h1>
                    <h1 className="flex justify-center gap-1 text-white">
                      <ImHeadphones className="mt-1 text-white" />{" "}
                      {event.TypeofEvent}
                    </h1>
                    <h1 className=" flex  justify-center gap-1 text-[18] text-white">
                      <ImLocation2 className="mt-1 text-white" />
                      {event.eventaddress}
                    </h1>
                  </div>

                  <div className="">
                    <button
                      onClick={() => navigate(`/ticket/${event._id}`)}
                      className=" relative top-10 border-2 px-2 rounded-lg bg-orange-600 hover:border-white border-black hover:text-black text-white"
                    >
                      Buy Tickets Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-between  pt-3 pb-3 bg-[#E3EDEE] ">
        <div className=" ml-4 flex gap-6">
          <p className="text-[12px] flex gap-1 font-semibold cursor-pointer hover:text-[#A75D5D]">
            About Us
            <FcAbout className="mt-0.5 text-lg" />
          </p>
          <p className="text-[12px] flex gap-1 font-semibold cursor-pointer hover:text-[#A75D5D]">
            Contact
            <FcBusinessContact className="mt-0.5 text-lg " />
          </p>
        </div>
        <div className="mr-5 flex gap-6">
          <p className="text-[12px] flex gap-1 font-semibold cursor-pointer hover:text-[#A75D5D]">
            <SiTwitter className="mt-0.5 text-lg" />
            Twitter
          </p>
          <p className="text-[12px] flex gap-1 font-semibold cursor-pointer hover:text-[#A75D5D]">
            <SiFacebook className="mt-0.5 text-lg" />
            Facebook
          </p>
        </div>
      </div>
      <MyModal6
        isvisible={showeventdetails}
        onClose={() => setShowEventDetials(false)}
      >
        <div>
          <div className=" flex justify-around gap-[25px] text-center rounded-lg">
            <div>
              <img
                className="w-auto h-[55vh]  rounded-lg"
                alt="naruto"
                src={`https://gold-fair-firefly.cyclic.app/${storeevent.EventPic}`}
              />
              <h1 className=" text-[15px]   flex justify-center gap-1 text-black ">
                <p className="text-[18px] mt-[-3px] font-medium">Address:</p>
                {storeevent.eventaddress}
              </h1>
            </div>
            <div className="mt-[20px]">
              <h1 className="text-center font-bold text-[28px] text-black">
                {storeevent.eventName}
              </h1>
              <h1 className="text-[15px] justify-center flex gap-1 text-black ">
                <p className="text-[16px] mt-[-3px] font-medium ">GigDate:</p>
                {newStartDate1}
              </h1>
              <h1 className="text-[15px] justify-center  flex gap-1 text-black ">
                <p className="text-[16px] mt-[-3px] font-medium">Time:</p>
                {storeevent.startingtime}-{storeevent.endingtime}
              </h1>
              <h1 className="text-[15px] justify-center  flex gap-1 text-black ">
                <p className="text-[16px] mt-[-3px] font-medium">Genre:</p>
                {storeevent.TypeofEvent}
              </h1>

              <h1 className="font-medium justify-center  flex gap-1 text-orange-600">
                {storeevent.ArtistName}
              </h1>
              <hr className="border-2"></hr>
              <h1 className=" text-[15px]  text-black">
                <p className="text-[20px]  font-medium">Description</p>
                {storeevent.description}
              </h1>
              <h1 className=" text-[15px]   text-green-700">
                <p className="text-[20px]  font-medium text-green-700">
                  Ticket Price
                </p>
                {storeevent.ticketprice}
              </h1>
            </div>
          </div>
        </div>
      </MyModal6>
    </div>
  );
}
