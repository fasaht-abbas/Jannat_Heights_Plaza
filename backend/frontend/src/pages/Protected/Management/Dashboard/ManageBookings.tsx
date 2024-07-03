import DashWrapper from "./DashWrapper";
import {
  HeadingText,
  SubHeadingText,
} from "../../../../components/reuseables/CustomTypographies";
import InputField from "../../../../components/reuseables/InputField";
import { handleError, protectedApi } from "../../../../utils/axios";
import React, { useEffect, useState } from "react";
import { ApartDTO, BookingDTO } from "../../../../components/interface";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import Button from "../../../../components/reuseables/Button";
import PopIn from "../../../../components/Animations/PopIn";
import toast from "react-hot-toast";
import { DateRange } from "react-date-range";
import type { RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import RevealBottom from "../../../../components/Animations/RevealBottom";
import Loading from "../../../../components/reuseables/Loading";

const ManageBookings = () => {
  const [bookings, setBookings] = useState<BookingDTO[]>();
  const [editModal, setEditModal] = useState<BookingDTO | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [allAparts, setAllAparts] = useState<ApartDTO[]>([]);
  const [totalDays, setTotalDays] = useState<number>(1);
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [seeAvailable, setSeeAvailable] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [openMakeBooking, setOpenMakeBooking] = useState(false);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [apartId, setApartId] = useState("");
  const [selectedApart, setSelectedApart] = useState<ApartDTO>();
  const [amount, setAmount] = useState<number>();
  const [pmeathod, setPmeathod] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const getSlectedApart = async () => {
    try {
      const { data } = await protectedApi.get(
        `/api/v1/apart/get-single-apart/${apartId}`
      );
      if (data?.success) {
        setSelectedApart(data?.foundApart);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const calculateDetails = () => {
    if (!apartId) {
      toast.error("Select an apartment");
    } else {
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
      const { data } = await protectedApi.get("/api/v1/apart/get-all-aparts");
      if (data?.success) {
        setAllAparts(data?.allAparts);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const { data } = await protectedApi.get("/api/v1/apart/get-all-bookings");
      if (data?.success) {
        setBookings(data?.allBookings);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (!editStatus || !paymentStatus) {
        setLoading(false);
        return toast.error(
          "Please select the payment status and booking status"
        );
      }
      const updateBooking = new FormData();
      updateBooking.append("status", editStatus);
      updateBooking.append("pStatus", String(paymentStatus));
      updateBooking.append("receipt", receipt ? receipt : "");
      const { data } = await protectedApi.put(
        `/api/v1/apart/update-Booking-admin/${editModal?._id}`,
        updateBooking
      );
      if (data?.success) {
        toast.success("Changed successfully");
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
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const makeNewAdminBooking = async () => {
    try {
      setLoading(true);

      const { data } = await protectedApi.post(
        "/api/v1/apart/add-new-apart-booking",
        {
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
        }
      );
      if (data?.success) {
        fetchAllBookings();
        setLoading(false);
        toast.success("Booking Made");
        setName("");
        setPhone("");
        setPassword("");
        setEmail("");
        setCnic("");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const DeleteBooking = async () => {
    try {
      const { data } = await protectedApi.delete(
        `/api/v1/apart/delete-booking/${editModal?._id}`
      );
      if (data?.success) {
        setEditModal(null);
        fetchAllBookings();
        toast.success("Deleted Booking");
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchAllBookings();
    fetchAparts();
  }, []);

  return (
    <DashWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-6 flex flex-col gap-6 w-full text-center items-center justify-center">
            <HeadingText text="Manage Bookings" />
            <Button
              variant="primary"
              onClick={() => setOpenMakeBooking((prev) => !prev)}
              className="text-white self-end"
            >
              {openMakeBooking ? "Close" : "Make a new Booking"}
            </Button>
            {openMakeBooking && (
              <RevealBottom delay={0} duration={0.25}>
                <div className="w-full flex flex-col gap-6 items-center">
                  <SubHeadingText
                    text="Make a new Booking"
                    className="text-primary w-full text-center"
                  />
                  <div className="flex flex-col md:flex-row md:flex-wrap justify-center px-auto mx-auto items-center w-full gap-4">
                    <InputField
                      label="Enter Name"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      containerClass="w-full md:w-1/2"
                    />
                    <InputField
                      label="Enter CNIC"
                      value={cnic}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCnic(e.target.value)
                      }
                      containerClass="w-full md:w-1/2"
                    />
                    <InputField
                      label="Enter Phone"
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                      }
                      type="text"
                      containerClass="w-full md:w-1/2"
                    />
                    <InputField
                      label="Enter Address"
                      value={address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAddress(e.target.value);
                      }}
                      type="text"
                      containerClass="w-full md:w-1/2"
                    />
                    <InputField
                      label="Enter Email"
                      placeholder="Optional"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      type="text"
                      containerClass="w-full md:w-1/2"
                    />
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-1/2">
                      <SubHeadingText
                        className="font-bold text-primary"
                        text="Select Apartment Id"
                      />
                      <select
                        value={apartId}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setApartId(e.target.value)
                        }
                        className="w-full border border-primary p-3 rounded-lg text-primary font-bold"
                      >
                        <option className="text-center" value="">
                          Select Apartment
                        </option>
                        {allAparts?.map((apartment: ApartDTO) => (
                          <option
                            className="text-center"
                            key={apartment._id}
                            value={apartment._id}
                          >
                            {apartment.no}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col w-full items-center justify-center my-6">
                    <div className="mx-auto w-11/12 md:w-1/2 border-2 border-primary rounded-lg overflow-hidden">
                      <DateRange
                        onChange={(item: RangeKeyDict) =>
                          setDates([item.selection])
                        }
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={dates}
                        direction="horizontal"
                        editableDateInputs={true}
                        minDate={new Date()}
                        rangeColors={["#0A477A"]}
                      />
                    </div>
                    <Button
                      variant="primary"
                      onClick={calculateDetails}
                      className="text-white my-4"
                    >
                      Check Details
                    </Button>
                    {seeAvailable && (
                      <div className="w-full text-center justify-center items-center flex flex-col gap-6 my-6">
                        <SubHeadingText text="Booking Details" />
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
                          <SubHeadingText text="Select Payment Method" />
                          <select
                            value={pmeathod}
                            onChange={(
                              e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
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
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target?.files && e.target?.files[0]) {
                                    setReceipt(e.target?.files[0]);
                                  }
                                }}
                              />
                              {receipt && (
                                <div className="w-40 mx-auto overflow-hidden">
                                  <img
                                    className="object-cover mx-auto"
                                    src={URL.createObjectURL(receipt)}
                                    alt={receipt.name}
                                  />
                                </div>
                              )}
                              <Button
                                variant="success"
                                className="bg-opacity-30 text-white mt-2"
                                onClick={() =>
                                  document
                                    .getElementById("upload-receipt")
                                    ?.click()
                                }
                              >
                                {receipt ? receipt?.name : "Upload Photo"}
                              </Button>
                            </div>
                          </RevealBottom>
                        )}
                        <Button
                          variant="primary"
                          onClick={makeNewAdminBooking}
                          className="text-white"
                        >
                          Make Booking
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </RevealBottom>
            )}
            <div className="w-full flex flex-col gap-4 justify-center">
              <SubHeadingText
                text="All Bookings"
                className="w-full text-center text-primary"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings?.map((booking: BookingDTO) => (
                  <div
                    key={booking._id}
                    className="border border-primary rounded-lg p-4 flex flex-col gap-4 justify-between"
                  >
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
                      <Button
                        className="text-primary border-2"
                        onClick={() => {
                          setEditModal(booking);
                          setPaymentStatus(
                            booking?.payment_cleared ? "true" : "false"
                          );
                          setEditStatus(booking?.status);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditModal(null)}
                    className="text-black"
                  >
                    Close
                  </button>
                </div>
                <SubHeadingText text="Edit Booking" className="text-center" />
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <SubHeadingText text="Payment Status" />
                    <select
                      value={paymentStatus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setPaymentStatus(e.target.value)
                      }
                      className="w-full border border-primary p-3 rounded-lg text-primary font-bold"
                    >
                      <option value="">Select Payment Status</option>
                      <option value="true">Cleared</option>
                      <option value="false">Pending</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <SubHeadingText text="Booking Status" />
                    <select
                      value={editStatus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setEditStatus(e.target.value)
                      }
                      className="w-full border border-primary p-3 rounded-lg text-primary font-bold"
                    >
                      <option value="">Select Booking Status</option>

                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Expired">Expired</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  {/* Processing", "Confirmed", "Expired", "Canceled" */}
                  {editModal?.payment_receipt ? (
                    <img
                      className="w-40"
                      src={editModal?.payment_receipt}
                      alt="receipt"
                    />
                  ) : (
                    <InputField
                      label="Upload Receipt"
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setReceipt(e.target.files ? e.target.files[0] : null)
                      }
                    />
                  )}
                  <Button
                    variant="primary"
                    onClick={handleUpdate}
                    className="text-white"
                  >
                    Update Booking
                  </Button>
                  <Button
                    className="text-danger border-primary border-2"
                    onClick={DeleteBooking}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DashWrapper>
  );
};

export default ManageBookings;
