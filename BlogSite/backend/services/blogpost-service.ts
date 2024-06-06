import { ResultSetHeader } from "mysql2";
import dal from "../dal";
import { BlogPost } from "../models/blog-post";

async function getAllPostsFromAccount(accountId: number): Promise<BlogPost[]> {
  const result = await dal.executeQuery(
    `
        SELECT * FROM posts AS p WHERE p.accountId = ? ORDER BY p.postDate DESC
    `,
    [accountId]
  );
  if (result.length > 0) {
    return result as unknown as BlogPost[];
  }
  throw new Error("Could not retrieve posts from this account");
}

async function makePost(basePost: BlogPost): Promise<BlogPost> {
  const result = await dal.executeQuery(
    `
        INSERT INTO posts VALUES(DEFAULT, ?, ?, ?)
    `,
    [basePost.accountId, basePost.postContent, basePost.postDate]
  );
  if ((result as unknown as ResultSetHeader).affectedRows > 0) {
    const addedPost = await dal.executeQuery(
      `
            SELECT * FROM posts WHERE postId = ?
        `,
      [(result as unknown as ResultSetHeader).insertId]
    );
    return addedPost[0] as unknown as BlogPost;
  }
  throw new Error("Could not add post");
}

async function getBlogFeed(accountId: number): Promise<BlogPost[]> {
  const result = await dal.executeQuery(
    `SELECT * FROM 
    (SELECT * FROM posts ORDER BY postDate DESC) as p WHERE p.accountId = ANY(
      SELECT followingId 
      FROM follow_lists
      WHERE followerId = ?
    ) 
    LIMIT 50`,
    [accountId]
  );
  if (result.length > 0) {
    return result as unknown as BlogPost[];
  }

  throw new Error("Could not retrieve feed at this time");
}

export default {
  getAllPostsFromAccount,
  makePost,
  getBlogFeed,
};
