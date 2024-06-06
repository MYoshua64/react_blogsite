import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../Home/Home";
import Feed from "../Feed/Feed";
import Profile from "../Profile/Profile";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default Routing;
