import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../components/wrapper/LayoutWrapper";
import { handleError, protectedApi } from "../../utils/axios";
import { BookingDTO } from "../../components/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  HeadingText,
  SubHeadingText,
} from "../../components/reuseables/CustomTypographies";
import Button from "../../components/reuseables/Button";
import toast from "react-hot-toast";
import PopIn from "../../components/Animations/PopIn";
import Loading from "../../components/reuseables/Loading";

const MyBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingDTO[]>();
  const [cancelModal, setCancelModal] = useState<BookingDTO | null>();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await protectedApi.get(
        `/api/v1/apart/get-my-bookings/${userData?._id}`
      );
      if (data?.success) {
        setLoading(false);
        setBookings(data?.allBookings);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const CancelBooking = async (id: string) => {
    try {
      const { data } = await protectedApi.put(
        `/api/v1/apart/cancel-booking/${id}`
      );
      if (data?.success) {
        setCancelModal(null);
        fetchBookings();
        toast.success("Canceled");
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <LayoutWrapper>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col p-2 md:p-4 gap-4">
          <HeadingText className="w-full text-center" text="My Bookings" />
          {bookings?.length ? (
            bookings?.map((booking) => {
              return (
                <div
                  key={booking?._id}
                  className="relative flex p-4 md:p-6 flex-col gap-6 shadow-lg border border-gray-200 rounded-lg mx-auto w-full md:w-3/4 lg:w-1/2"
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="text-primary font-semibold"
                        text="Booking Details"
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={`Apartment # ${booking?.apartment?.no}`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="Start Date: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={new Date(booking?.from).toLocaleDateString()}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="End Date: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={new Date(booking?.to).toLocaleDateString()}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="Payment Method: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={booking?.payment_meathod}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="Payment Cleared: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={booking?.payment_cleared ? "True" : "False"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="Booking Status: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={booking?.status}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                      <SubHeadingText
                        className="font-semibold text-primary"
                        text="Booking Time: "
                      />
                      <SubHeadingText
                        className="font-medium"
                        text={new Date(booking?.booking_time).toLocaleString()}
                      />
                    </div>
                  </div>

                  {booking?.status !== "Canceled" && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setCancelModal(booking)}
                        className="w-fit self-end text-white"
                        variant="primary"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}

                  {cancelModal && (
                    <div className="z-50 backdrop-blur-sm fixed top-0 left-0 h-screen flex justify-center items-center w-full">
                      <PopIn delay={0} className="w-full">
                        <div className="mx-auto w-5/6 md:w-1/2 bg-white shadow-lg border border-gray-200 rounded-lg p-4 md:p-8 gap-4 flex flex-col">
                          <SubHeadingText
                            className="text-primary"
                            text="Are you sure you want to cancel this booking?"
                          />
                          <div className="flex justify-end gap-4">
                            <Button
                              variant="secondary"
                              onClick={() => setCancelModal(null)}
                              className="bg-opacity-10 hover:text-white"
                            >
                              No
                            </Button>
                            <Button
                              variant="primary"
                              className="text-white"
                              onClick={() => CancelBooking(cancelModal?._id)}
                            >
                              Yes
                            </Button>
                          </div>
                        </div>
                      </PopIn>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <SubHeadingText
              className="text-accent"
              text="You have no bookings yet."
            />
          )}
        </div>
      )}
    </LayoutWrapper>
  );
};

export default MyBookings;
