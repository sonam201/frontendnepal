import { MdNotificationsActive } from "react-icons/md";
import useUser from "../../../auth/useUser";
import axios from "axios";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import MyModal from "../modals/ShowModel";
import { ImHappy2 } from "react-icons/im";
import { IoMdMicrophone } from "react-icons/io";
import MyModal4 from "../modals/ModalForEvent";
import MyModal9 from "../modals/ModalForApplyFirGig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "https://nepal-groove-backend-hrxj.vercel.app";

export default function NavbarForRestaurant() {
  const user = useUser();
  const email = user?.email || "";
  const userId = user?.id || "";

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

  const [getInfoRestaurant, setGetInfoRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [countNotification, setCountNotification] = useState(0);
  const [arrayNoti, setArrayNoti] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [applierID, setApplierID] = useState("");

  const Restaurantinformation = useCallback(async () => {
    if (!email) return;

    try {
      const RestaurantInfo = await axios.get(
        `${API_BASE}/api/profilebeforeedit/${email}`
      );
      const data = RestaurantInfo?.data?.getprofileinfo || null;
      setGetInfoRestaurant(data);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    Restaurantinformation();
  }, [Restaurantinformation]);

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
    try {
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

      await axios.post(`${API_BASE}/api/gigs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowModal(false);
      toast.success("Gig Created Successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create gig", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

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
    try {
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

      await axios.post(`${API_BASE}/api/event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEventModal(false);
      toast.success("Event Created Successfully", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create event", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const getapplygig = useCallback(async () => {
    if (!user?.id || !user?.role) return;

    try {
      const myGig = await axios.get(
        `${API_BASE}/api/mygig/${user.id}?role=${user.role}`
      );
      const data = myGig.data || [];
      setArrayNoti(data);
      setCountNotification(data.length || 0);
    } catch (error) {
      console.log(error);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    getapplygig();
  }, [getapplygig]);

  const menu = (
    <Menu>
      <Menu.Item key="1">{email}</Menu.Item>
      <Link to="/login">
        <Menu.Item key="3">Logout</Menu.Item>
      </Link>
    </Menu>
  );

  const showGigApplier = (id) => {
    setVisibleModal(true);
    setApplierID(id);
  };

  const pendingNotifications = useMemo(() => {
    return arrayNoti.filter(
      (item) => item?.status !== "accepted" && item?.status !== "declined"
    );
  }, [arrayNoti]);

  const NaviNotification = (
    <Menu>
      {pendingNotifications.length === 0 ? (
        <Menu.Item key="empty">No notifications</Menu.Item>
      ) : (
        pendingNotifications.map((array) => (
          <Menu.Item
            key={array._id}
            className="border-2 border-black rounded-2xl"
            onClick={() => showGigApplier(array._id)}
          >
            {array.appliedBy?.firstname} is trying to apply on your ("
            {array.appliedGig?.gigName}") Gig
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const acceptHandler = async (id, gigId) => {
    try {
      await axios.put(`${API_BASE}/api/gigapply/${id}`, {
        status: "accepted",
        appliedGig: gigId,
      });

      setVisibleModal(false);
      toast.success("Accepted", {
        position: "bottom-right",
        autoClose: 5000,
      });
      getapplygig();
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.put(`${API_BASE}/api/gigapply/${id}`, {
        status: "declined",
      });

      setVisibleModal(false);
      toast.error("Declined", {
        position: "bottom-right",
        autoClose: 5000,
      });
      getapplygig();
    } catch (error) {
      console.log(error);
      toast.error("Failed to decline", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const selectedApplicant = arrayNoti.find((item) => item._id === applierID);

  return (
    <div className="bg-black sticky top-0">
      <div className="flex justify-between bg-[#adadb167] drop-shadow-xl">
        <div>
          <Link to="/">
            <img
              className="h-[14vh] w-[14vh] relative left-6 pointer-cursor"
              alt="logo"
              src={require("../../../Images/gig.png")}
            />
          </Link>
        </div>

        <div className="flex mt-[28px]">
          <Link to="/dashboardforrestaurant">
            <button className="w-[90px] h-[35px] mt-[-5px] border-transparent rounded-2xl border-2 hover:border-[#A7727D] font-bold text-[15px] items-center text-center text-white mr-[40px]">
              DashBoard
            </button>
          </Link>

          <Link to="/findartist">
            <button className="w-[90px] h-[35px] pt-1 mt-[-5px] border-transparent rounded-2xl font-bold text-[15px] hover:border-[#A7727D] border-2 text-center text-white mr-[40px]">
              Find Artists
            </button>
          </Link>

          <div>
            <button
              onClick={() => setShowModal(true)}
              className="w-[100px] h-[40px] font-bold text-[15px] border-transparent border-2 rounded-md hover:border-[#A7727D] mt-[-10px] text-center text-white mr-[20px] ml-[20px]"
            >
              + Create Gig
            </button>
          </div>

          <div>
            <button
              onClick={() => setEventModal(true)}
              className="w-[120px] h-[40px] font-bold text-[15px] border-transparent border-2 rounded-md hover:border-[#A7727D] mt-[-10px] text-center text-white mr-[20px] ml-[20px]"
            >
              + Create Events
            </button>
          </div>
        </div>

        <div className="flex text-center gap-6 items-center">
          <div>
            <Dropdown overlay={NaviNotification} trigger={["click"]}>
              <MdNotificationsActive className="text-[25px] mt-5 hover:text-[#7F669D]" />
            </Dropdown>
            <span>{countNotification}</span>
          </div>

          <div style={{ position: "relative" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <img
                src={
                  getInfoRestaurant?.profile_image
                    ? `${API_BASE}/${getInfoRestaurant.profile_image}`
                    : "https://via.placeholder.com/70"
                }
                alt="profile"
                className="w-[7vh] h-[7vh] rounded-[25px] mr-5"
              />
            </Dropdown>
          </div>
        </div>
      </div>

      <MyModal isvisible={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit(creatinggig)}>
          <div>
            <h1 className="flex justify-center gap-2 font-bold text-[25px] text-orange-600 font-mono animate-bounce">
              <IoMdMicrophone className="mt-1" />
              Create Your Gig Post
              <ImHappy2 className="mt-2" />
            </h1>
          </div>

          <div className="flex justify-center mt-4 gap-5">
            <div>
              <div>
                <label className="font-bold">Gig Picture</label>
              </div>
            </div>
            <input
              type="file"
              name="gigProfile"
              className="border-2 border-black rounded-lg shadow-xl"
              {...register("gigProfile", { required: true })}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
              {errors.gigProfile?.type === "required" &&
                " Gig Profile Picture must be added"}
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Gig Name</label>
                </div>
                <input
                  type="text"
                  name="gigName"
                  className="border-2 border-black rounded-lg shadow-xl"
                  {...register("gigName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.gigName?.type === "required" &&
                    " Gig Name must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Genre Type</label>
                </div>
                <select
                  type="text"
                  name="genreNeeded"
                  className="border-2 px-[50px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register("genreNeeded", { required: true })}
                >
                  <option value=""></option>
                  <option value="Classical">Classical</option>
                  <option value="Lok Dohori">Lok Dohori</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.genreNeeded?.type === "required" &&
                    " Genre type must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Gig Date</label>
                </div>
                <input
                  type="date"
                  name="gigdate"
                  className="border-2 px-4 border-black rounded-lg shadow-xl"
                  {...register("gigdate", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
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
                  <label className="font-bold">Payment Type</label>
                </div>
                <select
                  type="text"
                  name="paymenttype"
                  className="border-2 px-[45px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register("paymenttype", { required: true })}
                >
                  <option value=""></option>
                  <option value="Hourly">Hourly</option>
                  <option value="Full Show">Full Show</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.paymenttype?.type === "required" &&
                    " Payment type must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Starting Time</label>
                </div>
                <input
                  type="time"
                  name="starttime"
                  className="border-2 px-[45px] border-black rounded-lg shadow-xl"
                  {...register("starttime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.starttime?.type === "required" &&
                    " Starting time must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Ending Time</label>
                </div>
                <input
                  type="time"
                  name="endtime"
                  className="border-2 px-[35px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register("endtime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.endtime?.type === "required" &&
                    " End time must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-start pl-8 gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Address</label>
                </div>
                <input
                  type="text"
                  name="address"
                  className="border-2 px-1 border-black rounded-lg shadow-xl"
                  {...register("address", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors.address?.type === "required" &&
                    "Venue Address must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Payment</label>
                </div>
                <input
                  type="number"
                  name="payment"
                  className="border-2 px-1 placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register("payment", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
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
              className="border-2 border-black w-[60%] pb-[10%]"
            ></textarea>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
              {errors.bio?.type === "required" &&
                "Must provide a short description about an artist or band"}
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

      <MyModal4 isvisible={eventModal} onClose={() => setEventModal(false)}>
        <form onSubmit={handleSubmit2(createevent)}>
          <div>
            <h1 className="flex justify-center gap-2 font-bold text-[25px] text-orange-600 font-mono animate-bounce">
              <IoMdMicrophone className="mt-1" />
              Create Your Event Post
              <ImHappy2 className="mt-2" />
            </h1>
          </div>

          <div className="flex justify-center mt-4 gap-5">
            <div>
              <div>
                <label className="font-bold">Event Picture</label>
              </div>
            </div>
            <input
              type="file"
              name="EventPic"
              className="border-2 border-black rounded-lg shadow-xl"
              {...register2("EventPic", { required: true })}
            />
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
              {errors2.EventPic?.type === "required" &&
                " Event Picture must be added"}
            </span>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Event Name</label>
                </div>
                <input
                  type="text"
                  name="eventName"
                  className="border-2 border-black rounded-lg shadow-xl"
                  {...register2("eventName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.eventName?.type === "required" &&
                    " Event Name must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Genre of Music</label>
                </div>
                <select
                  type="text"
                  name="TypeofEvent"
                  className="border-2 px-[50px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register2("TypeofEvent", { required: true })}
                >
                  <option value=""></option>
                  <option value="Classical">Classical</option>
                  <option value="Lok Dohori">Lok Dohori</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip Hop">Hip Hop</option>
                </select>
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.TypeofEvent?.type === "required" &&
                    " Genre of music must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Artist Name</label>
                </div>
                <input
                  type="text"
                  name="ArtistName"
                  className="border-2 px-4 border-black rounded-lg shadow-xl"
                  {...register2("ArtistName", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.ArtistName?.type === "required" &&
                    " Artist Name must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Date of event</label>
                </div>
                <input
                  type="date"
                  name="eventdate"
                  className="border-2 px-[35px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register2("eventdate", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.eventdate?.type === "required" &&
                    " Date of event must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Starting Time</label>
                </div>
                <input
                  type="time"
                  name="startingtime"
                  className="border-2 px-[50px] border-black rounded-lg shadow-xl"
                  {...register2("startingtime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.startingtime?.type === "required" &&
                    " Starting time must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Ending Time</label>
                </div>
                <input
                  type="time"
                  name="endingtime"
                  className="border-2 px-[50px] placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register2("endingtime", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.endingtime?.type === "required" &&
                    " End time must be added"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-start pl-3 gap-6 mt-5">
            <div>
              <div>
                <div>
                  <label className="font-bold">Event Address</label>
                </div>
                <input
                  type="text"
                  name="eventaddress"
                  className="border-2 px-1 border-black rounded-lg shadow-xl"
                  {...register2("eventaddress", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.eventaddress?.type === "required" &&
                    "Venue Address must be added"}
                </span>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <label className="font-bold">Ticket Price</label>
                </div>
                <input
                  type="number"
                  name="ticketprice"
                  className="border-2 px-3 placeholder:text-center border-black rounded-lg shadow-xl"
                  {...register2("ticketprice", { required: true })}
                />
                <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
                  {errors2.ticketprice?.type === "required" &&
                    " Ticket price must be added"}
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
              className="border-2 border-black w-[60%] pb-[10%]"
            ></textarea>
            <span className="flex justify-center text-red-600 mb-[-10px] text-xs">
              {errors2.description?.type === "required" &&
                "Must provide a short description about an Event"}
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

      <MyModal9 isvisible={visibleModal} onClose={() => setVisibleModal(false)}>
        {selectedApplicant ? (
          <div>
            <div className="flex justify-around">
              <div>
                <img
                  className="w-auto h-[40vh] rounded-lg"
                  alt="artist"
                  src={`${
                    API_BASE
                  }/${selectedApplicant.appliedBy?.profile_image || ""}`}
                />
              </div>

              <div>
                <h1 className="text-center font-bold text-[28px] text-black">
                  {selectedApplicant.appliedBy?.firstname}{" "}
                  {selectedApplicant.appliedBy?.lastname}
                </h1>

                <div className="flex gap-4 justify-center">
                  <h1 className="uppercase text-[14px] font-medium">
                    {selectedApplicant.appliedBy?.gender}
                  </h1>
                  <h1 className="uppercase text-[14px] font-medium">
                    {selectedApplicant.appliedBy?.address}
                  </h1>
                  <h1 className="uppercase text-[14px] font-medium">
                    {selectedApplicant.appliedBy?.phonenumber}
                  </h1>
                </div>

                <div>
                  <h1 className="flex justify-center gap-2">
                    <p className="uppercase text-[14px] font-medium mt-0.5">
                      Artist Type:
                    </p>
                    {selectedApplicant.appliedBy?.band}
                  </h1>

                  <h1 className="flex justify-center gap-1">
                    <p className="uppercase text-[14px] font-medium mt-0.5">
                      Artist Genre:
                    </p>
                    {selectedApplicant.appliedBy?.genre}
                  </h1>

                  <h1 className="flex justify-center">
                    <p className="uppercase text-[14px] font-medium mt-0.5">
                      Artist Skill:
                    </p>
                    {selectedApplicant.appliedBy?.skill}
                  </h1>

                  <h1 className="flex justify-center">
                    <p className="uppercase text-[14px] font-medium mt-0.5">
                      Experience Level:
                    </p>
                    {selectedApplicant.appliedBy?.expereince}
                  </h1>

                  <h1 className="text-center mt-5">
                    <p className="uppercase text-[14px] font-medium mt-0.5">
                      Artist Description
                    </p>
                    {selectedApplicant.appliedBy?.bio}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-[20%] mt-5">
              <button
                className="bg-blue-600 px-6 py-2 rounded-xl text-white hover:bg-orange-400"
                onClick={() =>
                  acceptHandler(
                    selectedApplicant._id,
                    selectedApplicant.appliedGig?._id || selectedApplicant.appliedGig
                  )
                }
              >
                Accept
              </button>

              <button
                onClick={() => deleteHandler(selectedApplicant._id)}
                className="bg-green-600 px-6 py-2 rounded-xl text-white hover:bg-purple-500"
              >
                Decline
              </button>
            </div>
          </div>
        ) : null}
      </MyModal9>
    </div>
  );
}