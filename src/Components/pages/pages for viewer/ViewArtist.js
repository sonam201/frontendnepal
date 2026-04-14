import React from "react";

import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive, MdLocationOn } from "react-icons/md";
import { FaHeadphonesAlt } from "react-icons/fa";
import { ImHappy2 } from "react-icons/im";
import MyModal6 from "../modals/ModalForEachUser";
import { useForm } from "react-hook-form";
import { BsHeadphones } from "react-icons/bs";
import { Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillPersonFill } from "react-icons/bs";

import useUser from "../../../auth/useUser";
import axios from "axios";
import NavigationPageForViewer from "./NavigationPageForViewer";

export default function ViewArtist({ artist }) {
  const user = useUser();
  const email = user.email;
  const [userId, setUserId] = useState(user.id);
  const [artistId, setArtistId] = useState("");
  //for signle artist

  const [getArtist, setGetArtist] = useState([]);
  //for search
  const [searchQuery, setSearcQuery] = useState("");
  const getAllArtist = async () => {
    const ArtistData = await axios.get(
      "https://nepal-groove-backend-hrxj.vercel.app/api/searchuser",
      {
        params: {
          firstname: searchQuery,
          // sort: sortOption,

          // genre: genreFilters.join(","),
        },
      }
    );
    const data = ArtistData.data.artistuser;
    setGetArtist(data);
  };
  useEffect(() => {
    getAllArtist();
  }, [searchQuery]);
  //for single user
  const [showArtist, setShowArtist] = useState([]);
  const getSingleArtist = async (email, id) => {
    const singleArtist = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/singleuser/${email}`
    );
    const data = singleArtist.data.artist;
    setArtistID(id);
    setShowArtist(data);
    setArtistDetials(true);
    commentlists();
  };
  const [artistdetails, setArtistDetials] = useState(false);
  const [artistID, setArtistID] = useState();

  //for comment api
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //
  const onArtistClicked = (artist) => {
    setArtistId(artist._id);
    console.log("ayo artist id", artistId);
  };
  const comment = async ({ Text }) => {
    const response = await axios.post(
      "https://gold-fair-firefly.cyclic.app/api/comment",
      {
        Text: Text,
        CommentedBy: userId,
        CommentedTo: artistId,
      }
    );
    reset();
    toast.success("Comment Posted", {
      position: "bottom-right",
      theme: "dark",
      autoClose: 3000,
    });
  };

  //for getting comment details
  const [commentArray, setCommentArray] = useState([]);
  const commentlists = async (artist) => {
    const commentdetails = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/commentlists/${artistID}`
    );
    const data = commentdetails.data.com;

    setCommentArray(data);
    console.log(data);
  };

  //for dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );
  console.log(artistID);
  //

  return (
    <div className="text-center bg-[#010101] ">
      <NavigationPageForViewer />
      <div className="flex justify-center gap-10 pb-[155px] ">
        <div>
          <div>
            <input
              className="  relative top-[30px] outline-none  w-full px-[190px]  h-[30px] rounded-lg placeholder:text-center drop-shadow-2xl border-transparent border-gray-400 border-1"
              type="text"
              placeholder="Search Artist Here "
              value={searchQuery}
              onChange={(e) => setSearcQuery(e.target.value)}
            ></input>
          </div>
          {/* getall artist registered */}
          <div className="pb-20">
            {/* mapping  */}
            {getArtist.map((artist, i) => {
              return (
                <div
                  key={i}
                  className=" flex justify-around py-2 mt-[80px]  rounded-lg bg-[#adadb167] "
                >
                  <div
                    onClick={() => getSingleArtist(artist.email, artist._id)}
                    className="flex gap-20"
                  >
                    <img
                      className="w-[20vh] h-[20vh] rounded-lg"
                      alt="naruto"
                      src={`https://gold-fair-firefly.cyclic.app/${artist.profile_image}`}
                      onClick={() => onArtistClicked(artist)}
                    />
                  </div>

                  <div>
                    <h1 className="font-bold text-[18px] text-white">
                      {artist.firstname}_{artist.lastname}
                    </h1>
                    <h1 className="text-[15px] font-medium text-white">
                      {artist.band}
                    </h1>
                    <h1 className="text-[18] text-white">{artist.skill}</h1>
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
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between  pt-3 pb-3 bg-[#E3EDEE]  ">
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
      {/* for single artist details */}
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
              <h1 className=" flex justify-center gap-2">
                <HiLocationMarker className="mt-1" />
                {showArtist.band}
              </h1>
            </div>
            <div>
              <h1 className="flex justify-center gap-1">
                <BsHeadphones className="mt-1" />
                {showArtist.genre}
              </h1>

              <h1 className="text-[14px] font-medium">{showArtist.address}</h1>
              <div className="h-[100px] overflow-y-scroll">
                <h1 className="mt-3 font-bold">Comments:</h1>
                {Array.isArray(commentArray) ? (
                  commentArray.map((comment, i) => (
                    <div key={i}>
                      <BsFillPersonFill />
                      <h1>{comment.CommentedBy.firstname}</h1>
                      <h1>{comment.Text}</h1>
                    </div>
                  ))
                ) : (
                  <p>No comments available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <form
              onSubmit={handleSubmit(comment)}
              className="flex justify-start ml-3 mt-3 gap-5"
            >
              <div>
                <input
                  type="text"
                  name="Text"
                  className="rounded-lg placeholder:text-start flex justify-start ml-10 outline-none pr-[100px] bg-slate-500"
                  placeholder="Add your comment"
                  {...register("Text", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.Text?.type === "required" &&
                    "Input box must be filled to post comment"}
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-orange-600 text-white rounded-xl px-6 py-0.5"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </MyModal6>
    </div>
  );
}
