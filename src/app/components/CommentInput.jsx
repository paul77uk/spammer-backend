"use client";

import { useState } from "react";

const CommentInput = ({ post, setShowCommentInput, getComments }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    setText("");
    setShowCommentInput(false);
    getComments();
  };

  return (
    <main className="commentInput">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reply to this message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Reply</button>
        <button type="reset" onClick={() => setShowCommentInput(false)}>
          Cancel
        </button>
      </form>
    </main>
  );
};
export default CommentInput;
