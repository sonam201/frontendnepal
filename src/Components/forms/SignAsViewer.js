import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive } from "react-icons/md";
import { Dropdown, Menu } from "antd";
import useUser from "../../auth/useUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignAsViewer() {
  const user = useUser();
  const email = user.email;
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  //testing phase
  const onSubmit = (data) => console.log(data);
  //
  const updateprofileofviewer = async ({
    profile_image,
    firstname,
    lastname,
    phonenumber,
    address,
    date,
    gender,
  }) => {
    console.log(gender);
    const formData = new FormData();
    const isformfilled = true;
    formData.append("profile_image", profile_image[0]);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("date", date);
    formData.append("gender", gender);
    formData.append("isformfilled", isformfilled.toString());
    try {
      const response = await axios.patch(
        `https://nepal-groove-backend-hrxj.vercel.app/api/loginasrestaurant/${email}`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      navigate("/dashboardforviewer");
    } catch (error) {}
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );

  return (
    <div className="text-center">
      <div className=" flex justify-between bg-white drop-shadow-xl">
        <div>
          <Link to="/">
            <img
              className="h-[14vh] w-[14vh] relative left-6  pointer-cursor "
              alt="logo "
              src={require("../../Images/gig.png")}
            />
          </Link>
        </div>
        <div className="flex mt-[28px]">
          <button className=" w-[90px] h-[40px]  font-bold text-[15px] border-2 hover:border-[#A7727D] rounded-2xl mt-[-10px]  text-center text-black mr-[40px] ">
            DashBoard
          </button>
          <button className=" w-[90px] h-[40px]  font-bold text-[15px] border-2 hover:border-[#A7727D] mt-[-10px] rounded-2xl   text-center text-black mr-[40px] ">
            Find Artists
          </button>
          <button className=" w-[100px] h-[40px] font-bold text-[15px]  border-2 hover:border-[#A7727D] mt-[-10px] rounded-2xl    text-center text-black  mr-[20px] ml-[20px]">
            Find Shows
          </button>
        </div>
        <div className="flex text-center gap-6 items-center">
          <div>
            <MdNotificationsActive className="text-[25px] hover:text-[#7F669D]" />
          </div>

          <div style={{ position: "relative" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={require("../../Images/profile.png")}
                alt="profile"
                className="w-[7vh] h-[7vh] rounded-2xl  mr-5 "
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <h1 className="text-[30px] font-semibold text-[#d4a373] mt-6">
        PROFILE SETUP FOR VIEWER
      </h1>
      <hr className="border-2 border-black" />
      <form onSubmit={handleSubmit(updateprofileofviewer)}>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Profile Picture*</lebel>
            </div>
            <input
              type="file"
              name="profile_image"
              className="border-2 border-black  py-1 px-[30px] rounded-lg shadow-xl "
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
              <lebel className="text-red-700">First Name*</lebel>
            </div>
            <input
              type="text"
              name="firstname"
              className="border-2 border-black  placeholder:text-center py-1 px-[70px] rounded-lg shadow-xl"
              {...register("firstname", { required: true })}
              placeholder="First Name"
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.firstname?.type === "required" &&
                "Must Provide First Name"}
            </span>
          </div>

          <div>
            <div>
              <lebel className="text-red-700">Last Name*</lebel>
            </div>
            <input
              type="text"
              name="lastname"
              className="border-2 py-1 px-[70px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("lastname", { required: true })}
              placeholder="Last Name"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.lastname?.type === "required" && "Must Provide Last Name"}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Phone Number*</lebel>
            </div>
            <input
              type="number"
              name="phonenumber"
              className="border-2 py-1 px-[70px] placeholder:text-center border-black  rounded-lg shadow-xl "
              {...register("phonenumber", { required: true })}
              placeholder="Phone Number"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.phonenumber?.type === "required" &&
                "Must Provide Phone Number"}
            </span>
          </div>
          <div>
            <div>
              <lebel className="text-red-700">Address*</lebel>
            </div>
            <input
              type="text"
              name="address"
              className="border-2 py-1 px-[70px] placeholder:text-center border-black  rounded-lg shadow-xl "
              {...register("address", { required: true })}
              placeholder="Address"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.address?.type === "required" && "Must Provide Address "}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Date Of Birth*</lebel>
            </div>
            <input
              type="date"
              name="date"
              className="border-2 py-1 px-[90px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("date", { required: true })}
              placeholder="Address"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.date?.type === "required" && "Must Provide Birth Date"}
            </span>
          </div>
          <div>
            <div>
              <lebel className="text-red-700">Gender*</lebel>
            </div>
            <select
              type="text"
              name="gender"
              className="border-2 py-1 px-[125px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("gender", { required: true })}
              placeholder="Gender"
            >
              <option value="" selected></option>
              <option value="1">male</option>
              <option value="2">female</option>
              <option value="3">others</option>
            </select>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.gender?.type === "required" && "Must Select Gender"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className=" mt-11 pt-[2px] pb-[2px] pl-[8px] pr-[8px] text-[14px] bg-transparent border-2 border-blue-300 hover:border-indigo-400 hover:bg-orange-300 font-semibold hover:drop-shadow-2xl  rounded-lg te drop-shadow-lg duration-500"
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
