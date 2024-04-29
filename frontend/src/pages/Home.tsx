import LayoutWrapper from "../components/wrapper/LayoutWrapper";

import Logo from "../components/reuseables/Logo";
import Button from "../components/reuseables/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AssetDTO } from "../components/interface";
import { api, handleError } from "../utils/axios";

const Home = () => {
  const [apartAssets, setApartAssets] = useState<AssetDTO[]>([]);
  const bgVideo = "/bgVideo.mp4";

  const handleScrollClick = (targetSection: string) => {
    const element: HTMLElement | null = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Element not found!");
    }
  };

  const fetchAssets = async () => {
    try {
      const { data } = await api.get("/api/v1/asset/get-all-apart-assets");
      if (data?.success) {
        setApartAssets(data?.homepage);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const responsive = {};
  useEffect(() => {
    fetchAssets();
  }, []);
  return (
    <LayoutWrapper>
      <>
        <motion.div
          variants={{
            hidden: { y: "-10vh", opacity: 0 },
            show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
          }}
          initial="hidden"
          animate="show"
          className=" relative flex-col  h-[80vh] w-full overflow-hidden"
        >
          <video
            className=" object-cover size-full "
            src={bgVideo}
            muted
            autoPlay
            loop
          />
          <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-full h-full bg-opacity-20 bg-blend-screen">
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 w-4/5 md:w-3/5 max-h-1.5/5 md:max-h-2/5 bg-blend-screen  rounded-md flex-col gap-2 p-[3vh]  ">
              <div className=" flex justify-center gap-2  mb-[2vh]">
                <p className="text-secondary align-middle xs:text-lg  sm:text-3xl md:text-4xl lg:text-5xl font-heading">
                  Welcome to
                </p>
                <Logo className="xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl" />
              </div>
              <p className=" text-secondary xs:text-lg sm:text-xl  md:text-2xl lg:text-3xl font-heading  text-center w-full ">
                Rent a Home, Away from Home
              </p>
              <Button
                className=" text-xs md:text-xl w-35 md:w-45 font-extrabold mx-auto mt-[4vh] hover:bg-opacity-70  text-white  font-accent rounded-md border-primary  border-2 mb-0 "
                type="button"
                variant="primary"
                onClick={() => handleScrollClick("apartment-heading")}
              >
                Explore More
              </Button>
            </div>
          </div>
        </motion.div>
        {/* Here comes the Appartments page */}
        <motion.div
          id="apartment-section"
          className="flex-col gap-4 m-[4vh] min-h-[70vh]"
        >
          <p
            id="apartment-heading"
            className=" text-2xl md:text-4xl font-bold  font-heading  text-center w-full"
          >
            Studio Apartments
          </p>

          <div className=" mx-auto flex">
            <div className="w-1/2  items-center flex ">
              {apartAssets.map((file) => (
                <div className="bg-secondary z-50 w-full h-full">
                  {file.type === "photo" ? (
                    <img src={file.link} alt="" />
                  ) : (
                    <video className="  rounded-sm" controls>
                      <source src={file.link} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
            <div className=" items-center md:px-[8vh] xl:px-[20vh] lg:px-[12vh] md:py-[4vh] lg:py-[7vh] xl:py-[10vh] w-1/2 flex flex-col gap-4  text-center align-middle">
              <p className=" text-main md:text-2xl font-bold text-primary  w-full">
                One Bedroom Studio
              </p>
              <p className=" text-main md:text-xl text-seondary   w-full">
                Stunning fully furnished studio apartment - everything you need
                to settle in seamlessly. No need to worry about furniture
                shopping or appliance deliveries – we've got you covered.
              </p>
              <Button
                variant="primary"
                className=" w-2/4 text-white font-accent bg hover:bg-opacity-70 "
              >
                Book Now
              </Button>
              <Button className="w-2/4 bg-primary hover:text-white bg-opacity-0 hover:bg-opacity-10 text-primary font-accent border-primary border-2">
                View More
              </Button>
            </div>
          </div>
        </motion.div>
      </>
    </LayoutWrapper>
  );
};

export default Home;
