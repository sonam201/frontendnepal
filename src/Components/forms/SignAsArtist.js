import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { MdNotificationsActive } from "react-icons/md";
import axios from "axios";
import useUser from "../../auth/useUser";
import { Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
//importing toast

export default function SignAsArtist() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const user = useUser();
  const email = user.email;

  const updateprofileofartist = async ({
    profile_image,
    firstname,
    lastname,
    phonenumber,
    address,
    date,
    gender,
    band,
    skill,
    genre,
    expereince,
    socialmedia,
    bio,
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
    formData.append("band", band);
    formData.append("skill", skill);
    formData.append("genre", genre);
    formData.append("expereince", expereince);
    formData.append("socialmedia", socialmedia);
    formData.append("bio", bio);
    formData.append("isformfilled", isformfilled.toString());
    try {
      console.log(profile_image, "sapana");
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
      navigate("/dashboardforartist");
    } catch (error) {}
  };
  //dropdown
  const menu = (
    <Menu key="dropdown-menu">
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );
  //testing phase

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
        <div className="flex text-center gap-6 items-center">
          <div>
            <MdNotificationsActive className="text-[25px] hover:text-[#7F669D]" />
          </div>
          <div style={{ position: "relative" }}>
            <Dropdown key="dropdown" overlay={menu} trigger={["click"]}>
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
        PROFILE SETUP FOR ARTIST
      </h1>
      <hr className="border-2 border-black" />
      <form
        onSubmit={handleSubmit(updateprofileofartist)}
        encType="multer/form-data"
      >
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
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.gender?.type === "required" && "Must Select Gender"}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Artist Type*</lebel>
            </div>
            <select
              type="text"
              name="band"
              className="border-2 py-1 px-[125px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("band", { required: true })}
              placeholder="Gender"
            >
              <option value="" selected></option>
              <option value="solo">solo</option>
              <option value="band">Band</option>
            </select>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.band?.type === "required" && "Must Select artist type"}
            </span>
          </div>
          <div>
            <div>
              <lebel className="text-red-700">Skill Level*</lebel>
            </div>
            <select
              type="text"
              name="skill"
              className="border-2 py-1 px-[106px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("skill", { required: true })}
              placeholder="Gender"
            >
              <option value="" selected></option>
              <option value="Begineer">Begineer</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.skill?.type === "required" && "Must Select skill level"}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Genre*</lebel>
            </div>
            <select
              type="text"
              name="genre"
              className="border-2 py-1 px-[110px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("genre", { required: true })}
              placeholder="Gender"
            >
              <option value="" selected></option>
              <option value="Classical">Classical</option>
              <option value="Lok Dohori">Lok Dohori</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip Hop">Hip Hop</option>
            </select>

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.genre?.type === "required" && "Must Select artist genre"}
            </span>
          </div>
          <div>
            <div>
              <lebel className="text-red-700">Years Of Expereince*</lebel>
            </div>
            <select
              type="text"
              name="expereince"
              className="border-2 py-1 px-[135px] placeholder:text-center border-black  rounded-lg shadow-xl"
              {...register("expereince", { required: true })}
              placeholder="Gender"
            >
              <option value="" selected></option>
              <option value="0">0</option>
              <option value="5 years">5 years</option>
              <option value="10 years">10 years</option>
              <option value="15 years">15 years</option>
              <option value="more">More</option>
            </select>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.expereince?.type === "required" &&
                "Must Select artist's years of expereince"}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-9 gap-10">
          <div>
            <div>
              <lebel className="text-red-700">Social Media Link*</lebel>
            </div>
            <input
              type="url"
              name="socialmedia"
              className="border-2 border-black  py-1 px-[30px] rounded-lg shadow-xl"
              placeholder="Social Media URL Link"
              {...register("socialmedia", { required: true })}
            />

            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.socialmedia?.type === "required" &&
                "Must provide any one socail medai url"}
            </span>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <lebel className="text-red-700">Bio*</lebel>
          </div>
          <textarea
            name="bio"
            {...register("bio", { required: true })}
            className="border-2  border-black w-[40%] pb-[10%] "
          ></textarea>
          <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
            {errors.bio?.type === "required" &&
              "Must provide a short discription about an artist or band"}
          </span>
        </div>

        <button
          type="submit"
          className=" mt-5 pt-[2px] pb-[2px] pl-[8px] pr-[8px] text-[14px] bg-transparent border-2 border-blue-300 hover:border-indigo-400 hover:bg-orange-300 font-semibold hover:drop-shadow-2xl  rounded-lg te drop-shadow-lg duration-500"
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
