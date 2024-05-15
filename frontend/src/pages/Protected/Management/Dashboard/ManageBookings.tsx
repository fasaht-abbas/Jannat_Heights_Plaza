import DashWrapper from "./DashWrapper";
import {
  HeadingText,
  SubHeadingText,
} from "../../../../components/reuseables/CustomTypographies";
import InputField from "../../../../components/reuseables/InputField";

const ManageBookings = () => {
  return (
    <DashWrapper>
      {" "}
      {/* THis page need to be updated now after we make the smple bookings possible */}
      <div className=" p-[2vh] flex flex-col gap-4 w-full text-center items-center justify-center ">
        <HeadingText text="Manage Bookings" />

        <div className="w-full flex flex-col gap-4">
          <SubHeadingText
            text="Make a new Booking"
            className="text-primary w-full text-center"
          />
          <div className="flex flex-wrap justify-center px-auto mx-auto items-center w-full">
            <InputField label="Enter Name" containerClass="w-1/2" />
            <InputField label="Enter CNIC" containerClass="w-1/2" />
            <InputField
              label="Enter Phone"
              type="text"
              containerClass="w-1/2"
            />
            <InputField
              label="Enter Address"
              type="text"
              containerClass="w-1/2"
            />
            <InputField
              label="Enter Email"
              placeholder="Optional"
              type="text"
              containerClass="w-1/2"
            />
            <InputField
              label="Apartment Id"
              type="text"
              containerClass=" w-1/2"
            />
            <InputField label="Start Date" type="date" containerClass="w-1/2" />
            <InputField label="End Date" type="date" containerClass="w-1/2" />

            <InputField label="Password" type="text" containerClass="w-1/2" />
          </div>
        </div>
      </div>
    </DashWrapper>
  );
};

export default ManageBookings;
