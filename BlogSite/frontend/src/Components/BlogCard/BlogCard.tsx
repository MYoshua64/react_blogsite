import { useEffect, useState } from "react";
import { BlogPost } from "../../Models/BlogPost";
import "./BlogCard.css";
import { Account } from "../../Models/Account";
import { accountStore } from "../../Services/Redux/AccountState";

interface BlogCardProps{
    post:BlogPost;
}

function BlogCard(props:BlogCardProps): JSX.Element {

    const [account, setAccount] = useState<Account>();

    useEffect(() => {
        const accounts = accountStore.getState().accounts;
        setAccount(accounts.find(a => a.accountId === props.post.accountId));
    }, [])

    return (
        <div className="BlogCard">
			<div className="AccountInfo">
                <h3>{account?.displayName}</h3>
                <p>{props.post.displayDate}</p>
            </div>
            <div className="PostDetails">
                <p>{props.post.postContent}</p>
            </div>
        </div>
    );
}

export default BlogCard;
