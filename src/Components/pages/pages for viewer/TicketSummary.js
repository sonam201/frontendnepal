import React from "react";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import useUser from "../../../auth/useUser";
import { useState, useEffect } from "react";
//
import NavigationPageForViewer from "./NavigationPageForViewer";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { Config } from "../Khalti/khaltiConfig.js";
import { useNavigate, useParams } from "react-router-dom";

export default function TicketSummary() {
  const user = useUser();
  const email = user.email;

  console.log("haujrr ama", user);

  const { id: eventId } = useParams();
  //initialize khalti
  let checkout = new KhaltiCheckout(Config);
  //

  const [storeevent, setStoreEvent] = useState("");
  const clicksingle = async () => {
    const singleevent = await axios.get(
      `https://nepal-groove-backend-hrxj.vercel.app/api/singleevent/${eventId}`
    );
    const data = singleevent.data.allevent;

    setStoreEvent(data);
  };
  useEffect(() => {
    clicksingle();
  }, []);

  //for the user's name
  const [getInfoArtist, setGetInfoArtist] = useState();
  const Artistinformation = async () => {
    try {
      const ArtistInfo = await axios.get(
        `https://gold-fair-firefly.cyclic.app/api/profilebeforeedit/${email}`
      );

      console.log("info", ArtistInfo);
      const data = ArtistInfo.data.getprofileinfo;
      // console.log(data);
      setGetInfoArtist(data);
      // console.log(getInfoArtist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Artistinformation();
  }, []);
  console.log("hlo", storeevent);
  return (
    <div className="text-center bg-[#010101]">
      <NavigationPageForViewer />
      <div className="flex justify-around pb-[101px]">
        <div className="flex gap-5 mt-5 mx-5">
          <div>
            <img
              className="w-auto h-[55vh] rounded-lg"
              alt="naruto"
              src={`https://gold-fair-firefly.cyclic.app/${storeevent.EventPic}`}
            />
            <h1 className="font-medium  text-center text-orange-600">
              {storeevent.ArtistName}
            </h1>
          </div>
          <div className="pt-[100px]">
            <h1 className="text-start font-bold text-[28px] text-white">
              {storeevent.eventName}
            </h1>
            <p className="text-[20px] text-white  font-medium ">
              {storeevent.description}
            </p>
          </div>
        </div>
        <div>
          <div className="bg-white mt-10 px-[80px] py-5">
            <h1 className="font-bold text-center text-[25px]">
              Ticket Summary
            </h1>
            <div className="flex">
              <h1 className="font-bold text-orange-600  text-start text-[15px]">
                Ticket Buyer's Name:
              </h1>
              <p className="font-semibold">
                {getInfoArtist?.firstname}_{getInfoArtist?.lastname}
              </p>
            </div>
            <div className="flex">
              <h1 className="font-bold text-orange-600  text-start text-[15px]">
                Number of Tickets:
              </h1>
              <p className="font-semibold">1</p>
            </div>
            <h1 className="font-bold text-center text-[25px]">Total Payment</h1>
            <div className="flex">
              <h1 className="font-bold text-orange-600  text-start text-[15px]">
                Total Amount:
              </h1>
              <p className="font-semibold">{storeevent.ticketprice}</p>
            </div>
            <button
              className=" relative top-10 border-2 px-2 rounded-lg bg-purple-900 hover:border-white border-black hover:text-black text-white"
              onClick={() => checkout.show({ amount: 1000 })}
            >
              Pay Via Khalti
            </button>
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
    </div>
  );
}
