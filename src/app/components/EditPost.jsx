"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditPost = ({ post, setShowModal }) => {
  const [text, setText] = useState(post.text);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    setShowModal(false);
    router.refresh();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Edit Post</button>
        <button type="reset" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </form>
    </main>
  );
};
export default EditPost;
