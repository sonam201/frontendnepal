import React from "react";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import useUser from "../../../auth/useUser";
import { useState, useEffect } from "react";
import NavigationPageForArtist from "./NavigationPageForArtist";
//toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImLocation2, ImHeadphones } from "react-icons/im";
import { BiTimeFive } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import MyModal5 from "../modals/ModalForEachInformation";
import MyModal8 from "../modals/ModalForApplyGig";

export default function ApplyForGig() {
  const user = useUser();
  const email = user.email;
  //state to get gig id
  const [gigId, setGidId] = useState("");
  //state to get user id
  const [userId, setUser] = useState(user.id);
  const [createdBy, setCreatedBy] = useState("");
  const onApply = (gig) => {
    setGidId(gig._id);
    setCreatedBy(gig.createdBy);
    console.log(createdBy, "samaya");
    setShowModal(true);
  };

  //funtion for apply
  const applynow = async (gig) => {
    const applyresponse = await axios.post(
      "https://nepal-groove-backend-hrxj.vercel.app/api/applygig",
      {
        appliedGig: gigId,
        appliedBy: userId,
        createdBy: createdBy,
      }
    );
    console.log(applyresponse, "sai cha ta");
    setShowModal(false);
    //
    toast.success("Gig Applied Sucessfully", {
      position: "bottom-right",
      theme: "dark",
      autoClose: 5000,
    });
  };

  const [getGig, setGetGig] = useState([]);
  const getAllGig = async () => {
    const GigData = await axios.get(
      "https://gold-fair-firefly.cyclic.app/api/allgigs"
    );
    const data = GigData.data.gig;
    setGetGig(data);
    console.log(setGetGig);
  };
  useEffect(() => {
    getAllGig();
  }, []);
  //for single gig
  const [singleGig, setSingleGig] = useState([]);
  const handleClic = async (id) => {
    const singlegigdat = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/gigs/${id}`
    );
    const data = singlegigdat.data.gig;
    setSingleGig(data);
    setShowDetials(true);
  };

  //

  //usestate for each model
  const [showDetails, setShowDetials] = useState(false);

  //for date
  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  //for single data
  var startDateTime = new Date(singleGig.gigdate);
  const newStartDate1 = startDateTime.toLocaleDateString("en-US", dateOptions);

  //for apply gig modal
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="text-center bg-[#010101]">
      <NavigationPageForArtist />
      {/* sidebar for dashboard */}
      {/* contents */}
      <div className="flex gap-[180px]  ">
        <div className=" p-5 border-r-2 border-b-1 border-w-[20px] border-gray-300 bg-[#adadb12a] pb-[222px] ">
          <h1 className="text-white">FILTER BY</h1> <br />
          <hr className="w-[100px] " />
          <h2 className="mt-5 text-white">Genre +</h2>
          <br />
          <h2 className="text-white">Band Type +</h2>
          <br />
          <button className="border-2 border-transparent bg-orange-600 w-full rounded-2xl ">
            Apply
          </button>
          <br />
          <br />
          <button className="border-2 border-transparent bg-orange-600 w-full rounded-2xl ">
            Reset
          </button>
        </div>
        <div>
          {/* getall artist registered */}
          <div className="pb-10 cursor-pointer">
            {/* mapping  */}
            {getGig.map((gig, i) => {
              console.log(gig, "sai ho");
              //for date conversion
              var startDateTime = new Date(gig.gigdate);
              const newStartDate = startDateTime.toLocaleDateString(
                "en-US",
                dateOptions
              );
              return (
                <>
                  {!gig.isapplied && (
                    <div
                      key={i}
                      className=" flex gap-20 justify-between px-8 py-4 mt-[30px] bg-[#adadb167] rounded-lg"
                    >
                      <div
                        onClick={() => handleClic(gig._id)}
                        className="flex gap-20"
                      >
                        <div>
                          <img
                            className="w-[25vh] h-[25vh] rounded-lg"
                            alt="naruto"
                            src={`https://gold-fair-firefly.cyclic.app/${gig.gigProfile}`}
                          />
                        </div>

                        <div>
                          <h1 className="font-bold text-[18px] text-white">
                            {gig.gigName}
                          </h1>
                          <h1 className="text-[15px] font-medium flex gap-2  text-white ">
                            <SlCalender className="mt-1" />
                            {newStartDate}
                          </h1>
                          <h1 className="flex justify-center gap-2 text-white ">
                            <BiTimeFive className="mt-1 text-white" />
                            {gig.starttime}-{gig.endtime}
                          </h1>
                          <h1 className="flex justify-center gap-1 text-white">
                            <ImHeadphones className="mt-1 text-white" />{" "}
                            {gig.genreNeeded}
                          </h1>
                          <h1 className=" flex  justify-center gap-1 text-[18] text-white">
                            <ImLocation2 className="mt-1 text-white" />
                            {gig.address}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => onApply(gig)}
                          className=" mt-[40px] border-2 px-2 rounded-lg bg-orange-600 hover:border-white border-black hover:text-black text-white"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  )}
                </>
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
      <MyModal5 isvisible={showDetails} onClose={() => setShowDetials(false)}>
        <div>
          <div className=" flex justify-around gap-[20px] text-center rounded-lg">
            <div>
              <img
                className="w-auto h-[55vh]  rounded-lg"
                alt="naruto"
                src={`https://gold-fair-firefly.cyclic.app/${singleGig.gigProfile}`}
              />
            </div>
            <div className="mt-[20px]">
              <h1 className="text-center font-bold text-[28px] text-black">
                {singleGig.gigName}
              </h1>
              <h1 className="text-[15px] justify-center flex gap-1 text-black ">
                <p className="text-[18px] mt-[-3px] font-medium ">GigDate:</p>
                {newStartDate1}
              </h1>
              <h1 className="text-[15px] justify-center  flex gap-1 text-black ">
                <p className="text-[18px] mt-[-3px] font-medium">Time:</p>
                {singleGig.starttime}-{singleGig.endtime}
              </h1>
              <h1 className="text-[15px] justify-center  flex gap-1 text-black ">
                <p className="text-[18px] mt-[-3px] font-medium">Genre:</p>
                {singleGig.genreNeeded}
              </h1>
              <h1 className=" text-[15px] justify-center  flex gap-1 text-black ">
                <p className="text-[18px] mt-[-3px] font-medium">Address:</p>
                {singleGig.address}
              </h1>
              <hr className="border-2"></hr>
              <h1 className=" text-[15px]  text-black">
                <p className="text-[20px]  font-medium">Description</p>
                {singleGig.description}
              </h1>
            </div>
          </div>
        </div>
      </MyModal5>
      {/*  */}
      <MyModal8 isvisible={showModal} onClose={() => setShowModal(false)}>
        <h1 className="font-bold text-orange-700">Are You sure to Apply?</h1>
        <div className=" mt-5 ">
          <button
            onClick={applynow}
            className=" border-2 px-2 rounded-lg bg-green-600 hover:border-white border-black hover:text-black text-white"
          >
            Yes
          </button>
        </div>
      </MyModal8>
    </div>
  );
}
