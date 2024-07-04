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
const LayoutWrapper_1 = __importDefault(require("../../components/wrapper/LayoutWrapper"));
const InputField_1 = __importDefault(require("../../components/reuseables/InputField"));
const react_redux_1 = require("react-redux");
const fa_1 = require("react-icons/fa");
const Button_1 = __importDefault(require("../../components/reuseables/Button"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_1 = __importStar(require("react"));
const axios_1 = require("../../utils/axios");
const react_router_dom_1 = require("react-router-dom");
const refreshTokens_1 = require("../../utils/refreshTokens");
const Loading_1 = __importDefault(require("../../components/reuseables/Loading"));
const ChangeInformation = () => {
    const userData = (0, react_redux_1.useSelector)((state) => state.auth.userData);
    const nameRef = (0, react_1.useRef)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [name, setName] = (0, react_1.useState)(userData?.name);
    const [address, setAddress] = (0, react_1.useState)(userData?.address);
    const [phone, setPhone] = (0, react_1.useState)(userData?.phone);
    const [CNIC, setCNIC] = (0, react_1.useState)(userData?.CNIC);
    const [photo, setPhoto] = (0, react_1.useState)(null);
    const Person = "/person.png";
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const updateForm = new FormData();
            updateForm.append("id", userData?._id ? userData._id : "");
            updateForm.append("phone", phone ? phone : "");
            updateForm.append("address", address ? address : "");
            updateForm.append("photo", photo ? photo : "");
            updateForm.append("name", name ? name : "");
            updateForm.append("CNIC", CNIC ? CNIC : "");
            const { data } = await axios_1.protectedApi.post("/api/v1/user/update-user", updateForm);
            if (data?.success) {
                react_hot_toast_1.default.success("Profile Updated Successfully");
                await (0, refreshTokens_1.refreshing)();
                setLoading(false);
                navigate("/private/profile");
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
            setLoading(false);
            navigate("/private/profile");
        }
    };
    (0, react_1.useEffect)(() => {
        nameRef.current?.focus();
    }, []);
    return (<LayoutWrapper_1.default>
      {loading ? (<Loading_1.default />) : (<div className="mx-auto max-w-4xl border border-secondary p-6 shadow-2xl rounded-lg mt-12">
          <p className="text-center font-main text-primary font-bold text-2xl mb-4">
            Change Information
          </p>
          <div className="md:grid md:grid-cols-12 gap-8 mt-3 p-6 flex flex-col-reverse">
            <div className="col-span-8 grid grid-cols-1 gap-4">
              <InputField_1.default label="Name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)}/>
              <InputField_1.default label="Email" disabled={true} value={userData?.email}/>
              <p className="text-danger text-xs mb-4">
                Email cannot be changed
              </p>
              <InputField_1.default label="Phone" type="string" value={phone} placeholder="No phone added (add here)" onChange={(e) => setPhone(e.target.value)}/>
              <InputField_1.default label="Address" value={address} placeholder="Add Address" onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div className="col-span-4 flex flex-col items-center justify-center gap-4 mt-4 md:mt-0">
              <div className="rounded-full w-40 h-40 overflow-hidden shadow-2xl">
                <img className="object-cover w-full h-full" src={photo === null
                ? userData?.profilePhoto
                    ? userData?.profilePhoto
                    : Person
                : URL.createObjectURL(photo)} alt={name}/>
              </div>
              {photo ? (<div className="flex flex-col gap-2 w-full justify-center items-center">
                  <p>{photo?.name}</p>
                  <Button_1.default onClick={() => document.getElementById("upload-Photo")?.click()} variant="success" className="flex gap-2 justify-center items-center">
                    <fa_1.FaImage /> <p>Change Photo</p>
                  </Button_1.default>
                </div>) : (<Button_1.default onClick={() => document.getElementById("upload-Photo")?.click()} variant="accent" className="flex gap-2 justify-center items-center bg-opacity-50">
                  <fa_1.FaImage /> <p>Upload New Photo</p>
                </Button_1.default>)}
              <input id="upload-Photo" accept="image/*" type="file" onChange={(e) => {
                if (e.target?.files && e.target?.files[0]) {
                    setPhoto(e.target?.files[0]);
                }
            }} className="hidden"/>
              <InputField_1.default label="CNIC" placeholder="Add CNIC here" value={CNIC} onChange={(e) => setCNIC(e.target.value)}/>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button_1.default variant="success" onClick={handleSubmit} className="flex items-center gap-2 border-none hover:bg-opacity-80 font-bold">
              <fa_1.FaFile />
              <p>Save Changes</p>
            </Button_1.default>
          </div>
        </div>)}
    </LayoutWrapper_1.default>);
};
exports.default = ChangeInformation;
