import { useMediaQuery } from "react-responsive";
import Navbar from "../Navbar/Navbar.tsx";
import UserMenu from "../UserMenu/UserMenu.tsx";
import "./AppHeader.css";

function AppHeader(): JSX.Element {
    const isMobile = useMediaQuery({query: 'Screen and (max-width: 767px)'});
    return (
        <div className="AppHeader">
			{!isMobile && <h1>Blog Site</h1>}
            {isMobile && <h3>Blog Site</h3>}
            {!isMobile && <Navbar />}
            <UserMenu />
        </div>
    );
}

export default AppHeader;
