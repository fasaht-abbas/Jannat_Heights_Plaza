"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const axios_1 = require("../utils/axios");
const authSlice_1 = require("../redux/authSlice");
const Loading_1 = __importDefault(require("../components/reuseables/Loading"));
const Authorization = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [authorized, setAuthorized] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const secret = searchParams.get("secret");
    // now we  need to use the library called react persist to persist the state of the redux
    const getUser = async () => {
        try {
            const { data } = await axios_1.api.post("/api/v1/auth/get-user", {
                secret,
            });
            // jsut make sure that any change also needs to be made in the app.tsx page and
            if (data?.success) {
                dispatch((0, authSlice_1.login)({
                    token: secret,
                    userData: {
                        name: data?.returnUser?.name,
                        _id: data?.returnUser?._id,
                        email: data?.returnUser?.email,
                        googleId: data?.returnUser?.googleId,
                        role: data?.returnUser?.role,
                        profilePhoto: data?.returnUser?.profilePhoto,
                        address: data?.returnUser?.address,
                        phone: data?.returnUser?.phone,
                        CNIC: data?.returnUser?.CNIC,
                        verifiedEmail: data?.returnUser?.verifiedEmail,
                    },
                }));
                if (!data?.returnUser?.verifiedEmail) {
                    navigate("/private/verify-email");
                }
                else {
                    navigate("/", { replace: true });
                }
                setAuthorized(true);
                setLoading(false);
            }
        }
        catch (error) {
            (0, axios_1.handleError)(error);
            setAuthorized(false);
            setLoading(false);
            navigate("/login");
        }
    };
    (0, react_1.useEffect)(() => {
        getUser();
    }, []);
    return loading ? (<Loading_1.default />) : authorized ? (<>USER AUTHORIZED</>) : (<>UNAUTHORIZED USER</>);
};
exports.default = Authorization;
