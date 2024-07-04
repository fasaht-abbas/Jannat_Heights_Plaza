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
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const Halls_1 = __importDefault(require("./pages/Halls"));
const Contact_1 = __importDefault(require("./pages/Contact"));
const Login_1 = __importDefault(require("./pages/Login"));
const SignUp_1 = __importDefault(require("./pages/SignUp"));
const Authorization_1 = __importDefault(require("./pages/Authorization"));
const react_redux_1 = require("react-redux");
const refreshTokens_1 = require("./utils/refreshTokens");
const react_redux_2 = require("react-redux");
const authSlice_1 = require("./redux/authSlice");
const Private_1 = __importDefault(require("./Routes/Private"));
const Profile_1 = __importDefault(require("./pages/Protected/Profile"));
const VerifyEmail_1 = __importDefault(require("./pages/Protected/verification/VerifyEmail"));
const ChangeInformation_1 = __importDefault(require("./pages/Protected/ChangeInformation"));
const AdminRoute_1 = __importDefault(require("./Routes/AdminRoute"));
const ManagementRoute_1 = __importDefault(require("./Routes/ManagementRoute"));
const UnAuthorizedPage_1 = __importDefault(require("./components/reuseables/UnAuthorizedPage"));
const PasswordReset_1 = __importDefault(require("./pages/Protected/verification/PasswordReset"));
const ManageTeam_1 = __importDefault(require("./pages/Protected/Management/Dashboard/ManageTeam"));
const ManageApartment_1 = __importDefault(require("./pages/Protected/Management/Dashboard/ManageApartment"));
const ManageBookings_1 = __importDefault(require("./pages/Protected/Management/Dashboard/ManageBookings"));
const Apartments_1 = __importDefault(require("./pages/Apartments"));
const MyBookings_1 = __importDefault(require("./pages/Protected/MyBookings"));
function App() {
    const dispatch = (0, react_redux_2.useDispatch)();
    const isAuthenticated = (0, react_redux_1.useSelector)((state) => state.auth.isAuthenticated);
    // just make sure that any change also needs to be made in the authorization page and if found a way shift this logic on that page
    const refresh = async () => {
        if (isAuthenticated) {
            (0, refreshTokens_1.refreshing)();
        }
        else {
            dispatch((0, authSlice_1.logout)());
        }
    };
    (0, react_1.useEffect)(() => {
        refresh();
    }, []);
    return (<div className="App">
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
        <react_router_dom_1.Route path="*" element={<UnAuthorizedPage_1.default />}/>
        <react_router_dom_1.Route path="/apartments" element={<Apartments_1.default />}/>
        <react_router_dom_1.Route path="/halls" element={<Halls_1.default />}/>
        <react_router_dom_1.Route path="/contact" element={<Contact_1.default />}/>
        <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
        <react_router_dom_1.Route path="/signup" element={<SignUp_1.default />}/>
        <react_router_dom_1.Route path="/authorization" element={<Authorization_1.default />}/>

        <react_router_dom_1.Route path="/reset-password" element={<PasswordReset_1.default />}/>
        <react_router_dom_1.Route path="/private" element={<Private_1.default />}>
          <react_router_dom_1.Route path="verify-email" element={<VerifyEmail_1.default />}/>
          <react_router_dom_1.Route path="profile" element={<Profile_1.default />}/>
          <react_router_dom_1.Route path="change-information" element={<ChangeInformation_1.default />}/>
          <react_router_dom_1.Route path="bookings" element={<MyBookings_1.default />}/>

          <react_router_dom_1.Route path="r1" element={<AdminRoute_1.default />}>
            <react_router_dom_1.Route path="manage-team" element={<ManageTeam_1.default />}/>
          </react_router_dom_1.Route>

          <react_router_dom_1.Route path="r2" element={<ManagementRoute_1.default />}>
            <react_router_dom_1.Route path="manage-apartments" element={<ManageApartment_1.default />}/>
            <react_router_dom_1.Route path="bookings" element={<ManageBookings_1.default />}/>
          </react_router_dom_1.Route>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
    </div>);
}
exports.default = App;
