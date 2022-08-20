import "./navigation.scss";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { exitCurrentUser } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(exitCurrentUser());
  };

  return (
    <>
      <div className="navigation">
        <Link to="/">
          <span onClick={handleLogout}>{currentUser ? "Выйти" : ""}</span>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
