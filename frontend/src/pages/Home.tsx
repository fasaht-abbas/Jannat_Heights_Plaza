import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/reuseables/Button";
import { refreshing } from "../utils/refreshTokens";
const Home = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <LayoutWrapper>
      <div>
        {loggedIn ? "logged in" : "Logged out"}
        {userData?.name}
        {userData?._id}
        {userData?.email}
        {userData?.googleId}
        {userData?.role}
        {userData?.profilePhoto}
        {userData?.address}
        {userData?.phone}
        <Button
          onClick={() => refreshing()}
          className=" hover:bg-opacity-80 w-full rounded-sm text-white"
          variant="primary"
          type="submit"
        >
          hahah
        </Button>
      </div>
    </LayoutWrapper>
  );
};

export default Home;
