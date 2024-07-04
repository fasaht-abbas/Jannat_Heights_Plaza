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
const DashWrapper_1 = __importDefault(require("./DashWrapper"));
const CustomTypographies_1 = require("../../../../components/reuseables/CustomTypographies");
const InputField_1 = __importDefault(require("../../../../components/reuseables/InputField"));
const axios_1 = require("../../../../utils/axios");
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const Button_1 = __importDefault(require("../../../../components/reuseables/Button"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_date_range_1 = require("react-date-range");
require("react-date-range/dist/styles.css");
require("react-date-range/dist/theme/default.css");
const RevealBottom_1 = __importDefault(require("../../../../components/Animations/RevealBottom"));
const Loading_1 = __importDefault(require("../../../../components/reuseables/Loading"));
const ManageBookings = () => {
    const [bookings, setBookings] = (0, react_1.useState)();
    const [editModal, setEditModal] = (0, react_1.useState)(null);
    const [editStatus, setEditStatus] = (0, react_1.useState)("");
    const [paymentStatus, setPaymentStatus] = (0, react_1.useState)("");
    const [allAparts, setAllAparts] = (0, react_1.useState)([]);
    const [totalDays, setTotalDays] = (0, react_1.useState)(1);
    const [dates, setDates] = (0, react_1.useState)([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [seeAvailable, setSeeAvailable] = (0, react_1.useState)(false);
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const [openMakeBooking, setOpenMakeBooking] = (0, react_1.useState)(false);
    const [name, setName] = (0, react_1.useState)("");
    const [cnic, setCnic] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [phone, setPhone] = (0, react_1.useState)("");
    const [address, setAddress] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [apartId, setApartId] = (0, react_1.useState)("");
    const [selectedApart, setSelectedApart] = (0, react_1.useState)();
    const [amount, setAmount] = (0, react_1.useState)();
    const [pmeathod, setPmeathod] = (0, react_1.useState)("");
    const [receipt, setReceipt] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const getSlectedApart = async () => {
        try {
            const { data } = await axios_1.protectedApi.get(`/api/v1/apart/get-single-apart/${apartId}`);
            if (data?.success) {
                setSelectedApart(data?.foundApart);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    const calculateDetails = () => {
        if (!apartId) {
            react_hot_toast_1.default.error("Select an apartment");
        }
        else {
            getSlectedApart();
            setSeeAvailable(true);
            if (dates[0]?.startDate && dates[0]?.endDate) {
                const date1 = new Date(dates[0]?.startDate).getTime();
                const date2 = new Date(dates[0]?.endDate).getTime();
                const time = Math.abs(date2 - date1);
                const days = Math.ceil(time / (1000 * 60 * 60 * 24));
                setTotalDays(days);
                setAmount(days * Number(selectedApart?.rent));
            }
        }
    };
    const fetchAparts = async () => {
        try {
            const { data } = await axios_1.protectedApi.get("/api/v1/apart/get-all-aparts");
            if (data?.success) {
                setAllAparts(data?.allAparts);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    const fetchAllBookings = async () => {
        try {
            const { data } = await axios_1.protectedApi.get("/api/v1/apart/get-all-bookings");
            if (data?.success) {
                setBookings(data?.allBookings);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    const handleUpdate = async () => {
        setLoading(true);
        try {
            if (!editStatus || !paymentStatus) {
                setLoading(false);
                return react_hot_toast_1.default.error("Please select the payment status and booking status");
            }
            const updateBooking = new FormData();
            updateBooking.append("status", editStatus);
            updateBooking.append("pStatus", String(paymentStatus));
            updateBooking.append("receipt", receipt ? receipt : "");
            const { data } = await axios_1.protectedApi.put(`/api/v1/apart/update-Booking-admin/${editModal?._id}`, updateBooking);
            if (data?.success) {
                react_hot_toast_1.default.success("Changed successfully");
                setLoading(false);
                setReceipt(null);
                setEditStatus("");
                setPaymentStatus("");
                setSeeAvailable(false);
                setEditModal(null);
                fetchAllBookings();
                setPaymentStatus("");
                setEditStatus("");
            }
        }
        catch (error) {
            setLoading(false);
            (0, axios_1.handleError)(error);
        }
    };
    const makeNewAdminBooking = async () => {
        try {
            setLoading(true);
            const { data } = await axios_1.protectedApi.post("/api/v1/apart/add-new-apart-booking", {
                name: name,
                cnic: cnic,
                phone: phone,
                address: address,
                email: email,
                password: password,
                customerId: userData?._id,
                apartment: apartId,
                startDate: dates[0]?.startDate,
                endDate: dates[0]?.endDate,
                amount: amount,
                pmeathod: pmeathod,
            });
            if (data?.success) {
                fetchAllBookings();
                setLoading(false);
                react_hot_toast_1.default.success("Booking Made");
                setName("");
                setPhone("");
                setPassword("");
                setEmail("");
                setCnic("");
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    const DeleteBooking = async () => {
        try {
            const { data } = await axios_1.protectedApi.delete(`/api/v1/apart/delete-booking/${editModal?._id}`);
            if (data?.success) {
                setEditModal(null);
                fetchAllBookings();
                react_hot_toast_1.default.success("Deleted Booking");
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchAllBookings();
        fetchAparts();
    }, []);
    return (<DashWrapper_1.default>
      {loading ? (<Loading_1.default />) : (<>
          <div className="p-6 flex flex-col gap-6 w-full text-center items-center justify-center">
            <CustomTypographies_1.HeadingText text="Manage Bookings"/>
            <Button_1.default variant="primary" onClick={() => setOpenMakeBooking((prev) => !prev)} className="text-white self-end">
              {openMakeBooking ? "Close" : "Make a new Booking"}
            </Button_1.default>
            {openMakeBooking && (<RevealBottom_1.default delay={0} duration={0.25}>
                <div className="w-full flex flex-col gap-6 items-center">
                  <CustomTypographies_1.SubHeadingText text="Make a new Booking" className="text-primary w-full text-center"/>
                  <div className="flex flex-col md:flex-row md:flex-wrap justify-center px-auto mx-auto items-center w-full gap-4">
                    <InputField_1.default label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} containerClass="w-full md:w-1/2"/>
                    <InputField_1.default label="Enter CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} containerClass="w-full md:w-1/2"/>
                    <InputField_1.default label="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" containerClass="w-full md:w-1/2"/>
                    <InputField_1.default label="Enter Address" value={address} onChange={(e) => {
                    setAddress(e.target.value);
                }} type="text" containerClass="w-full md:w-1/2"/>
                    <InputField_1.default label="Enter Email" placeholder="Optional" value={email} onChange={(e) => setEmail(e.target.value)} type="text" containerClass="w-full md:w-1/2"/>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-1/2">
                      <CustomTypographies_1.SubHeadingText className="font-bold text-primary" text="Select Apartment Id"/>
                      <select value={apartId} onChange={(e) => setApartId(e.target.value)} className="w-full border border-primary p-3 rounded-lg text-primary font-bold">
                        <option className="text-center" value="">
                          Select Apartment
                        </option>
                        {allAparts?.map((apartment) => (<option className="text-center" key={apartment._id} value={apartment._id}>
                            {apartment.no}
                          </option>))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-center justify-center my-6">
                    <div className="mx-auto w-11/12 md:w-1/2 border-2 border-primary rounded-lg overflow-hidden">
                      <react_date_range_1.DateRange onChange={(item) => setDates([item.selection])} moveRangeOnFirstSelection={false} months={1} ranges={dates} direction="horizontal" editableDateInputs={true} minDate={new Date()} rangeColors={["#0A477A"]}/>
                    </div>
                    <Button_1.default variant="primary" onClick={calculateDetails} className="text-white my-4">
                      Check Details
                    </Button_1.default>
                    {seeAvailable && (<div className="w-full text-center justify-center items-center flex flex-col gap-6 my-6">
                        <CustomTypographies_1.SubHeadingText text="Booking Details"/>
                        <p className="font-bold text-primary text-md">
                          Apartment Rent: {selectedApart?.rent}
                        </p>
                        <p className="font-bold text-primary text-md">
                          Total Days: {totalDays}
                        </p>
                        <p className="font-bold text-primary text-md">
                          Total Amount:{" "}
                          {selectedApart?.rent
                        ? selectedApart?.rent * totalDays
                        : "Select an Appart first"}
                        </p>
                        <div className="flex gap-2 justify-center">
                          <CustomTypographies_1.SubHeadingText text="Select Payment Method"/>
                          <select value={pmeathod} onChange={(e) => {
                        setPmeathod(e.target.value);
                    }} className="w-fit bg-accent bg-opacity-10 border-accent border-2 rounded-md">
                            <option value="">Select</option>
                            <option value="advance">Advance</option>
                            <option value="on_check_in">On Check-in</option>
                          </select>
                        </div>
                        {pmeathod === "advance" && (<RevealBottom_1.default delay={0}>
                            <div className="p-4 flex flex-col w-5/6 md:w-4/6 border-2 border-opacity-20 border-accent mx-auto rounded-md">
                              <div className="flex justify-evenly w-full">
                                <CustomTypographies_1.SubHeadingText className="font-bold text-primary" text="Jazzcash"/>
                                <CustomTypographies_1.SubHeadingText className="font-bold" text="03333333333"/>
                              </div>
                              <div className="flex justify-evenly w-full">
                                <CustomTypographies_1.SubHeadingText className="font-bold text-primary" text="EasyPaisa"/>
                                <CustomTypographies_1.SubHeadingText className="font-bold" text="03333333333"/>
                              </div>
                              <div className="flex justify-evenly w-full">
                                <CustomTypographies_1.SubHeadingText className="font-bold text-primary" text="Meezan Bank"/>
                                <CustomTypographies_1.SubHeadingText className="font-bold" text="03333333333"/>
                              </div>
                              <CustomTypographies_1.SubHeadingText className="text-danger text-center" text="Make an advance payment and attach the receipt below to book your apartment"/>
                              <input type="file" id="upload-receipt" accept="image/*" hidden onChange={(e) => {
                            if (e.target?.files && e.target?.files[0]) {
                                setReceipt(e.target?.files[0]);
                            }
                        }}/>
                              {receipt && (<div className="w-40 mx-auto overflow-hidden">
                                  <img className="object-cover mx-auto" src={URL.createObjectURL(receipt)} alt={receipt.name}/>
                                </div>)}
                              <Button_1.default variant="success" className="bg-opacity-30 text-white mt-2" onClick={() => document
                            .getElementById("upload-receipt")
                            ?.click()}>
                                {receipt ? receipt?.name : "Upload Photo"}
                              </Button_1.default>
                            </div>
                          </RevealBottom_1.default>)}
                        <Button_1.default variant="primary" onClick={makeNewAdminBooking} className="text-white">
                          Make Booking
                        </Button_1.default>
                      </div>)}
                  </div>
                </div>
              </RevealBottom_1.default>)}
            <div className="w-full flex flex-col gap-4 justify-center">
              <CustomTypographies_1.SubHeadingText text="All Bookings" className="w-full text-center text-primary"/>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings?.map((booking) => (<div key={booking._id} className="border border-primary rounded-lg p-4 flex flex-col gap-4 justify-between">
                    <div>
                      <p className="font-bold text-primary">
                        Customer: {booking.customer.name}
                      </p>
                      <p className="text-primary">
                        CNIC: {booking.customer.CNIC}
                      </p>
                      <p className="text-primary">
                        Phone: {booking.customer.phone}
                      </p>
                      <p className=" text-center text-primary p-4 max-w-xs whitespace-normal break-words">
                        Address: {booking.customer.address}
                      </p>
                      <p className="text-primary">
                        Email: {booking.customer.email}
                      </p>
                      <p className="text-primary">
                        Apartment: {booking.apartment?.no}
                      </p>
                      <p className="text-primary">
                        Rent: {booking.apartment.rent}
                      </p>
                      <p className="text-primary">
                        Start Date: {new Date(booking.from).toDateString()}
                      </p>
                      <p className="text-primary">
                        End Date: {new Date(booking.to).toDateString()}
                      </p>
                      <p className="text-primary">
                        Booking Date:{" "}
                        {new Date(booking.booking_time).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button_1.default className="text-primary border-2" onClick={() => {
                    setEditModal(booking);
                    setPaymentStatus(booking?.payment_cleared ? "true" : "false");
                    setEditStatus(booking?.status);
                }}>
                        Edit
                      </Button_1.default>
                    </div>
                  </div>))}
              </div>
            </div>
          </div>
          {editModal && (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-end">
                  <button onClick={() => setEditModal(null)} className="text-black">
                    Close
                  </button>
                </div>
                <CustomTypographies_1.SubHeadingText text="Edit Booking" className="text-center"/>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <CustomTypographies_1.SubHeadingText text="Payment Status"/>
                    <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full border border-primary p-3 rounded-lg text-primary font-bold">
                      <option value="">Select Payment Status</option>
                      <option value="true">Cleared</option>
                      <option value="false">Pending</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <CustomTypographies_1.SubHeadingText text="Booking Status"/>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full border border-primary p-3 rounded-lg text-primary font-bold">
                      <option value="">Select Booking Status</option>

                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Expired">Expired</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  {/* Processing", "Confirmed", "Expired", "Canceled" */}
                  {editModal?.payment_receipt ? (<img className="w-40" src={editModal?.payment_receipt} alt="receipt"/>) : (<InputField_1.default label="Upload Receipt" type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)}/>)}
                  <Button_1.default variant="primary" onClick={handleUpdate} className="text-white">
                    Update Booking
                  </Button_1.default>
                  <Button_1.default className="text-danger border-primary border-2" onClick={DeleteBooking}>
                    Delete
                  </Button_1.default>
                </div>
              </div>
            </div>)}
        </>)}
    </DashWrapper_1.default>);
};
exports.default = ManageBookings;
