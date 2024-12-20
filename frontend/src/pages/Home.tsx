import LayoutWrapper from "../components/wrapper/LayoutWrapper";

import Logo from "../components/reuseables/Logo";
import Button from "../components/reuseables/Button";

import { useEffect, useState } from "react";
import { AssetDTO } from "../components/interface";
import { api, handleError } from "../utils/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { SubHeadingText } from "../components/reuseables/CustomTypographies";
import Reveal from "../components/Animations/Reveal";
import SlideInFromLeft from "../components/Animations/SlideInFromLeft";
import SlideInFromRight from "../components/Animations/SlideInFromRight";
import { handleScrollClick } from "../utils/Scrolling";
import { Helmet } from "react-helmet";

const Home = () => {
  const [apartAssets, setApartAssets] = useState<AssetDTO[]>([]);
  const bgVideo = "/bgVideo.mp4";
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      const { data } = await api.get("/api/v1/apart/get-all-apart-assets");
      if (data?.success) {
        setApartAssets(data?.homepage);
      }
      if (data?.homepage.length <= 0) {
        setApartAssets(data?.AllExceptHomepage);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Jannat Heights",
    description:
      "Luxury fully furnished apartments in Bahria Town Lahore with modern amenities.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Street Address Here",
      addressLocality: "Bahria Town",
      addressRegion: "Punjab",
      postalCode: "53720",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+92-3001508712",
      email: "info@jannatheightsplaza.live",
      availableLanguage: "English",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.jannatheightsplaza.live",
      priceCurrency: "PKR",
      price: "10000", // Assuming this is the starting price
      itemOffered: {
        "@type": "Apartment",
        name: "Furnished Apartment at Jannat Heights",
        numberOfRooms: 1,
        floorSize: {
          "@type": "QuantitativeValue",
          value: 100,
          unitCode: "MTK",
        },
        additionalType: "https://schema.org/FurnishedApartment",
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Fully equipped kitchens",
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Air-conditioned rooms",
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Modern furnishings",
          },
        ],
      },
    },
  };
  return (
    <LayoutWrapper
      title="Jannat Heights - Luxury Furnished Apartments in Bahria Town Lahore"
      description="Discover luxury living at Jannat Heights, Bahria Town Lahore. Fully furnished apartments with modern amenities, equipped kitchens, and air-conditioned rooms. Perfect for residents and visitors seeking comfort and convenience."
      keywords="Jannat Heights, furnished apartments Lahore, rental plaza Bahria Town, luxury apartments, fully equipped kitchens, air-conditioned rooms, Bahria Town Lahore rentals, short-term rentals, long-term rentals"
      author="Jannat Heights - Bahria Town Lahore"
      robots="index, follow"
    >
      <Helmet>
        <meta
          property="og:title"
          content="Jannat Heights - Luxury Furnished Apartments in Bahria Town Lahore"
        />
        <meta
          property="og:description"
          content="Explore the elegance of Jannat Heights in Bahria Town Lahore. Our furnished apartments offer modern living with fully equipped kitchens and air-conditioned comfort."
        />
        <meta
          property="og:image"
          content="https://www.jannatheightsplaza.live/jh192.png"
        />
        <meta property="og:url" content="https://www.jannatheightsplaza.live" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Jannat Heights - Luxury Furnished Apartments in Bahria Town Lahore"
        />
        <meta
          name="twitter:description"
          content="Find your perfect home at Jannat Heights in Bahria Town Lahore. Luxurious, fully furnished apartments with all modern amenities."
        />
        <meta
          name="twitter:image"
          content="https://www.jannatheightsplaza.live/jh512.png"
        />
        <meta
          name="twitter:url"
          content="https://www.jannatheightsplaza.live"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <>
        <Reveal>
          <div className=" flex flex-col h-[90vh] w-full overflow-hidden">
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
                <p className=" font-accent tracking-widest text-secondary xs:text-lg sm:text-xl  md:text-2xl lg:text-3xl text-center w-full ">
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
          </div>
        </Reveal>
        {/* Here comes the Appartments page */}

        <div
          id="apartment-section"
          className="   my-[4vh] flex flex-col justify-center items-center mx-auto w-full min-h-[70vh]  sm:gap-2 "
        >
          <p
            id="apartment-heading"
            className=" text-2xl md:text-4xl font-bold  font-heading  text-center w-full "
          >
            Studio Apartments
          </p>

          <div className="w-full flex flex-col md:flex-row items-center sm:gap-4">
            <SlideInFromLeft className=" w-4/5 md:w-1/2">
              {apartAssets?.length > 0 ? (
                <div className="  flex justify-center   my-0 xl:my-4">
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
                    className="  w-11/12 z-10 shadow-2xl  "
                  >
                    {apartAssets.map((file) => (
                      <div className="w-full  h-[41vw] md:h-[26vw] overflow-hidden">
                        {file.type === "photo" ? (
                          <img
                            className="size-full object-cover"
                            src={file.link}
                            alt=""
                          />
                        ) : (
                          <video className=" object-cover  rounded-sm" controls>
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
            </SlideInFromLeft>
            <SlideInFromRight className="w-4/5 md:w-1/2 ">
              <div className=" items-center  px-[6vw] md:py-[4vh] lg:py-[7vh] xl:py-[10vh] flex flex-col gap-4  text-center align-middle">
                <p className=" text-main md:text-2xl font-bold text-primary  w-full">
                  One Bedroom Studio
                </p>
                <p className=" text-main md:text-xl text-seondary   w-full">
                  Stunning fully furnished studio apartment - everything you
                  need to settle in seamlessly. No need to worry about furniture
                  shopping or appliance deliveries – we've got you covered.
                </p>
                <Button
                  onClick={() => navigate("/apartments")}
                  variant="primary"
                  className=" w-2/4 text-white font-accent bg hover:bg-opacity-70 "
                >
                  Book Now
                </Button>
                <Button
                  onClick={() => navigate("/apartments")}
                  className="w-2/4 bg-primary hover:text-white bg-opacity-0 hover:bg-opacity-10 text-primary font-accent border-primary border-2"
                >
                  View More
                </Button>
              </div>
            </SlideInFromRight>
          </div>
        </div>
      </>
    </LayoutWrapper>
  );
};

export default Home;
