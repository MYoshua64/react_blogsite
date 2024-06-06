import { useEffect } from "react";
import { userStore } from "../../Services/Redux/UserState";
import { useNavigate } from "react-router-dom";
import { modalStore } from "../../Services/Redux/ModalsState";
import { toggleModal } from "../../Services/Redux/Actions";

interface LoginCheckerProps{
    children?: React.ReactNode;
}

function LoginChecker({ children } : LoginCheckerProps): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        checkIfUserLogged();

        const unsubscribe = userStore.subscribe(() => {
            checkIfUserLogged();
        })

        return (() => {
            unsubscribe();
        })
    }, [])

    function checkIfUserLogged(){
        const user = userStore.getState().user;
        if (!user){
            navigate("/home");
            modalStore.dispatch(toggleModal("LoginModal"));
        }
    }

    return (
        <>{children}</>
    )
}

export default LoginChecker;
