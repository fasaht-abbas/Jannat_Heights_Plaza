"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutWrapper_1 = __importDefault(require("../components/wrapper/LayoutWrapper"));
const Logo_1 = __importDefault(require("../components/reuseables/Logo"));
const Button_1 = __importDefault(require("../components/reuseables/Button"));
const react_1 = require("react");
const axios_1 = require("../utils/axios");
const react_multi_carousel_1 = __importDefault(require("react-multi-carousel"));
require("react-multi-carousel/lib/styles.css");
const react_router_dom_1 = require("react-router-dom");
const CustomTypographies_1 = require("../components/reuseables/CustomTypographies");
const Reveal_1 = __importDefault(require("../components/Animations/Reveal"));
const SlideInFromLeft_1 = __importDefault(require("../components/Animations/SlideInFromLeft"));
const SlideInFromRight_1 = __importDefault(require("../components/Animations/SlideInFromRight"));
const Scrolling_1 = require("../utils/Scrolling");
const Home = () => {
    const [apartAssets, setApartAssets] = (0, react_1.useState)([]);
    const bgVideo = "/bgVideo.mp4";
    const navigate = (0, react_router_dom_1.useNavigate)();
    const fetchAssets = async () => {
        try {
            const { data } = await axios_1.api.get("/api/v1/apart/get-all-apart-assets");
            if (data?.success) {
                setApartAssets(data?.homepage);
            }
            if (data?.homepage.length <= 0) {
                setApartAssets(data?.AllExceptHomepage);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchAssets();
    }, []);
    return (<LayoutWrapper_1.default>
      <>
        <Reveal_1.default>
          <div className=" flex flex-col h-[90vh] w-full overflow-hidden">
            <video className=" object-cover size-full " src={bgVideo} muted autoPlay loop/>
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary w-full h-full bg-opacity-20 bg-blend-screen">
              <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 w-4/5 md:w-3/5 max-h-1.5/5 md:max-h-2/5 bg-blend-screen  rounded-md flex-col gap-2 p-[3vh]  ">
                <div className=" flex justify-center gap-2  mb-[2vh]">
                  <p className="text-secondary align-middle xs:text-lg  sm:text-3xl md:text-4xl lg:text-5xl font-heading">
                    Welcome to
                  </p>
                  <Logo_1.default className="xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl"/>
                </div>
                <p className=" font-accent tracking-widest text-secondary xs:text-lg sm:text-xl  md:text-2xl lg:text-3xl text-center w-full ">
                  Rent a Home, Away from Home
                </p>
                <Button_1.default className=" text-xs md:text-xl w-35 md:w-45 font-extrabold mx-auto mt-[4vh] hover:bg-opacity-70  text-white  font-accent rounded-md border-primary  border-2 mb-0 " type="button" variant="primary" onClick={() => (0, Scrolling_1.handleScrollClick)("apartment-heading")}>
                  Explore More
                </Button_1.default>
              </div>
            </div>
          </div>
        </Reveal_1.default>
        {/* Here comes the Appartments page */}

        <div id="apartment-section" className="   my-[4vh] flex flex-col justify-center items-center mx-auto w-full min-h-[70vh]  sm:gap-2 ">
          <p id="apartment-heading" className=" text-2xl md:text-4xl font-bold  font-heading  text-center w-full ">
            Studio Apartments
          </p>

          <div className="w-full flex flex-col md:flex-row items-center sm:gap-4">
            <SlideInFromLeft_1.default className=" w-4/5 md:w-1/2">
              {apartAssets?.length > 0 ? (<div className="  flex justify-center   my-0 xl:my-4">
                  <react_multi_carousel_1.default responsive={{
                all: {
                    breakpoint: { max: 4000, min: 0 },
                    items: 1,
                },
            }} swipeable={false} draggable={false} showDots={true} ssr={false} //
         infinite={true} autoPlay={true} autoPlaySpeed={2000} keyBoardControl={true} customTransition="all .5" transitionDuration={500} dotListClass="custom-dot-list-style" 
        // the only thing that had pissed me off is this classname w-full property and wihtout this  the carousel wont render
        className="  w-11/12 z-10 shadow-2xl  ">
                    {apartAssets.map((file) => (<div className="w-full  h-[41vw] md:h-[26vw] overflow-hidden">
                        {file.type === "photo" ? (<img className="size-full object-cover" src={file.link} alt=""/>) : (<video className=" object-cover  rounded-sm" controls>
                            <source src={file.link}/>
                            Your browser does not support the video tag.
                          </video>)}
                      </div>))}
                  </react_multi_carousel_1.default>
                </div>) : (<CustomTypographies_1.SubHeadingText text="No Photos to show"/>)}
            </SlideInFromLeft_1.default>
            <SlideInFromRight_1.default className="w-4/5 md:w-1/2 ">
              <div className=" items-center  px-[6vw] md:py-[4vh] lg:py-[7vh] xl:py-[10vh] flex flex-col gap-4  text-center align-middle">
                <p className=" text-main md:text-2xl font-bold text-primary  w-full">
                  One Bedroom Studio
                </p>
                <p className=" text-main md:text-xl text-seondary   w-full">
                  Stunning fully furnished studio apartment - everything you
                  need to settle in seamlessly. No need to worry about furniture
                  shopping or appliance deliveries – we've got you covered.
                </p>
                <Button_1.default onClick={() => navigate("/apartments")} variant="primary" className=" w-2/4 text-white font-accent bg hover:bg-opacity-70 ">
                  Book Now
                </Button_1.default>
                <Button_1.default className="w-2/4 bg-primary hover:text-white bg-opacity-0 hover:bg-opacity-10 text-primary font-accent border-primary border-2">
                  View More
                </Button_1.default>
              </div>
            </SlideInFromRight_1.default>
          </div>
        </div>
      </>
    </LayoutWrapper_1.default>);
};
exports.default = Home;
