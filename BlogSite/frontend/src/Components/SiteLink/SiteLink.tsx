import { useEffect, useState } from "react";
import "./SiteLink.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface SiteLinkProps {
    href:string;
    linkText:string
	activeLink:string;
}

function SiteLink(props: SiteLinkProps): JSX.Element {

    const [linkClass, setLinkClass] = useState<string>();

    const location = useLocation();

    useEffect(() => {
        setLinkClass(
            location.pathname.includes(props.activeLink) ? "SiteLink-Active" : "SiteLink"
        );
        
    }, [location])

    return (
        <div className={linkClass}>
            <NavLink to={props.href}>{props.linkText}</NavLink>
        </div>
    );
}

export default SiteLink;
