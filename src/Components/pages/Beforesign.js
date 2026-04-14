import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import background from "../../Images/bglogin.jpg";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import MobileNav from "../pages/LandingPage/MobileNav";
import Modal from "../../Components/pages/modals/Modal";
import { BsInstagram } from "react-icons/bs";
import { SiTwitter, SiFacebook } from "react-icons/si";
export default function Beforesignin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toogleNavbar = () => {
    setOpen(!open);
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  return (
    <div>
      <div className="flex justify-between sticky  top-0 bg-black bg-opacity-90  z-10">
        <Link to="/">
          <div>
            <img
              alt="photooflanding"
              className="h-[10vh] w-auto md:h-[7vh]  "
              src={require("../../Images/footerlogo.png")}
            />
          </div>
        </Link>
        <div className="flex items-center gap-20">
          <Link to="/login">
            <p className="  hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer  font-bold text-[15px]  items-center text-center text-white ">
              Find Artists
            </p>
          </Link>
          <Link to="/login">
            <p className=" hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer font-bold text-[15px]   items-center text-center text-white ">
              Find Gigs
            </p>
          </Link>
          <Link to="/login">
            <p className="  hover:border-orange-600 hover:border-b-2  md:hidden cursor-pointer  font-bold text-[15px]  items-center text-center text-white  ">
              Find Shows
            </p>
          </Link>
        </div>
        <div className="flex  space-x-10 items-center ">
          <Link to="/login">
            <button
              className="border-white font-semibold hover:bg-orange-600 md:hidden px-2 hover:rounded-xl py-1 text-[15px] text-white"
              size="medium"
            >
              Log In
            </button>
          </Link>
          <Link to="/beforesign">
            <button className="border-white font-semibold text-[15px] hover:bg-orange-600 md:hidden px-2 py-1 hover:rounded-xl text-white ">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="hidden md:block text-white text-2xl sticky top-0 z-12 ">
          <button onClick={toogleNavbar}>
            {open ? <RxCross1 /> : <RxHamburgerMenu />}
          </button>
        </div>

        {/*  */}
      </div>
      {open && (
        <div className="hidden md:block md:text-center border-t-2 z-20 fixed w-[100vw] bg-black h-full   ">
          <MobileNav />
        </div>
      )}

      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "93vh",
        }}
      >
        <div className="flex justify-around flex-wrap items-center h-full  ">
          <div className="rounded-lg hover:drop-shadow-3xl ">
            <div className="bg-white  rounded-lg hover:drop-shadow-3xl px-1 ">
              <h3 className=" text-center text-2xl text-[#B3B63A]">Artist</h3>
              <hr className="border-1 border-red-400 pb-5" />
              <p className=" text-[18px]  text-center">
                Want to Gig and Industry <br /> exposure
              </p>
              <Link to="/signup?role=artist">
                <button className="text-[15px] bg-orange-600 w-full mt-3 rounded-md hover:bg-black hover:text-white">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className=" ">
            <div className="bg-white rounded-lg hover:drop-shadow-3xl px-1 ">
              <h3 className=" text-center text-2xl text-[#B3B63A]">
                Restaurant
              </h3>
              <hr className="border-1 border-red-400 pb-5" />
              <p className=" text-[18px]  text-center">
                Want to find musical <br />
                bands and book for live
                <br /> music performance
              </p>
              <Link to="/signup?role=restaurant">
                <button className="text-[15px] rounded-md hover:bg-black hover:text-white bg-orange-600 w-full mt-3">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="bg-white rounded-lg hover:drop-shadow-3xl px-1 ">
              <h3 className=" text-center text-2xl text-[#B3B63A]">viewer</h3>
              <hr className="border-1 border-red-400 pb-5" />
              <p className=" text-[18px]  text-center">
                Want to find live music
                <br /> shows and buy tickets of it
              </p>
              <Link to="/signup?role=viewer">
                <button className="text-[15px] rounded-md hover:bg-black hover:text-white bg-orange-600 w-full mt-3">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* modal for about us */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-[30px] text-black text-center">About Us</h1>
        <p className="text-black">
          Welcome to NepalGroove? - A Journey of Solo Innovation Greetings and a
          warm embrace to all our esteemed visitors! We are thrilled to have you
          here at NepalGroove, a project that bears the heart and soul of a
          passionate individual - me! A Personal Quest: During my final year, as
          the world around me buzzed with excitement and anticipation, I
          embarked on a personal quest to leave a lasting mark on the digital
          landscape. Fuelled by an insatiable curiosity and a love for
          technology, I set out to build something extraordinary - a website
          that would be a testament to my skills, knowledge, and unwavering
          determination. A Journey of Passion: The journey of crafting this
          website was more than just lines of code; it was an odyssey of passion
          and creativity. Every late-night session and every hurdle I overcame
          made me believe in the beauty of solo innovation. I poured my heart
          into every pixel, every line of code, and every design element,
          ensuring that this platform would resonate with its visitors in a
          meaningful way. The Purpose and Vision: NepalGroove was born from my
          desire to create a space where the restuarants can be able to seek the
          new and talented bands from this platform to perform into their venue
          also the band can seek and apply for the available gig published by
          the restaurantes. This platform holds a special place in my heart, and
          I truly believe it has the power to make a positive impact on the
          lives of those who visit it. Challenges and Triumphs: The journey was
          not without its challenges. I encountered roadblocks that tested my
          resolve and demanded innovative solutions. But with unwavering
          determination, I embraced these challenges as opportunities for
          growth. Every triumph over a hurdle reaffirmed my belief in the
          potential of one individual's dedication. Gratitude and
          Acknowledgments: I would be remiss if I didn't express my heartfelt
          gratitude to the mentors, professors, and friends who supported and
          guided me throughout this endeavor. Their encouragement and wisdom
          were invaluable, propelling me forward when the path seemed uncertain.
          Join the Journey: As we set forth on this journey of solo innovation,
          I invite you, our esteemed visitors, to explore NepalGroove and
          immerse yourself in the passion and dedication that gave it life. Your
          feedback, suggestions, and support are the pillars that will
          strengthen this platform and shape its future. Thank you for being a
          part of this extraordinary adventure. Together, let's pave the way for
          innovation, one keystroke at a time. With heartfelt gratitude,
          <br /> Suresh Lama Founder & Creator, NepalGroove
        </p>
      </Modal>

      {/* modal for how it wokrs */}
      <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
        <h1 className="text-[30px] text-black text-center">NepalGroove</h1>
        <p className="text-black ">
          Sign Up and Profile Creation:
          <br />
          1.Restaurants and Musicians interested in live music gigs can sign up
          on NepalGroove by providing basic information and creating a profile.
          <br />
          2.Restaurants will specify their venue details, preferred genres,
          available dates, and any other relevant information.
          <br />
          3.Musicians will create profiles showcasing their talents, genre
          preferences, performance videos, and availability.
          <br />
          Browse and Search:
          <br />
          1.Restaurants can browse through a curated list of talented musicians
          registered on the platform.
          <br />
          2.Musicians can explore a list of restaurants that offer live music
          gigs, filtered by location, genre, and available dates.
          <br />
          Posting Gigs:
          <br />
          1.Restaurants can create gig postings, detailing the date, time,
          genre, and any specific requirements for the performance.
          <br />
          2.Restaurants may include information about payment terms, sound
          equipment availability, and any additional perks they offer to
          musicians.
          <br />
          Applying for Gigs:
          <br />
          1.Musicians can browse through available gig postings and apply for
          the ones that match their genre and availability.
          <br />
          2.When applying, musicians can provide a brief introduction, links to
          their previous performances, and any other relevant information.
          <br />
          Review and Selection:
          <br />
          1.Restaurants have access to musicians' profiles and previous
          performances, helping them evaluate applicants.
          <br />
          2.Musicians are notified of their selection status, and once selected,
          they can confirm their participation.
          <br />
          Coordination and Communication:
          <br />
          1.NepalGroove provides a messaging platform for restaurants and
          musicians to communicate and discuss gig details.
          <br />
          2.Restaurants and musicians can discuss performance logistics, sound
          arrangements, and any other necessary arrangements.
          <br />
          Live Performances:
          <br />
          1.On the scheduled date, the musician performs live at the restaurant,
          enhancing its ambiance and attracting customers.
          <br />
          2.The restaurant provides the agreed-upon payment and any additional
          perks promised in the gig posting.
          <br />
          Feedback and Ratings:
          <br />
          1.After the gig, both parties can provide feedback and ratings to each
          other, helping build a reliable and credible community.
          <br />
          Repeat Engagements:
          <br />
          1.Restaurants and musicians can build lasting relationships through
          the platform, leading to future gig opportunities.
          <br />
          2.NepalGroove fosters a vibrant community of live music enthusiasts,
          promoting talent and enriching the restaurant experience.
          <br />
          Support and Assistance:
          <br />
          1.NepalGroove offers customer support to address any issues or queries
          from restaurants or musicians promptly.
          <br />
          2.The platform continuously improves its features based on user
          feedback to ensure a seamless experience for all users.
          <br />
        </p>
      </Modal>
    </div>
  );
}
