import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import {
  GenerealText,
  HeadingText,
  SubHeadingText,
} from "../components/reuseables/CustomTypographies";
import { api, handleError, protectedApi } from "../utils/axios";
import React, { useEffect, useState } from "react";
import { ApartDTO, AssetDTO } from "../components/interface";
import Loading from "../components/reuseables/Loading";
import Button from "../components/reuseables/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { handleScrollClick } from "../utils/Scrolling";
import { DateRange } from "react-date-range";
import type { RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import LoginNowModel from "../components/reuseables/LoginNowModel";
import RevealBottom from "../components/Animations/RevealBottom";
import toast from "react-hot-toast";

const Apartments = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allAparts, setAllAparts] = useState<ApartDTO[]>([]);
  const [apartAssets, setApartAssets] = useState<AssetDTO[]>([]);
  const [updateFirst, setUpdateFirst] = useState<Boolean>(false);

  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [totalDays, setTotalDays] = useState<number>(1);
  const [openBooking, setOpenBooking] = useState<ApartDTO | null>(null);

  const [openLoginNow, setOpenLoginNow] = useState(false);
  const [seeAvailable, setSeeAvailable] = useState(false);

  const [amount, setAmount] = useState<number>();
  const [pmeathod, setPmeathod] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const getAssets = async () => {
    const closeModal = () => {
      setOpenLoginNow(false);
    };

    setLoading(true);
    try {
      const { data } = await api.get("/api/v1/apart/get-all-apart-assets");
      if (data?.success) {
        setLoading(false);
        setApartAssets(data?.allAssets);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };
  const fetchAparts = async () => {
    try {
      const { data } = await api.get("/api/v1/apart/get-all-aparts");
      if (data?.success) {
        setAllAparts(data?.allAparts);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const calculateDays = () => {
    setSeeAvailable(true);

    if (dates[0]?.startDate && dates[0]?.endDate) {
      const date1 = new Date(dates[0]?.startDate).getTime();
      const date2 = new Date(dates[0]?.endDate).getTime();
      const time = Math.abs(date2 - date1);
      const days = Math.ceil(time / (1000 * 60 * 60 * 24));
      setAmount(days * Number(openBooking?.rent));
      setTotalDays(days);
    }
  };

  const MakeBooking = async () => {
    try {
      if (!userData?.CNIC || !userData?.phone || !userData?.verifiedEmail) {
        return setUpdateFirst(true);
      }
      if (pmeathod === "advance" && !receipt) {
        return toast.error("Receipt is required for advance booking");
      }
      if (totalDays <= 0) {
        return toast.error("Select at least one night");
      }
      if (!userData?._id) {
        return toast.error(
          "Could not fetch user info. Please login again and try later"
        );
      }
      const bookingData = new FormData();
      bookingData.append("customerId", userData?._id as string);
      bookingData.append("apartment", openBooking?._id as string);
      bookingData.append(
        "startDate",
        dates[0]?.startDate ? dates[0]?.startDate.toDateString() : ""
      );
      bookingData.append(
        "endDate",
        dates[0]?.endDate ? dates[0]?.endDate.toDateString() : ""
      );
      bookingData.append("payment_meathod", pmeathod ? pmeathod : "");
      bookingData.append("receipt", receipt ? receipt : "");
      bookingData.append("amount", amount ? amount.toString() : "");

      const { data } = await protectedApi.post(
        "/api/v1/apart/make-booking",
        bookingData
      );
      if (data?.success) {
        toast.success("Booking request sent. You will be confirmed shortly.");
        setOpenBooking(null);
        setTotalDays(0);
        setSeeAvailable(false);
        setDates([
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAparts();
    getAssets();
  }, []);

  return (
    <LayoutWrapper>
      <div className="w-full text-center py-4">
        <HeadingText text="Studio Apartment" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col-reverse md:flex-row gap-4 items-center mx-auto md:mr-[6vw]">
            <div className="items-center md:px-[8vh] xl:px-[20vh] lg:px-[12vh] md:py-[4vh] lg:py-[7vh] xl:py-[10vh] w-4/5 md:w-1/2 flex flex-col gap-4 text-center align-middle">
              <p className="text-main md:text-2xl font-bold text-primary w-full">
                What we have for you?
              </p>
              <ol className="text-start list-disc marker:text-primary pl-4">
                <li>
                  <GenerealText className="font-bold" text="Fully Furnished" />
                </li>
                <li>
                  <GenerealText className="font-bold" text="Airy and Modern" />
                </li>
                <li>
                  <GenerealText
                    className="font-bold"
                    text="High Class Comfortable Furniture"
                  />
                </li>
                <li>
                  <GenerealText className="font-bold" text="TV Lounge" />
                </li>
                <li>
                  <GenerealText
                    className="font-bold"
                    text="Fully Equipped Kitchen"
                  />
                </li>
              </ol>
              <Button
                variant="primary"
                onClick={() => handleScrollClick("available-options")}
                className="bg-opacity-5 hover:text-white my-4"
              >
                See Available Options
              </Button>
            </div>
            {apartAssets?.length > 0 ? (
              <div className="w-4/5 md:w-1/2 items-center overflow-hidden flex shadow-2xl my-0 xl:my-4">
                <Carousel
                  responsive={{
                    all: {
                      breakpoint: { max: 4000, min: 0 },
                      items: 1,
                    },
                  }}
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  ssr={false}
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  dotListClass="custom-dot-list-style"
                  className="w-full z-10"
                >
                  {apartAssets.map((file, index) => (
                    <div
                      key={index}
                      className="w-full h-[45vw] md:h-[26vw] overflow-hidden"
                    >
                      {file.type === "photo" ? (
                        <img
                          className="w-full h-full object-cover"
                          src={file.link}
                          alt=""
                        />
                      ) : (
                        <video className="w-full h-full object-cover" controls>
                          <source src={file.link} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : (
              <SubHeadingText text="No Photos to Show" />
            )}
          </div>

          <div
            id="available-options"
            className="flex flex-col gap-4 my-4 p-2 md:p-8 justify-center"
          >
            <SubHeadingText
              text="Available Options"
              className="text-primary font-bold w-full text-center"
            />
            <LoginNowModel
              isOpen={openLoginNow}
              onClose={() => {
                setOpenLoginNow(false);
              }}
            />
            <table className="border-accent border-2 font-main text-xs md:text-lg w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-2 border border-accent">Sr#</th>
                  <th className="p-2 border border-accent">Apart #</th>
                  <th className="p-2 border border-accent">Rent (PKR)</th>
                  <th className="p-2 border border-accent">Floor</th>
                  <th className="p-2 border border-accent">Book Now</th>
                </tr>
              </thead>
              <tbody>
                {allAparts.map((apart, index) => (
                  <tr key={index} className="text-primary group duration-300">
                    <td className="p-2 border border-accent">{index + 1}</td>
                    <td className="p-2 border border-accent">{apart.no}</td>
                    <td className="p-2 border border-accent">{apart.rent}</td>
                    <td className="p-2 border border-accent">{apart.floor}</td>

                    <td className="p-2 border border-accent flex justify-center items-center">
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (!userData?._id) {
                            setOpenLoginNow(true);
                            return;
                          }
                          setOpenBooking(apart);
                          calculateDays();
                        }}
                        className="opacity-70 group-hover:opacity-100  text-white duration-300"
                      >
                        Book Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {openBooking !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-11/12 md:w-1/2 bg-white shadow-2xl border-2 border-opacity-20 border-accent rounded-md p-6 relative max-h-screen overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setOpenBooking(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <SubHeadingText
                className="w-full text-center font-bold"
                text="Selected Apartment"
              />
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2">Apart #</th>
                    <th>Floor</th>
                    <th>Rent per day (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">{openBooking.no}</td>
                    <td>{openBooking.floor}</td>
                    <td>{openBooking?.rent}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center gap-4 my-4">
              <DateRange
                ranges={dates}
                minDate={new Date()}
                onChange={(ranges: RangeKeyDict) => {
                  const { selection } = ranges;
                  setDates([selection]);
                }}
              />
            </div>
            <Button
              variant="primary"
              className="w-fit mx-auto bg-opacity-20 hover:text-white"
              onClick={calculateDays}
            >
              Calculate Details
            </Button>
            {seeAvailable && (
              <div className="w-full flex flex-col gap-3 mt-4">
                <div className="flex gap-2 w-full justify-center">
                  <SubHeadingText
                    className="text-primary font-bold"
                    text={"Total Nights ="}
                  />
                  <SubHeadingText
                    className="font-bold"
                    text={` ${totalDays}`}
                  />
                </div>
                <div className="flex gap-2 w-full justify-center">
                  <SubHeadingText
                    text={`Total Rent (${totalDays} X ${Number(
                      openBooking?.rent
                    )}) =`}
                  />
                  <SubHeadingText
                    className="font-bold"
                    text={`Rs ${totalDays * Number(openBooking?.rent)}`}
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <SubHeadingText text="Select Payment Method" />
                  <select
                    value={pmeathod}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setPmeathod(e.target.value);
                    }}
                    className="w-fit bg-accent bg-opacity-10 border-accent border-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="advance">Advance</option>
                    <option value="on_check_in">On Check-in</option>
                  </select>
                </div>
                {pmeathod === "advance" && (
                  <RevealBottom delay={0}>
                    <div className="p-4 flex flex-col w-5/6 md:w-4/6 border-2 border-opacity-20 border-accent mx-auto rounded-md">
                      <div className="flex justify-evenly w-full">
                        <SubHeadingText
                          className="font-bold text-primary"
                          text="Jazzcash"
                        />
                        <SubHeadingText
                          className="font-bold"
                          text="03333333333"
                        />
                      </div>
                      <div className="flex justify-evenly w-full">
                        <SubHeadingText
                          className="font-bold text-primary"
                          text="EasyPaisa"
                        />
                        <SubHeadingText
                          className="font-bold"
                          text="03333333333"
                        />
                      </div>
                      <div className="flex justify-evenly w-full">
                        <SubHeadingText
                          className="font-bold text-primary"
                          text="Meezan Bank"
                        />
                        <SubHeadingText
                          className="font-bold"
                          text="03333333333"
                        />
                      </div>
                      <SubHeadingText
                        className="text-danger text-center"
                        text="Make an advance payment and attach the receipt below to book your apartment"
                      />
                      <input
                        type="file"
                        id="upload-receipt"
                        accept="image/*"
                        hidden
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target?.files && e.target?.files[0]) {
                            setReceipt(e.target?.files[0]);
                          }
                        }}
                      />
                      {receipt && (
                        <div className="w-full overflow-hidden">
                          <img
                            className="object-cover"
                            src={URL.createObjectURL(receipt)}
                            alt={receipt.name}
                          />
                        </div>
                      )}
                      <Button
                        variant="success"
                        className="bg-opacity-30 text-white mt-2"
                        onClick={() =>
                          document.getElementById("upload-receipt")?.click()
                        }
                      >
                        {receipt ? receipt?.name : "Upload Photo"}
                      </Button>
                    </div>
                  </RevealBottom>
                )}
              </div>
            )}
            <div className="flex gap-3 justify-end mt-4">
              <Button
                onClick={() => {
                  setOpenBooking(null);
                  setTotalDays(0);
                  setSeeAvailable(false);
                  setDates([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    },
                  ]);
                }}
                variant="primary"
                className="bg-opacity-10 hover:text-white"
              >
                Close
              </Button>
              <Button
                onClick={MakeBooking}
                variant="primary"
                className="text-white"
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      )}
      {updateFirst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl  mb-6 text-gray-800">
              Please Complete Your Profile First
            </h2>
            <h6 className="text-danger font-light mb-6 text-sm">
              Phone # and CNIC must be added
            </h6>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUpdateFirst(false)}
                className="bg-danger text-white px-6 py-2 rounded-lg hover:bg-danger focus:outline-none transition duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigate("/private/change-information");
                  setUpdateFirst(false);
                }}
                className="bg-success text-white px-6 py-2 rounded-lg hover:bg-success focus:outline-none transition duration-200"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default Apartments;
