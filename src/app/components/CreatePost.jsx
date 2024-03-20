"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const postMethod = async (e) => {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    setText("");
    router.refresh();
  };

  return (
    <form onSubmit={postMethod}>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="What's your message?"
      />
      <button>Post Message</button>
    </form>
  );
};
export default CreatePost;
