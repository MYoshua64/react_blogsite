import SiteLink from "../SiteLink/SiteLink.tsx";
import "./Navbar.css";

function Navbar(): JSX.Element {
    return (
        
        <div className="Navbar">
			<SiteLink href="/home" linkText="Home" activeLink="home"/>
			<SiteLink href="/feed" linkText="Feed" activeLink="feed"/>
			<SiteLink href="/profile" linkText="Profile" activeLink="profile"/>
        </div>
    );
}

export default Navbar;
