import { useEffect, useState } from "react";
import "./LoginModal.css";
import { useForm } from "react-hook-form";
import { Credentials } from "../../Models/Credentials";
import UserService from "../../Services/User-Service";
import { modalStore } from "../../Services/Redux/ModalsState";
import { toggleModal } from "../../Services/Redux/Actions";

function LoginModal(): JSX.Element {

  const {register, handleSubmit} = useForm<Credentials>();
  const [modalClass, setModalClass] = useState<string>("LoginModal");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = modalStore.subscribe(() => {
      if (modalStore.getState().openModal === "LoginModal"){
        setModalClass("LoginModal-active");
      }
      else setModalClass("LoginModal");
    })

    return (() => {
      unsubscribe();
    })
  }, [])

  async function onFormSubmit(data:Credentials){
    setButtonDisabled(true);
    const loginCredentials = new Credentials(data);
    const token = await UserService.authUser(loginCredentials);
    if (token !== undefined){
      //login successful, we reload
      window.location.reload();
    }
    else setButtonDisabled(false);
  }

  return (
    <div className={modalClass}>
      {modalClass === "LoginModal-active" && (
        <div className="LoginWindow">
          <div className="LoginWindow-closeBTN SiteLink">
            <a href="#" onClick={() => modalStore.dispatch(toggleModal("LoginModal"))}>
              X
            </a>
          </div>
          <form className="LoginForm" onSubmit={handleSubmit(onFormSubmit)}>
            <h1>Login</h1>
            <div className="field-wrapper">
              <label htmlFor="username">Username:</label>
              <input type="text" required minLength={2} {...register("userName")}/>
            </div>
            <div className="field-wrapper">
              <label htmlFor="password">Password:</label>
              <input type="password" required minLength={2} {...register("password")}/>
            </div>
            <a href="#">Forgot Password?</a>
            <div className="SiteLink">
              <button disabled = {buttonDisabled} >Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
