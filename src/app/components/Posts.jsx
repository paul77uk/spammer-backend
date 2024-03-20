import Post from "./Post.jsx";

const Posts = async () => {
  const response = await fetch(`${process.env.API_URL}/api/posts`, { cache: "no-store" });
  const data = await response.json();
  const posts = data.posts;

  return (
    <div id="messages">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};
export default Posts;
