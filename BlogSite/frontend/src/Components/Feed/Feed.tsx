import { useEffect, useState } from "react";
import LoginChecker from "../LoginChecker/LoginChecker";
import "./Feed.css";
import { BlogPost } from "../../Models/BlogPost";
import BlogPostService from "../../Services/BlogPost-Service";
import BlogCard from "../BlogCard/BlogCard";

function Feed(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>();

  useEffect(() => {
    BlogPostService.getBlogFeed().then((data) => setPosts(data));
  }, []);

  return (
    <LoginChecker>
      <div className="Feed">
        {posts?.map((p) => (
          <BlogCard post={p} key={p.postId} />
        ))}
      </div>
    </LoginChecker>
  );
}

export default Feed;
