import React from "react";
import NavigationPageForAdmin from "./NavigationPageForAdmin";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function DetailsOfRestaurant() {
  //
  // for getting the booking details
  const [bookingArray, setBookingArray] = useState([]);
  const bookingdetails = async () => {
    const bookingdetail = await axios.get(
      `https://nepal-groove-backend-hrxj.vercel.app/api/ruser`
    );
    const data = bookingdetail.data.fname;
    console.log(data, "chalfal");
    setBookingArray(data);
  };
  console.log(bookingArray, "dami ma");
  useEffect(() => {
    bookingdetails();
  }, []);

  const columns = [
    //

    {
      title: "Name",
      dataIndex: "firstname",
      key: "firstname",
      width: "auto",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "auto",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phonenumber",
      key: "phonenumber",
      width: "auto",
    },
    {
      title: "DOB",
      dataIndex: "date",
      key: "date",
      width: "auto",
    },
  ];
  const data = [];
  for (let i = 0; i < bookingArray.length; i++) {
    data.push({
      key: i,
      firstname: bookingArray[i].firstname,
      address: bookingArray[i]?.address,
      phonenumber: bookingArray[i]?.phonenumber,
      date: bookingArray[i]?.date,
    });
  }
  return (
    <div className="bg-black">
      <div>
        <NavigationPageForAdmin />
      </div>
      <div>
        <h1 className="font-bold text-[35px]  text-orange-600 mt-5 text-center">
          Registered Venue Providers
        </h1>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          scroll={{
            x: 1000,
          }}
          pagination={{ pageSize: 6 }} // 4 rows per page
          // onChange={onChange}
          className="ml-[30px] mr-[30px] mt-[20px] "
        />
      </div>
      <Link to="/dashadmin">
        <div className="text-center">
          <button className=" mb-[240px] px-5 py-1 bg-blue-400 rounded-xl hover:bg-orange-600 hover:text-white ">
            Back To DashBoard
          </button>
        </div>
      </Link>
      <div>
        <h1>s</h1>
      </div>
    </div>
  );
}
