import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import {
  GenerealText,
  HeadingText,
  SubHeadingText,
} from "../components/reuseables/CustomTypographies";
import { api, handleError } from "../utils/axios";
import { useEffect, useState } from "react";
import { ApartDTO, AssetDTO } from "../components/interface";
import Loading from "../components/reuseables/Loading";
import Button from "../components/reuseables/Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { handleScrollClick } from "../utils/Scrolling";
import InputField from "../components/reuseables/InputField";
import { useNavigate } from "react-router-dom";
const Apartments = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allAparts, setAllAparts] = useState<ApartDTO[]>([]);
  const [apartAssets, setApartAssets] = useState<AssetDTO[]>([]);
  // for the booking of apartment
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openBooking, setOpenBooking] = useState<ApartDTO | null>(null);

  const getAssets = async () => {
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
          {/* The aprartment show case section */}
          <div className=" flex flex-col-reverse md:flex-row gap-4  items-center mx-auto md:mr-[6vw]">
            <div className=" items-center  md:px-[8vh] xl:px-[20vh] lg:px-[12vh] md:py-[4vh] lg:py-[7vh] xl:py-[10vh] w-4/5 md:w-1/2 flex flex-col gap-4  text-center align-middle">
              <p className=" text-main md:text-2xl font-bold text-primary  w-full">
                What we Have For You?
              </p>

              <ol className=" text-start list-disc marker:text-primary  pl-4">
                {" "}
                <li>
                  <GenerealText className="font-bold" text="Fully Furnised" />
                </li>
                <li>
                  <GenerealText className="font-bold" text="Airy and Modern" />
                </li>
                <li>
                  <GenerealText
                    className="font-bold"
                    text="High Class Comfortable furniture"
                  />
                </li>
                <li>
                  <GenerealText className="font-bold" text="Tv lounge" />
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
                className=" bg-opacity-5 hover:text-white my-4"
              >
                See Available Options
              </Button>
            </div>
            {apartAssets?.length > 0 ? (
              <div className=" w-4/5 md:w-1/2  items-center overflow-hidden  flex  shadow-2xl my-0 xl:my-4">
                <Carousel
                  responsive={{
                    all: {
                      breakpoint: { max: 4000, min: 0 },
                      items: 1,
                    },
                  }}
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  ssr={false} //
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  dotListClass="custom-dot-list-style"
                  // the only thing that had pissed me off is this classname w-full property and wihtout this  the carousel wont render
                  className=" w-full z-10 "
                >
                  {apartAssets.map((file) => (
                    <div className="w-full  h-[45vW] md:h-[26vw] overflow-hidden">
                      {file.type === "photo" ? (
                        <img
                          className="size-full object-cover"
                          src={file.link}
                          alt=""
                        />
                      ) : (
                        <video className="size-full object-cover  " controls>
                          <source src={file.link} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            ) : (
              <SubHeadingText text="No Photos to show" />
            )}
          </div>

          {/* THis shows the available options */}
          <div
            id="available-options"
            className=" flex flex-col gap-4 my-4 p-2 md:p-8 justify-center"
          >
            <SubHeadingText
              text="Available Options"
              className="text-primary  font-bold w-full text-center"
            />
            <table className="border-accent border-2  font-main text-xs md:text-lg ">
              <thead>
                <tr className="  text-center ">
                  <th className="py-4">Sr #</th>
                  <th>Apart #</th>
                  <th>Floor</th>
                  <th>Rent(PKR)</th>
                  <th>Status</th>
                  <th>Booking</th>
                </tr>
              </thead>
              <tbody>
                {allAparts.length > 0 &&
                  allAparts.map((apart, i) => {
                    return (
                      <tr className=" text-center">
                        <td className="font-bold py-3">{i + 1}</td>
                        <td>{apart.no}</td>
                        <td>{apart.floor}</td>
                        <td>{apart.rent}</td>
                        <td
                          className={` font-bold ${
                            apart.status === "Available"
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {apart.status}
                        </td>
                        <td className="flex justify-center">
                          <Button
                            onClick={() => {
                              if (!loggedIn) {
                                navigate("/login");
                              } else if (
                                (loggedIn && userData?.role === "admin") ||
                                "manager"
                              ) {
                                navigate("/private/r2/bookings");
                              } else setOpenBooking(apart);
                            }}
                            variant={
                              apart?.status === "Available"
                                ? "primary"
                                : "danger"
                            }
                            className=" text-white"
                          >
                            {apart.status === "Available"
                              ? "Book now"
                              : "Pre Book"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* First of all i need to make a modal for the purpose of the overlay */}
          {/* if the admin or the manager clicks this button then send them to the manage bookings page on the dashboard */}
          {/* only allow the logged in and the verified users to make  booking */}
          {/* Then i need to make a functionlaity to make the booking of the apartment if it is available */}
          {/* If the apartment is not available then go for the prebooking */}
          {/* Add a popup animation in this */}
          {openBooking !== null && (
            <div className=" z-50 backdrop-blur-sm  fixed top-0 left-0  h-screen flex  justify-center items-center w-full">
              <div className=" w-1/2 bg-white  border-primary border-2 rounded-md  p-4 gap-4">
                <div className="flex  justify-between gap-4">
                  <InputField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setStartDate(e.target.value)
                    }
                    containerClass="w-1/2"
                  />
                  <InputField
                    value={endDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEndDate(e.target.value)
                    }
                    label="End Date"
                    type="date"
                    containerClass="w-1/2"
                  />
                </div>

                <Button
                  onClick={() => {
                    setOpenBooking(null);
                  }}
                  variant="primary"
                  className="bg-opacity-10  hover:text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </LayoutWrapper>
  );
};

export default Apartments;
