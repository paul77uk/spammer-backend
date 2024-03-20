"use client";

import { useEffect, useState } from "react";
import EditPost from "./EditPost.jsx";
import { useRouter } from "next/navigation.js";
import Comments from "./Comments.jsx";
import CommentInput from "./CommentInput.jsx";

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getComments();
  }, []);

  const deleteRequest = async () => {
    await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    router.refresh();
  };

  const updateLikes = async () => {
    await fetch(`/api/posts/${post.id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: post.likes }),
    });
    router.refresh();
  };

  const getComments = async () => {
    const response = await fetch(`/api/posts/${post.id}/comments`, {
      method: "GET",
    });
    const data = await response.json();
    setComments(data.comments);
  };

  return (
    <div>
      <div className="message" key={post.id}>
        {!showModal ? (
          <div>
            {post.text}{" "}
            <span className="clud" onClick={() => setShowModal(true)}>
              ✏️
            </span>
            {!showCommentInput ? (
              <span id="cluds">
                <div className="clud" onClick={updateLikes}>
                  👍{post.likes}{" "}
                </div>
                <div className="clud" onClick={deleteRequest}>
                  🗑️
                </div>
                <div className="clud" onClick={() => setShowCommentInput(true)}>
                  💬
                </div>
              </span>
            ) : (
              <CommentInput
                post={post}
                setShowCommentInput={setShowCommentInput}
                getComments={getComments}
              />
            )}
            <Comments comments={comments} />
          </div>
        ) : (
          <EditPost post={post} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};
export default Post;
