"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LayoutWrapper_1 = __importDefault(require("../../components/wrapper/LayoutWrapper"));
const InputField_1 = __importDefault(require("../../components/reuseables/InputField"));
const react_redux_1 = require("react-redux");
const fa_1 = require("react-icons/fa");
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("../../components/reuseables/Button"));
const Profile = () => {
    const Person = "/person.png";
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    return (<LayoutWrapper_1.default>
      <div className="mx-auto max-w-4xl border border-secondary p-6 shadow-2xl rounded-lg mt-12">
        <p className="text-center font-main text-primary font-bold text-2xl mb-4">
          Profile Information
        </p>

        <div className="md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex flex-col-reverse">
          <div className="col-span-8 grid grid-cols-1 gap-4">
            <InputField_1.default label="Name" disabled={true} value={userData?.name}/>
            <InputField_1.default label="Email" disabled={true} value={userData?.email} button={<div className="mt-4 flex items-center">
                  {userData?.verifiedEmail ? (<p className="text-success">Verified</p>) : (<react_router_dom_1.Link to={"/private/verify-email"}>
                      <p className="text-danger">Verify now</p>
                    </react_router_dom_1.Link>)}
                </div>}/>
            <InputField_1.default label="Phone" disabled={true} value={userData?.phone} placeholder="No phone added"/>
            <InputField_1.default label="Address" placeholder="No Address given" disabled={true} value={userData?.address}/>
          </div>

          <div className="col-span-4 flex flex-col items-center mt-4 md:mt-0">
            <div className="rounded-full w-40 h-40 overflow-hidden shadow-2xl mb-4">
              <img className="object-cover w-full h-full" alt="Profile" src={userData?.profilePhoto ? userData?.profilePhoto : Person}/>
            </div>
            <InputField_1.default placeholder="No CNIC added" label="CNIC" value={userData?.CNIC} disabled={true}/>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button_1.default onClick={() => navigate("/private/change-information")} className="flex items-center text-primary bg-opacity-0 border-none hover:bg-opacity-5 font-bold">
            <fa_1.FaPen />
            <p className="font-bold font-main ml-2">Change Information</p>
          </Button_1.default>
          {!userData?.googleId && (<Button_1.default onClick={() => navigate("/reset-password")} className="flex items-center text-danger bg-opacity-0 border-none hover:bg-opacity-5 font-bold">
              <fa_1.FaPen className="text-danger"/>
              <p className="text-danger font-bold font-main ml-2">
                Reset Password
              </p>
            </Button_1.default>)}
        </div>
      </div>
    </LayoutWrapper_1.default>);
};
exports.default = Profile;
