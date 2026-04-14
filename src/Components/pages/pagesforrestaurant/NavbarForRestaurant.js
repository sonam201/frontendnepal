import { MdNotificationsActive } from "react-icons/md";
import useUser from "../../../auth/useUser";
import axios from "axios";
import { Dropdown, Input, Menu } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import MyModal from "../modals/ShowModel";
import { ImHappy2 } from "react-icons/im";
import { IoMdMicrophone } from "react-icons/io";
import MyModal4 from "../modals/ModalForEvent";
import MyModal9 from "../modals/ModalForApplyFirGig";
//
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NavbarForRestaurant() {
  const user = useUser();
  const email = user.email;
  //usestate for getting user ID
  const [userId, setUser] = useState(user.id);
  //validation for checking the fields in gig-creation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  //for image of profile (multer)
  const [getInfoRestaurant, setGetInfoRestaurant] = useState();
  const Restaurantinformation = async () => {
    try {
      const RestaurantInfo = await axios.get(
        `https://nepal-groove-backend-hrxj.vercel.app/api/profilebeforeedit/${email}`
      );

      // console.log(ArtistInfo);
      const data = RestaurantInfo.data.getprofileinfo;
      // console.log(data);
      setGetInfoRestaurant(data);
      // console.log(getInfoArtist);
    } catch (error) {
      // console.log(error);
    }
  };
  // console.log(Artistinformation, "dai cha");
  useEffect(() => {
    Restaurantinformation();
  }, []);

  //state for modal
  const [showModal, setShowModal] = useState(false);
  //function for creating gig
  const creatinggig = async ({
    gigProfile,
    gigName,
    genreNeeded,
    gigdate,
    paymenttype,
    starttime,
    endtime,
    address,
    payment,
    bio,
  }) => {
    const formData = new FormData();
    formData.append("gigProfile", gigProfile[0]);
    formData.append("gigName", gigName);
    formData.append("genreNeeded", genreNeeded);
    formData.append("gigdate", gigdate);
    formData.append("paymenttype", paymenttype);
    formData.append("starttime", starttime);
    formData.append("endtime", endtime);
    formData.append("address", address);
    formData.append("payment", payment);
    formData.append("description", bio);
    formData.append("createdBy", userId);

    const response = await axios.post(
      "https://gold-fair-firefly.cyclic.app/api/gigs",
      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    setShowModal(false);
    toast.success("Gig Created Successfully", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  //
  //state for event modal
  const [eventModal, setEventModal] = useState(false);
  //method for event
  const createevent = async ({
    EventPic,
    eventName,
    TypeofEvent,
    ArtistName,
    eventdate,
    startingtime,
    endingtime,
    eventaddress,
    ticketprice,
    description,
  }) => {
    const formData = new FormData();
    formData.append("EventPic", EventPic[0]);
    formData.append("eventName", eventName);
    formData.append("TypeofEvent", TypeofEvent);
    formData.append("ArtistName", ArtistName);
    formData.append("eventdate", eventdate);
    formData.append("startingtime", startingtime);
    formData.append("endingtime", endingtime);
    formData.append("eventaddress", eventaddress);
    formData.append("ticketprice", ticketprice);
    formData.append("description", description);
    const response = await axios.post(
      "https://gold-fair-firefly.cyclic.app/api/event",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setEventModal(false);
    toast.success("Event Created Successfully", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };
  //notifiation on gig applied
  const [notifiation, setNotification] = useState([]);
  const [countNotification, setCountNotification] = useState(0);
  const [arrayNoti, setArrayNoti] = useState([]);
  const getapplygig = async (user) => {
    const MyGig = await axios.get(
      `https://gold-fair-firefly.cyclic.app/api/mygig/${user.id}?role=${user.role}`
    );
    setNotification(MyGig.data);
    const data = MyGig.data;
    setArrayNoti(data);
    setCountNotification(MyGig.data.length || 0);
  };
  console.log(arrayNoti, "chaaaaa");
  useEffect(() => {
    getapplygig(user);
  }, []);
  //stae for notification modal
  const [visibleModal, setVisibleModal] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );

  const [applierID, setApplierID] = useState();

  const showGigApplier = (id) => {
    setVisibleModal(true);
    setApplierID(id);
  };
  //dropdown notifiction for gig apply
  const NaviNotification = (
    <Menu>
      {arrayNoti.map((array, i) => {
        if (array.status === "accepted" || array.status === "declined") {
          return <p>no notifications</p>;
        } else {
          return (
            <div key={i}>
              <Menu.Item
                key="1"
                className=" border-2 border-black rounded-2xl"
                onClick={() => showGigApplier(array._id)}
              >
                {array.appliedBy.firstname} is trying to apply on your ("
                {array.appliedGig.gigName}") Gig
              </Menu.Item>
            </div>
          );
        }
      })}
    </Menu>
  );
  //for changing gig status
  //for changin the status
  const acceptHandler = async (id, gig) => {
    const response = await axios.put(
      `https://gold-fair-firefly.cyclic.app/api/gigapply/${id}`,
      {
        status: "accepted",
        appliedGig: gig,
      }
    );
    setVisibleModal(false);
    toast.success("Accepted", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };
  const deleteHandler = async (id) => {
    const respond = await axios.put(
      `https://gold-fair-firefly.cyclic.app/api/gigapply/${id}`,
      {
        status: "declined",
      }
    );
    setVisibleModal(false);
    toast.error("Declined", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };
  return (
    <div className="  bg-black  sticky top-0">
      <div className=" flex justify-between bg-[#adadb167]   drop-shadow-xl">
        <div>
          <Link to="/">
            <img
              className="h-[14vh] w-[14vh] relative left-6  pointer-cursor "
              alt="logo "
              src={require("../../../Images/gig.png")}
            />
          </Link>
        </div>
        <div className="flex mt-[28px]">
          <Link to="/dashboardforrestaurant">
            <button className=" w-[90px] h-[35px] mt-[-5px] border-transparent rounded-2xl  border-2 hover:border-[#A7727D] font-bold text-[15px]  items-center text-center text-white mr-[40px] ">
              DashBoard
            </button>
          </Link>
          <Link to="/findartist">
            <button className=" w-[90px] h-[35px] pt-1 mt-[-5px] border-transparent rounded-2xl  font-bold text-[15px] hover:border-[#A7727D] border-2 text-center text-white mr-[40px] ">
              Find Artists
            </button>
          </Link>
          <div>
            <button
              onClick={() => setShowModal(true)}
              className=" w-[100px] h-[40px] font-bold text-[15px] border-transparent  border-2 rounded-md hover:border-[#A7727D] mt-[-10px]    text-center text-white  mr-[20px] ml-[20px]"
            >
              + Create Gig
            </button>
          </div>
          <div>
            <button
              onClick={() => setEventModal(true)}
              className=" w-[120px] h-[40px] font-bold text-[15px] border-transparent  border-2 rounded-md hover:border-[#A7727D] mt-[-10px]    text-center text-white  mr-[20px] ml-[20px]"
            >
              + Create Events
            </button>
          </div>
          {/*  */}
        </div>

        <div className="flex text-center gap-6 items-center">
          <div>
            <Dropdown overlay={NaviNotification} trigger={["click"]}>
              <MdNotificationsActive className="text-[25px] mt-5 hover:text-[#7F669D]" />
            </Dropdown>
            <span>{countNotification} </span>
          </div>

          <div style={{ position: "relative" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={`https://gold-fair-firefly.cyclic.app/${getInfoRestaurant?.profile_image}`}
                alt="profile"
                className="w-[7vh] h-[7vh] rounded-[25px]  mr-5 "
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <MyModal isvisible={showModal} onClose={() => setShowModal(false)}>
        {/* contents here */}
        <form onSubmit={handleSubmit(creatinggig)}>
          <div>
            <h1 className="flex justify-center gap-2 font-bold text-[25px] text-orange-600 font-mono animate-bounce ">
              <IoMdMicrophone className="mt-1" />
              Create Your Gig Post
              <ImHappy2 className="mt-2" />
            </h1>
          </div>
          <div className="flex justify-center mt-4 gap-5">
            <div>
              <div>
                <label className=" font-bold">Gig Picture</label>
              </div>
            </div>
            <input
              type="file"
              name="gigProfile"
              className="border-2 border-black  rounded-lg shadow-xl "
              {...register("gigProfile", { required: true })}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.gigProfile?.type === "required" &&
                " Gig Profile Picture must be added"}
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className=" font-bold">Gig Name</label>
                </div>
                <input
                  type="text"
                  name="gigName"
                  className="border-2 border-black  rounded-lg shadow-xl "
                  {...register("gigName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.gigName?.type === "required" &&
                    " Gig Name must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="  font-bold">Genre Type</label>
                </div>
                <select
                  type="text"
                  name="genreNeeded"
                  className="border-2  px-[50px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register("genreNeeded", { required: true })}
                  placeholder="Genre"
                >
                  <option value=""></option>
                  <option value="Classical">Classical</option>
                  <option value="Lok Dohori">Lok Dohori</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.genreNeeded?.type === "required" &&
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
                  name="gigdate"
                  className="border-2 px-4 border-black  rounded-lg shadow-xl "
                  {...register("gigdate", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.gigdate?.type === "required" &&
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
                  name="paymenttype"
                  className="border-2  px-[45px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register("paymenttype", { required: true })}
                  placeholder="Genre"
                >
                  <option value=""></option>
                  <option value="Hourly">Hourly</option>
                  <option value="Full Show">Full Show</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.paymenttype?.type === "required" &&
                    " Genre type  must be added"}
                </span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className="  font-bold">Starting Time</label>
                </div>
                <input
                  type="time"
                  name="starttime"
                  className="border-2 px-[45px] border-black  rounded-lg shadow-xl "
                  {...register("starttime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.starttime?.type === "required" &&
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
                  name="endtime"
                  className="border-2  px-[35px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register("endtime", { required: true })}
                  placeholder="Genre"
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.endtime?.type === "required" &&
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
                  name="address"
                  className="border-2 px-1  border-black  rounded-lg shadow-xl "
                  {...register("address", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.address?.type === "required" &&
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
                  name="payment"
                  className="border-2  px-1 placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register("payment", { required: true })}
                  placeholder="Genre"
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors.payment?.type === "required" &&
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
              name="bio"
              {...register("bio", { required: true })}
              className="border-2  border-black w-[60%] pb-[10%] "
            ></textarea>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors.bio?.type === "required" &&
                "Must provide a short discription about an artist or band"}
            </span>
          </div>
          <button
            type="submit"
            className="mt-7 border-black border-2 px-5 rounded-xl bg-orange-400"
          >
            Create
          </button>
        </form>
      </MyModal>

      {/*  */}
      <MyModal4 isvisible={eventModal} onClose={() => setEventModal(false)}>
        <form onSubmit={handleSubmit2(createevent)}>
          <div>
            <h1 className="flex justify-center gap-2 font-bold text-[25px] text-orange-600 font-mono animate-bounce ">
              <IoMdMicrophone className="mt-1" />
              Create Your Event Post
              <ImHappy2 className="mt-2" />
            </h1>
          </div>
          <div className="flex justify-center mt-4 gap-5">
            <div>
              <div>
                <label className=" font-bold">Event Picture</label>
              </div>
            </div>
            <input
              type="file"
              name="EventPic"
              className="border-2 border-black  rounded-lg shadow-xl "
              {...register2("EventPic", { required: true })}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
              {errors2.EventPic?.type === "required" &&
                " Event Picture must be added"}
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className=" font-bold">Event Name</label>
                </div>
                <input
                  type="text"
                  name="eventName"
                  className="border-2 border-black  rounded-lg shadow-xl "
                  {...register2("eventName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.eventName?.type === "required" &&
                    " Event Name Name must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="  font-bold">Genre of Music</label>
                </div>
                <select
                  type="text"
                  name="TypeofEvent"
                  className="border-2  px-[50px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("TypeofEvent", { required: true })}
                  placeholder="Genre"
                >
                  <option value=""></option>
                  <option value="Classical">Classical</option>
                  <option value="Lok Dohori">Lok Dohori</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.TypeofEvent?.type === "required" &&
                    " Genre of music must be added"}
                </span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className=" font-bold">Artist Name</label>
                </div>
                <input
                  type="text"
                  name="ArtistName"
                  className="border-2 px-4 border-black  rounded-lg shadow-xl "
                  {...register2("ArtistName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.ArtistName?.type === "required" &&
                    "Artist Name must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="  font-bold">Date of event</label>
                </div>
                <input
                  type="date"
                  name="eventdate"
                  className="border-2  px-[35px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("eventdate", { required: true })}
                ></input>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.eventdate?.type === "required" &&
                    " Date of event must be added"}
                </span>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className="  font-bold">Starting Time</label>
                </div>
                <input
                  type="time"
                  name="startingtime"
                  className="border-2 px-[50px] border-black  rounded-lg shadow-xl "
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
                  className="border-2  px-[50px] placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("endingtime", { required: true })}
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.endingtime?.type === "required" &&
                    " Endtime  must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-start pl-3 gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="  font-bold">Event Address</label>
                </div>
                <input
                  type="text"
                  name=" eventaddress"
                  className="border-2 px-1  border-black  rounded-lg shadow-xl "
                  {...register2("eventaddress", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.eventaddress?.type === "required" &&
                    "Venue Address must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Ticket Price </label>
                </div>
                <input
                  type="number"
                  name="ticketprice"
                  className="border-2  px-3 placeholder:text-center  border-black  rounded-lg shadow-xl"
                  {...register2("ticketprice", { required: true })}
                />

                <span className="flex justify-center text-red-600 mb-[-10px] text-xs ">
                  {errors2.ticketprice?.type === "required" &&
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
                "Must provide a short discription about an Event"}
            </span>
          </div>
          <button
            type="submit"
            className="mt-7 border-black border-2 px-5 rounded-xl bg-orange-400"
          >
            Post
          </button>
        </form>
      </MyModal4>
      {/* modal for gig apply */}
      <MyModal9 isvisible={visibleModal} onClose={() => setVisibleModal(false)}>
        {/* contents here */}
        {arrayNoti.map((array, i) => {
          if (array._id === applierID) {
            return (
              <div key={i}>
                <div>
                  <div className="flex justify-around">
                    <div>
                      <img
                        className="w-auto h-[40vh]  rounded-lg"
                        alt="naruto"
                        src={`https://gold-fair-firefly.cyclic.app/${array.appliedBy?.profile_image}`}
                      />
                    </div>
                    <div>
                      <h1 className="text-center font-bold text-[28px] text-black">
                        {array.appliedBy?.firstname} {array.appliedBy?.lastname}
                      </h1>
                      <div className="flex gap-4 justify-center">
                        <h1 className="uppercase text-[14px] font-medium">
                          {array.appliedBy?.gender}
                        </h1>
                        <h1 className="uppercase text-[14px] font-medium">
                          {array.appliedBy?.address}
                        </h1>
                        <h1 className="uppercase text-[14px] font-medium">
                          {array.appliedBy?.phonenumber}
                        </h1>
                      </div>
                      <div>
                        <h1 className=" flex justify-center gap-2">
                          <p className="uppercase text-[14px] font-medium mt-0.5 ">
                            Artist Type:
                          </p>
                          {array.appliedBy?.band}
                        </h1>
                        <h1 className="flex justify-center gap-1">
                          <p className="uppercase text-[14px] font-medium mt-0.5 ">
                            Artist Genre:
                          </p>
                          {array.appliedBy?.genre}
                        </h1>
                        <h1 className="flex justify-center">
                          <p className="uppercase text-[14px] font-medium mt-0.5 ">
                            Artist Skill:
                          </p>
                          {array.appliedBy?.skill}
                        </h1>
                        <h1 className="flex justify-center">
                          <p className="uppercase text-[14px] font-medium mt-0.5 ">
                            Exereince Level:
                          </p>
                          {array.appliedBy?.expereince}
                        </h1>
                        <h1 className="text-center mt-5">
                          <p className="uppercase text-[14px] font-medium mt-0.5 ">
                            Artist Description
                          </p>
                          {array.appliedBy?.bio}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* {status === "pending" && ( */}
                  <div className="flex justify-center gap-[20%] mt-5">
                    <button
                      className="bg-blue-600 px-6 py-2 rounded-xl text-white hover:bg-orange-400"
                      onClick={() => acceptHandler(array._id, array.appliedGig)}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deleteHandler(array._id)}
                      className="bg-green-600 px-6 py-2 rounded-xl text-white hover:bg-purple-500"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </MyModal9>
    </div>
  );
}
