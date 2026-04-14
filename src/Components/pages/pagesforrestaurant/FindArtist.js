import React from "react";

import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive, MdLocationOn } from "react-icons/md";
import { FaHeadphonesAlt } from "react-icons/fa";
//
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import useUser from "../../../auth/useUser";
import axios from "axios";

import MyModal2 from "../modals/ModalContent";
//useform hook for gig-drpdown
import { useForm } from "react-hook-form";
import NavbarForRestaurant from "./NavbarForRestaurant";
import MyModal6 from "../modals/ModalForEachUser";
//

export default function FindArtist() {
  const user = useUser();
  const email = user.email;
  // const id = user._id;
  const [userId, setUser] = useState(user.id);
  const [artistId, setArtistId] = useState("");
  //validation for checking the fields in gig-creation

  //for booking hte artist
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  //
  const onBookClicked = (artist) => {
    setArtistId(artist._id);
    setShowBookModal(true);
  };
  //to create gig

  const [showBookModal, setShowBookModal] = useState(false);

  //function to post the booking details
  const Booking = async ({
    gigname,
    gigtype,
    date,
    showtype,
    startingtime,
    endingtime,
    Address,
    budget,
  }) => {
    const response = await axios.post(
      "https://nepal-groove-backend-hrxj.vercel.app/api/booking",
      {
        gigname: gigname,
        gigtype: gigtype,
        date: date,
        showtype: showtype,
        startingtime: startingtime,
        endingtime: endingtime,
        Address: Address,
        budget: budget,
        bookedBy: userId,
        bookedTo: artistId,
      }
    );
    console.log(response, "k ayo ta ");
    setShowBookModal(false);
    toast.success("Booking Request Sent", {
      position: "bottom-right",
      theme: "dark",
      autoClose: 5000,
    });
  };

  //to get the list of artist from get method
  const [getArtist, setGetArtist] = useState([]);
  //for search
  const [searchQuery, setSearcQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const handleSelectChange = (event) => {
    setSortValue(event.target.value);
  };
  //

  //
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const productsData = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/searchuser?sort=${sortValue}`
    );

    const data = await productsData.data.artistuser;
    setProducts(data);
    setGetArtist(data);
    console.log("getProducts", data);
  };
  useEffect(() => {
    getProducts();
  }, [sortValue]);

  const getAllArtist = async () => {
    const ArtistData = await axios.get(
      "https://gold-fair-firefly.cyclic.app/api/searchuser",
      {
        params: {
          firstname: searchQuery,
        },
      }
    );
    const data = ArtistData.data.artistuser;

    setGetArtist(data);
  };
  useEffect(() => {
    getAllArtist();
  }, []);
  //for sort

  //for single user
  const [showArtist, setShowArtist] = useState([]);
  const getSingleArtist = async (email) => {
    const singleArtist = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/singleuser/${email}`
    );
    const data = singleArtist.data.artist;
    setShowArtist(data);
    setArtistDetials(true);
  };
  const [artistdetails, setArtistDetials] = useState(false);

  //state for filter
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  return (
    <div className="text-center bg-[#010101] ">
      <NavbarForRestaurant />
      <div className="flex gap-[10%]">
        <div className=" p-5 border-r-2 bg-[#adadb12a]  border-gray-300 pb-[220px] ">
          <h1 className="text-white">FILTER BY</h1>
          <br />
          <hr className="w-[100px] " />
          <div>
            <h2
              onClick={() => setShow(!show)}
              className="mt-5 text-white  flex justify-center gap-[4px]  "
            >
              Genre
              <p className="text-white text-bold ">{show ? "-" : "+"}</p>
            </h2>

            {show && (
              <>
                <div>
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      id="Classical"
                      name="Classical"
                      value="Classical"
                      // checked={genreFilters.includes("Classical")}
                      // onChange={handleGenreFilterChange}
                    />
                    <label for="classical" className="text-white">
                      Classcial
                    </label>
                  </div>
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      id="Lok Dohori"
                      name="Lok Dohori"
                      value="Lok Dohori"
                      // checked={genreFilters.includes("Lok Dohori")}
                      // onChange={handleGenreFilterChange}
                    />
                    <label for="Lok Dohori" className="text-white">
                      Lok Dohori
                    </label>
                  </div>
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      id="Pop"
                      name="Pop"
                      value="Pop"
                      // checked={genreFilters.includes("Pop")}
                      // onChange={handleGenreFilterChange}
                    />
                    <label for="Pop" className="text-white">
                      Pop
                    </label>
                  </div>

                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      id="Rock"
                      name="Rock"
                      value="Rock"
                      // checked={genreFilters.includes("Rock")}
                      // onChange={handleGenreFilterChange}
                    />
                    <label for="Rock" className="text-white">
                      Rock
                    </label>
                  </div>
                  <div className="flex justify-start">
                    <input
                      type="checkbox"
                      id="HipHop"
                      name="HipHop"
                      value="HipHop"
                      // checked={genreFilters.includes("Hip Hop")}
                      // onChange={handleGenreFilterChange}
                    />
                    <label for="HipHop" className="text-white">
                      HipHop
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          <br />
          <div>
            <h2
              onClick={() => setView(!view)}
              className="text-white flex gap-[3px] cursor-pointer"
            >
              Band Type
              <p className="text-white text-bold ">{view ? "-" : "+"}</p>
            </h2>
            {view && (
              <>
                <div>
                  <div className="flex justify-start">
                    <input type="checkbox" id="Band" name="Band" value="Band" />
                    <label for="Band" className="text-white">
                      Band
                    </label>
                  </div>
                  <div className="flex justify-start">
                    <input type="checkbox" id="Solo" name="Solo" value="Solo" />
                    <label for="Solo" className="text-white">
                      Solo
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          <br />
          <button
            onClick={getAllArtist}
            className="border-2 border-transparent bg-orange-600 w-full rounded-2xl text-white drop-shadow-2xl"
          >
            Apply
          </button>
          <br />
          <br />
          <button className="border-2 border-transparent bg-orange-600 w-full text-white rounded-2xl drop-shadow-2xl">
            Reset
          </button>
        </div>
        <div>
          <div className="flex gap-2">
            <input
              className=" mt-[20px] w-full px-[190px] outline-none  h-[30px] rounded-lg placeholder:text-center  border-transparent border-gray-400 border-1"
              type="text"
              placeholder="Search Artist Here "
              value={searchQuery}
              onChange={(e) => setSearcQuery(e.target.value)}
            ></input>
            <button
              onClick={getAllArtist}
              className="bg-orange-600 mt-4 rounded-xl px-3  text-[13px] hover:bg-white hover:text-orange-600"
            >
              Search
            </button>
          </div>
          {/* getall artist registered */}
          <div className="pb-20">
            {/* mapping  */}
            {getArtist.map((artist, i) => {
              return (
                <>
                  {!artist.isbooked && (
                    <div
                      key={i}
                      className=" flex justify-between pr-5 mt-[80px]  rounded-lg bg-[#adadb167] "
                    >
                      <div
                        onClick={() => getSingleArtist(artist.email)}
                        className="flex gap-20"
                      >
                        <div>
                          <img
                            className="w-[35vh] h-[25vh] rounded-lg mt-2 mb-2 ml-2"
                            alt="naruto"
                            src={`https://gold-fair-firefly.cyclic.app/${artist.profile_image}`}
                          />
                        </div>

                        <div>
                          <h1 className="font-bold text-[18px] text-white">
                            {artist.firstname}_{artist.lastname}
                          </h1>
                          <h1 className="text-[15px] font-medium text-white">
                            {artist.band}
                          </h1>
                          <h1 className="text-[18] text-white">
                            {artist.skill}
                          </h1>
                          <h1 className="flex justify-center gap-1 text-white">
                            <FaHeadphonesAlt className="mt-1 text-white" />
                            {artist.genre}
                          </h1>
                          <h1 className="flex justify-center gap-1 text-white">
                            <MdLocationOn className="mt-1" />
                            {artist.address}
                          </h1>
                        </div>
                      </div>
                      <div className="">
                        <button
                          onClick={() => onBookClicked(artist)}
                          className=" mt-[80px] border-2 px-2 rounded-lg bg-orange-600 hover:border-white border-black text-white hover:text-black"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div>
          <select
            className="mt-5 rounded-lg"
            onChange={handleSelectChange}
            value={sortValue}
          >
            <option value="">Sort By</option>
            <option value="latestEnrolledArtist">Latest Enrolled artist</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>
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

      <MyModal2
        isvisible={showBookModal}
        onClose={() => setShowBookModal(false)}
      >
        {/* contents here */}
        <form onSubmit={handleSubmit2(Booking)}>
          <div>
            <h1 className="font-bold text-[30px] font-mono text-orange-600 ">
              Book Artist
            </h1>
          </div>
          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Gig Name</label>
                </div>
                <input
                  type="text"
                  name="gigname"
                  className="border-2 border-black  rounded-lg shadow-xl "
                  {...register2("gigname", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.gigname?.type === "required" &&
                    " Gig Name must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className=" font-bold">Genre Type</label>
                </div>
                <select
                  type="text"
                  name="gigtype"
                  className="border-2  px-[50px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("gigtype", { required: true })}
                >
                  <option value=""></option>
                  <option value="Classical">Classical</option>
                  <option value="Lok Dohori">Lok Dohori</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.gigtype?.type === "required" &&
                    " Genre type  must be added"}
                </span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className=" font-bold">Gig Date</label>
                </div>
                <input
                  type="date"
                  name="date"
                  className="border-2 px-5 border-black  rounded-lg shadow-xl "
                  {...register2("date", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.date?.type === "required" &&
                    " Gig Date must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="  font-bold">Payment Type</label>
                </div>
                <select
                  type="text"
                  name="showtype"
                  className="border-2  px-[45px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("showtype", { required: true })}
                >
                  <option value=""></option>
                  <option value="Hourly">Hourly</option>
                  <option value="Full Show">Full Show</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.showtype?.type === "required" &&
                    " Genre type  must be added"}
                </span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className=" font-bold">Starting Time</label>
                </div>
                <input
                  type="time"
                  name="startingtime"
                  className="border-2 px-[45px] border-black  rounded-lg shadow-xl "
                  {...register2("startingtime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.startingtime?.type === "required" &&
                    " Starting time  must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className=" font-bold">Ending Time</label>
                </div>
                <input
                  type="time"
                  name="endingtime"
                  className="border-2  px-[40px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("endingtime", { required: true })}
                  placeholder="Genre"
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.endingtime?.type === "required" &&
                    " Endtime  must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-start pl-8 gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="  font-bold">Address</label>
                </div>
                <input
                  type="text"
                  name="Address"
                  className="border-2 px-2  border-black  rounded-lg shadow-xl "
                  {...register2("Address", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.Address?.type === "required" &&
                    "Venue Address must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="  font-bold">Payment </label>
                </div>
                <input
                  type="number"
                  name="budget"
                  className="border-2  px-2 placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("budget", { required: true })}
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.budget?.type === "required" &&
                    " Payment must be added"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <label className="font-bold">Description</label>
            </div>
            <textarea
              name="description"
              {...register2("description", { required: true })}
              className="border-2  border-black w-[60%] pb-[10%] "
            ></textarea>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors2.description?.type === "required" &&
                "Must provide a short discription about an artist or band"}
            </span>
          </div>
          <button
            type="submit"
            className="mt-7 border-black border-2 px-5  rounded-xl bg-orange-400"
          >
            Send Booking
          </button>
        </form>
      </MyModal2>

      {/* for single user view */}
      <MyModal6
        isvisible={artistdetails}
        onClose={() => setArtistDetials(false)}
      >
        <div className="flex justify-around">
          <div>
            <img
              className="w-auto h-[40vh]  rounded-lg"
              alt="naruto"
              src={`https://gold-fair-firefly.cyclic.app/${showArtist.profile_image}`}
            />
          </div>
          <div>
            <h1 className="text-center font-bold text-[28px] text-black">
              {showArtist.firstname} {showArtist.lastname}
            </h1>
            <div className="flex gap-4 justify-center">
              <h1 className="uppercase text-[14px] font-medium">
                {showArtist.gender}
              </h1>
              <h1 className="uppercase text-[14px] font-medium">
                {showArtist.address}
              </h1>
              <h1 className="uppercase text-[14px] font-medium">
                {showArtist.phonenumber}
              </h1>
            </div>
            <div>
              <h1 className=" flex justify-center gap-2">
                <p className="uppercase text-[14px] font-medium mt-0.5 ">
                  Artist Type:
                </p>
                {showArtist.band}
              </h1>
              <h1 className="flex justify-center gap-1">
                <p className="uppercase text-[14px] font-medium mt-0.5 ">
                  Artist Genre:
                </p>
                {showArtist.genre}
              </h1>
              <h1 className="flex justify-center">
                <p className="uppercase text-[14px] font-medium mt-0.5 ">
                  Artist Skill:
                </p>
                {showArtist.skill}
              </h1>
              <h1 className="flex justify-center">
                <p className="uppercase text-[14px] font-medium mt-0.5 ">
                  Exereince Level:
                </p>
                {showArtist.expereince}
              </h1>
              <h1 className="text-center mt-5">
                <p className="uppercase text-[14px] font-medium mt-0.5 ">
                  Artist Description
                </p>
                {showArtist.bio}
              </h1>
            </div>
          </div>
        </div>
      </MyModal6>
    </div>
  );
}
