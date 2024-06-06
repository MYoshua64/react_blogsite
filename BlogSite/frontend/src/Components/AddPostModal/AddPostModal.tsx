import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BlogPost } from "../../Models/BlogPost";
import "./AddPostModal.css";
import { toggleModal } from "../../Services/Redux/Actions";
import { modalStore } from "../../Services/Redux/ModalsState";
import { accountStore } from "../../Services/Redux/AccountState";
import { userStore } from "../../Services/Redux/UserState";
import BlogPostService from "../../Services/BlogPost-Service";

function AddPostModal(): JSX.Element {
  const { register, handleSubmit } = useForm<BlogPost>();
  const [modalClass, setModalClass] = useState<string>("AddPostModal");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = modalStore.subscribe(() => {
      if (modalStore.getState().openModal === "AddPostModal"){
        setModalClass("AddPostModal-active");
      }
      else setModalClass("AddPostModal");
    })

    return (() => {
      unsubscribe();
    })
  }, [])

  function onFormSubmit(post:BlogPost){
    setButtonDisabled(true);
    const currentUser = userStore.getState().user;
    if (currentUser){
        const currentAccount = accountStore.getState().accounts.find(a => a.userId === currentUser.userId);
        if (currentAccount){
            post.accountId = currentAccount.accountId;
        }
    }
    post.postDate = new Date().toISOString();
    
    BlogPostService.addPost(post)
    .then(() => window.location.reload())
    .catch(() => setButtonDisabled(false));
  }

  return (
    <div className={modalClass}>
      {modalClass === "AddPostModal-active" && (
        <div className="AddPostWindow">
        <div className="AddPostWindow-closeBTN SiteLink">
          <a href="#" onClick={() => modalStore.dispatch(toggleModal("AddPostModal"))}>
            X
          </a>
        </div>
        <form className="LoginForm" onSubmit={handleSubmit(onFormSubmit)}>
          <h1>Add Post</h1>
          <div className="field-wrapper">
            <label htmlFor="post-content">Post Content:</label><br />
            <textarea cols={50} rows={10} {...register("postContent")}></textarea>
          </div>
          <br />
          <div className="SiteLink">
            <button disabled = {buttonDisabled} >Post</button>
          </div>
        </form>
      </div>
        )}
    </div>
  );
}

export default AddPostModal;
