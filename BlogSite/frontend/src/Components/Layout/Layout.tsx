import { useMediaQuery } from "react-responsive";
import AddPostModal from "../AddPostModal/AddPostModal.tsx";
import AppHeader from "../AppHeader/AppHeader.tsx";
import LoginModal from "../LoginModal/LoginModal.tsx";
import Routing from "../Routing/Routing.tsx";
import "./Layout.css";

function Layout(): JSX.Element {
  const isTablet = useMediaQuery({query:"screen and (max-width:1024px)"});
  const isMobile = useMediaQuery({query: "screen and (max-width: 767px)"});
  return (
    <div className="Layout">
      <header className="LayoutHeader">
        <AppHeader />
      </header>
      <main className="app-main">
        {!isTablet && <div className="Container-Left"></div>}
        <div className="Container-Middle">
          <Routing />
        </div>
        {!isTablet && <div className="Container-Right"></div>}
      </main>
      <LoginModal />
      <AddPostModal />
      {isMobile && (
        <div className="Fixed-top-right">
          <div className="SiteLink">
            <span>Menu</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
