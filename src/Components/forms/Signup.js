import React, { useState } from "react";
import { FcAbout, FcBusinessContact } from "react-icons/fc";
import { SiTwitter, SiFacebook } from "react-icons/si";
import { Button } from "antd";
import { Link, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
//importing the axios
import axios from "axios";
//importing from auth file
import useToken from "../../auth/useToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundpic from "../../Images/backgroundlog.jpg";
import { useNavigate } from "react-router-dom";
//for search param
import { useSearchParams } from "react-router-dom";


//calling api
// import axios from "axios"
export default function Loginpage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [assignrole, setAssignRole] = useState(role);
  console.log(role);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  console.log(errors);

  const [token, setToken] = useToken();

  const onSignUpClicked = async ({ email, passwordhai }) => {
    try {
      console.log(assignrole);
      const response = await axios.post("https://nepal-groove-backend-hrxj.vercel.app/api/signup", {
        email: email,
        password: passwordhai,
        role: assignrole,
      });
      const { token } = response.data;
      setToken(token);
      toast.success("Signed up Successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
      navigate("/verifyemail");
    } catch (error) {
      toast.error("Account already exists");
    }
  };
  watch();
  //To check password
  const validatepassword = (value) => {
    let error;
    if (!value) {
      toast.error("Confirm Password is Required");
      error = "Confirm Password is required";
    } else if (value !== watch("password")) {
      toast.error("Passwords do not match");
      error = "Passwords do not match";
    }

    return error || true;
  };

  return (
    <div
      // style={{
      //   backgroundImage: `url(${backgroundpic})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   height: "100vh",
      // }}
    >
      <div className="bg-blue-1000 flex md:items-center ">
      <div>
          <img src="./singing.jpg" alt="pic" className="h-[100vh]  " />
        </div>
        <form
          className="px-[50px] mt-[100px] text-center md:fixed md:w-[100vw] md:mt-0 "
          onSubmit={handleSubmit(onSignUpClicked)}
        >
          <div>
            <p className="text-center mt-11 pt-3  text-[25px] font-semibold text-black md:text-white drop-shadow-md">
              Join The Fun
            </p>
          </div>
          <div className="text-center mt-3">
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className=" placeholder-black outline-none  city  w-[250px] h-7 rounded-[8px] border-transparent border-[2px]  bg-white drop-shadow-md"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-sm ">
              {errors.email?.type === "required" && "Email is required"}
            </span>
          </div>
          <div className="mt-6 text-center">
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              id="password"
              placeholder="Password"
              className="placeholder-black outline-none w-[250px] h-7 rounded-[8px] border-transparent  border-[2px] bg-white drop-shadow-md"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-sm ">
              {errors.password?.type === "required" && "Password  is required"}
            </span>
          </div>
          <div className="mt-6 text-center">
            <input
              type="password"
              name="passwordhai"
              {...register(
                "passwordhai",
                { validate: validatepassword },
                { required: true }
              )}
              id="password1"
              placeholder="Confirm Password"
              className="placeholder-black outline-none w-[250px] h-7 rounded-[8px] border-transparent border-[2px] bg-white drop-shadow-md"
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-sm">
              {errors.passwordhai?.type === "required" &&
                "Password  is required"}
            </span>
          </div>
          <button
            type="submit"
            className="my-5 bg-orange-600 px-3 py-1 rounded-xl hover:bg-black hover:text-white"
          >
            Join Now
          </button>
          <div className="mt-[8px]">
            <Link to="/login">
              <p className="text-[13px] text-center font-semibold hover:text-pink-800  mt-[-12px] pb-[10px] md:text-white">
                Already have an account!{" "}
              </p>
            </Link>
            <Link to="/">
            <button className="bg-slate-400 mt-4 px-2 py-1 rounded-xl ">
              Back to home page{" "}
            </button>
          </Link>
          </div>
        </form>
      </div>
      
    </div>
  );
}
