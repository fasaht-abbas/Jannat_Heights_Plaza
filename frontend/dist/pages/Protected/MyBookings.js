"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LayoutWrapper_1 = __importDefault(require("../../components/wrapper/LayoutWrapper"));
const axios_1 = require("../../utils/axios");
const react_redux_1 = require("react-redux");
const CustomTypographies_1 = require("../../components/reuseables/CustomTypographies");
const Button_1 = __importDefault(require("../../components/reuseables/Button"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const PopIn_1 = __importDefault(require("../../components/Animations/PopIn"));
const Loading_1 = __importDefault(require("../../components/reuseables/Loading"));
const MyBookings = () => {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [bookings, setBookings] = (0, react_1.useState)();
    const [cancelModal, setCancelModal] = (0, react_1.useState)();
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data } = await axios_1.protectedApi.get(`/api/v1/apart/get-my-bookings/${userData?._id}`);
            if (data?.success) {
                setLoading(false);
                setBookings(data?.allBookings);
            }
        }
        catch (error) {
            setLoading(false);
            (0, axios_1.handleError)(error);
        }
    };
    const CancelBooking = async (id) => {
        try {
            const { data } = await axios_1.protectedApi.put(`/api/v1/apart/cancel-booking/${id}`);
            if (data?.success) {
                setCancelModal(null);
                fetchBookings();
                react_hot_toast_1.default.success("Canceled");
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchBookings();
    }, []);
    return (<LayoutWrapper_1.default>
      {loading ? (<Loading_1.default />) : (<div className="w-full flex flex-col p-2 md:p-4 gap-4">
          <CustomTypographies_1.HeadingText className="w-full text-center" text="My Bookings"/>
          {bookings?.length ? (bookings?.map((booking) => {
                return (<div key={booking?._id} className="relative flex p-4 md:p-6 flex-col gap-6 shadow-lg border border-gray-200 rounded-lg mx-auto w-full md:w-3/4 lg:w-1/2">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="text-primary font-semibold" text="Booking Details"/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={`Apartment # ${booking?.apartment?.no}`}/>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="Start Date: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={new Date(booking?.from).toLocaleDateString()}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="End Date: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={new Date(booking?.to).toLocaleDateString()}/>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="Payment Method: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={booking?.payment_meathod}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="Payment Cleared: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={booking?.payment_cleared ? "True" : "False"}/>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="Booking Status: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={booking?.status}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <CustomTypographies_1.SubHeadingText className="font-semibold text-primary" text="Booking Time: "/>
                      <CustomTypographies_1.SubHeadingText className="font-medium" text={new Date(booking?.booking_time).toLocaleString()}/>
                    </div>
                  </div>

                  {booking?.status !== "Canceled" && (<div className="flex justify-end">
                      <Button_1.default onClick={() => setCancelModal(booking)} className="w-fit self-end text-white" variant="primary">
                        Cancel Booking
                      </Button_1.default>
                    </div>)}

                  {cancelModal && (<div className="z-50 backdrop-blur-sm fixed top-0 left-0 h-screen flex justify-center items-center w-full">
                      <PopIn_1.default delay={0} className="w-full">
                        <div className="mx-auto w-5/6 md:w-1/2 bg-white shadow-lg border border-gray-200 rounded-lg p-4 md:p-8 gap-4 flex flex-col">
                          <CustomTypographies_1.SubHeadingText className="text-primary" text="Are you sure you want to cancel this booking?"/>
                          <div className="flex justify-end gap-4">
                            <Button_1.default variant="secondary" onClick={() => setCancelModal(null)} className="bg-opacity-10 hover:text-white">
                              No
                            </Button_1.default>
                            <Button_1.default variant="primary" className="text-white" onClick={() => CancelBooking(cancelModal?._id)}>
                              Yes
                            </Button_1.default>
                          </div>
                        </div>
                      </PopIn_1.default>
                    </div>)}
                </div>);
            })) : (<CustomTypographies_1.SubHeadingText className="text-accent" text="You have no bookings yet."/>)}
        </div>)}
    </LayoutWrapper_1.default>);
};
exports.default = MyBookings;
