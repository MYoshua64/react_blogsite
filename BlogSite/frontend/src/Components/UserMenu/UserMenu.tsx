import { useEffect, useState } from "react";
import { User } from "../../Models/User.ts";
import "./UserMenu.css";
import { userStore } from "../../Services/Redux/UserState.ts";
import { modalStore } from "../../Services/Redux/ModalsState.ts";
import {
  loginUser,
  logoutUser,
  toggleModal,
} from "../../Services/Redux/Actions.ts";

function UserMenu(): JSX.Element {
  const [user, setUser] = useState<User>(User.Blank);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      userStore.dispatch(loginUser(storedToken));
    }

    getUserFromStore();

    const unsub = userStore.subscribe(() => {
      getUserFromStore();
    });

    return () => {
      unsub();
    };
  }, []);

  function getUserFromStore() {
    const storedUser = userStore.getState().user;
    if (storedUser !== null) {
      setUser(storedUser);
    }
    else setUser(User.Blank);
  }

  return (
    <div className="UserMenu">
      <span className="user-greeting">Hello, {user.userName}</span>
      {user.userName === "Guest" && (
        <div className="SiteLink">
          <a
            href="#"
            onClick={() => modalStore.dispatch(toggleModal("LoginModal"))}
          >
            Login
          </a>
        </div>
      )}
      {user.userName !== "Guest" && (
        <div className="SiteLink">
          <a href="#" onClick={() => {
            userStore.dispatch(logoutUser());
            window.location.reload();
          }}>
            Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
