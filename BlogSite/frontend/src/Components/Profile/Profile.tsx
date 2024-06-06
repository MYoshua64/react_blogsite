import { useEffect, useState } from "react";
import "./Profile.css";
import { userStore } from "../../Services/Redux/UserState";
import { accountStore } from "../../Services/Redux/AccountState";
import BlogPostService from "../../Services/BlogPost-Service";
import BlogCard from "../BlogCard/BlogCard";
import { BlogPost } from "../../Models/BlogPost";
import LoginChecker from "../LoginChecker/LoginChecker";
import { modalStore } from "../../Services/Redux/ModalsState";
import { toggleModal } from "../../Services/Redux/Actions";

function Profile(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const currentUser = userStore.getState().user;
    const currentAccount = accountStore
      .getState()
      .accounts.find((a) => a.userId === currentUser?.userId);
    if (currentAccount) {
      BlogPostService.getPostsFromAccount(currentAccount?.accountId).then(
        (data) => setPosts(data)
      );
    }
  }, []);

  return (
    <LoginChecker>
      <div className="Profile">
        <div className="Sticky">
          <div className="SiteLink">
            <a href="#" onClick={() => modalStore.dispatch(toggleModal("AddPostModal"))}>Add Post</a>
          </div>
        </div>
        {posts.map((p) => (
          <BlogCard key={p.postId} post={p} />
        ))}
      </div>
    </LoginChecker>
  );
}

export default Profile;
