import React from "react";
import { Link } from "react-router-dom";
//copy this
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//decodder import
import jwt_decode from "jwt-decode";
import axios from "axios";
import useToken from "../../auth/useToken";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//
export default function Loginpage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //state for tracking the values of input
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  //

  const onLogInClicked = async ({ email, password }) => {
    try {
      const response = await axios.post("https://nepal-groove-backend-hrxj.vercel.app/api/login", {
        email: email,
        password: password,
      });
      const { token } = response.data;
      setToken(token);

      var decoded = jwt_decode(token);
      console.log(decoded);

      if (decoded.role === "artist") {
        if (decoded.isformfilled === false) {
          navigate("/signasartist");
        } else {
          navigate("/dashboardforartist");
        }
      } else if (decoded.role === "restaurant") {
        if (decoded.isformfilled === false) {
          navigate("/signasrestaurant");
        } else {
          navigate("/dashboardforrestaurant");
        }
        //if profile is made navigate to home page
      } else if (decoded.role === "viewer") {
        if (decoded.isformfilled === false) {
          navigate("/signasviewer");
        } else {
          navigate("/dashboardforviewer");
        }
      } else if (decoded.role === "admin") {
        navigate("/dashadmin");
      }

      // extract role from token

      toast.success("Logged in Successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Account is not verified", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
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
          <img src="./livemusic.jpg" alt="pic" className="h-[100vh]  " />
        </div>
        <form
          className="px-[50px] mt-[100px] text-center md:fixed md:w-[100vw] md:mt-0    "
          onSubmit={handleSubmit(onLogInClicked)}
        >
          <div>
            <p className="text-center mt-11 pt-3  text-[25px] font-semibold text-black md:text-white drop-shadow-md">
              LOG IN
            </p>
          </div>
          <div className="text-center mt-3">
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className=" placeholder-black outline-none  city  w-[250px] h-7 rounded-[8px]  border-transparent border-[2px]  bg-white drop-shadow-md "
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
              className="placeholder-black outline-none w-[250px] h-7 rounded-[8px] border-transparent border-[2px] bg-white drop-shadow-md"
            />
            {/* Message for an error */}
            <span className="flex justify-center text-red-600 mb-[-10px] text-sm ">
              {errors.password?.type === "required" && "Password  is required"}
            </span>
          </div>
          <button
            type="submit"
            className="my-5 bg-orange-600 px-3 py-1 rounded-xl hover:bg-black hover:text-white"
          >
            Join Now
          </button>
          <Link to="/beforesign">
            <p className="text-[13px] text-center font-semibold hover:text-pink-800  mt-[-12px] pb-[10px] md:text-white">
              Don't have an account,Click Here
            </p>
          </Link>
          <Link to="/">
            <button className="bg-slate-400 mt-4 px-2 py-1 rounded-xl ">
              Back to home page{" "}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
