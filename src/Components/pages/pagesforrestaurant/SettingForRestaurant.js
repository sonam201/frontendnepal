import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive } from "react-icons/md";

import { Dropdown, Menu } from "antd";
import { useForm } from "react-hook-form";
import useUser from "../../../auth/useUser";
//
import { useNavigate } from "react-router-dom";
//
import axios from "axios";
import NavbarForRestaurant from "./NavbarForRestaurant";

export default function SettingForRestaurant() {
  const user = useUser();
  const email = user.email;
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  //for getting the previous profile set up info
  const [getInfoRestaurant, setGetInfoRestaurant] = useState();
  const Restaurantinformation = async () => {
    try {
      const ArtistInfo = await axios.get(
        `https://nepal-groove-backend-hrxj.vercel.app/api/profilebeforeedit/${email}`
      );

      console.log(ArtistInfo);
      const data = ArtistInfo.data.getprofileinfo;
      console.log(data, "k hudai cha");
      setGetInfoRestaurant(data);
      console.log(getInfoRestaurant);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Restaurantinformation();
    //for image
  }, []);

  /// calling the update(patch) method
  const updateprofile = async ({
    profile_image,
    firstname,
    lastname,
    phonenumber,
    address,
    gender,
    socialmedia,
    bio,
    date,
  }) => {
    try {
      const formData = new FormData();

      formData.append("profile_image", profile_image[0]);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("phonenumber", phonenumber);
      formData.append("address", address);
      formData.append("date", date);
      formData.append("gender", gender);
      formData.append("socialmedia", socialmedia);
      formData.append("bio", bio);
      const response = await axios.patch(
        `https://gold-fair-firefly.cyclic.app/api/editprofile/${email}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/dashboardforrestaurant");
    } catch (error) {}
  };

  //for hte correct value of the date
  const dateOptions = { day: "numeric", month: "long", year: "numeric" };
  var startDateTime = new Date(getInfoRestaurant?.date);
  const newStartDate = startDateTime.toLocaleDateString("en-US", dateOptions);

  return (
    <div className="text-center bg-[#010101]">
      <NavbarForRestaurant />
      <h1 className="text-orange-500 font-bold text-[30px] ">
        Edit Your Profile
      </h1>
      {/* Mapping */}
      <form className="mb-5" onSubmit={handleSubmit(updateprofile)}>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <label className="text-red-700">Profile Picture*</label>
            </div>

            <input
              type="file"
              name="profile_image"
              className="border-2   py-1 px-[30px] rounded-lg shadow-xl bg-white text-black opacity-30  "
              {...register("profile_image", { required: true })}
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.profile_image?.type === "required" &&
                "Profile Picture must be added"}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <label className="text-red-700">First Name*</label>
            </div>
            <input
              type="text"
              name="firstname"
              className="border-2 placeholder:text-center text-center py-1 px-[70px] rounded-lg shadow-xl bg-white text-black "
              {...register("firstname", { required: true })}
              placeholder="First Name"
              defaultValue={getInfoRestaurant?.firstname}
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.firstname?.type === "required" &&
                "Must Provide First Name"}
            </span>
          </div>

          <div>
            <div>
              <label className="text-red-700">Last Name*</label>
            </div>
            <input
              type="text"
              name="lastname"
              className="border-2 py-1 px-[70px] placeholder:text-center text-center border-indigo-400 rounded-lg shadow-xl bg-white text-black"
              {...register("lastname", { required: true })}
              placeholder="Last Name"
              defaultValue={getInfoRestaurant?.lastname}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.lastname?.type === "required" && "Must Provide Last Name"}
            </span>
          </div>
          <div>
            <div>
              <label className="text-red-700">Address*</label>
            </div>
            <input
              type="text"
              name="address"
              className="border-2 py-1 px-[70px] placeholder:text-center text-center border-indigo-400  rounded-lg shadow-xl bg-white text-black "
              {...register("address", { required: true })}
              placeholder="Address"
              defaultValue={getInfoRestaurant?.address}
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.address?.type === "required" && "Must Provide Address "}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <label className="text-red-700">Phone Number*</label>
            </div>
            <input
              type=""
              name="number"
              className="border-2 py-1 px-[70px] placeholder:text-center text-center border-indigo-400  rounded-lg shadow-xl bg-white text-black "
              {...register("phonenumber", { required: true })}
              placeholder="Phone Number"
              defaultValue={getInfoRestaurant?.phonenumber}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.phonenumber?.type === "required" &&
                "Must Provide Phone Number"}
            </span>
          </div>
          <div>
            <div>
              <label className="text-red-700">Date Of Birth*</label>
            </div>
            <input
              type="text"
              name="date"
              className="border-2 py-1 px-[70px] text-center placeholder:text-center border-indigo-400  rounded-lg shadow-xl bg-white text-black"
              value={newStartDate}
              disabled
            />
          </div>
          <div>
            <div>
              <label className="text-red-700">Gender*</label>
            </div>
            <select
              type="text"
              name="gender"
              className="border-2 py-1 px-[125px] placeholder:text-center text-center border-indigo-400  rounded-lg shadow-xl bg-white text-black"
              placeholder="Gender"
              disabled
              defaultValue={getInfoRestaurant?.gender?.toString()}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <label className="text-red-700">Social Media Link*</label>
            </div>
            <input
              type="url"
              name="socialmedia"
              className="border-2 border-indigo-400  py-1 px-[30px] rounded-lg shadow-xl bg-white text-black"
              placeholder="Social Media URL Link"
              {...register("socialmedia", { required: true })}
              defaultValue={getInfoRestaurant?.socialmedia}
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.socialmedia?.type === "required" &&
                "Must provide any one socail medai url"}
            </span>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <label className="text-red-700">Bio*</label>
          </div>
          <textarea
            name="bio"
            {...register("bio", { required: true })}
            className="border-2  border-indigo-400 w-[40%] pb-[10%] bg-white text-black "
            defaultValue={getInfoRestaurant?.bio}
          ></textarea>
          <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
            {errors.bio?.type === "required" &&
              "Must provide a short discription about an artist or band"}
          </span>
        </div>

        <button
          type="submit"
          className=" mt-5 pt-[2px] pb-[2px] pl-[8px] pr-[8px] text-[14px] bg-transparent border-2 border-white text-orange-300 hover:text-black  hover:border-indigo-400  hover:bg-orange-300  font-semibold hover:drop-shadow-2xl  rounded-lg te drop-shadow-lg duration-500"
        >
          Let's Finish
        </button>
      </form>

      <div className="flex justify-between mt-[110px] pt-3 pb-3 bg-[#E3EDEE] ">
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
