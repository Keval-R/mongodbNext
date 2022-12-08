import { useState } from "react";
import styles from "../../styles/Home.module.css";

const AddPost = () => {
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    book_price: "",
    content: "",
    published: false,
    createdAt: new Date().toISOString(),
  });

  const submitData = async () => {
   
    let response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });

    let data = await response.json();
    if (data?.success) {
      alert("Sucessfully added new post");
    } else {
      alert("Try againSucessfully added new post");
    }
  };

  const setInputData = (e) => {
    postData[e.target.name] = e.target.value;
    setPostData(postData);
  };

  return (
    <main className={styles.main}>
        Fill Form
      <input
        type="text"
        name="title"
        onChange={(e) => setInputData(e)}
        placeholder="Title"
      />
      <input
        type="text"
        name="author"
        onChange={(e) => setInputData(e)}
        placeholder="Author"
      />
      <input
        type="text"
        name="book_price"
        onChange={(e) => setInputData(e)}
        placeholder="Book Price"
      />
      <textarea
        name="content"
        onChange={(e) => setInputData(e)}
        placeholder="Post content"
      />
      <input type="button" value="Submit" onClick={submitData} />
    </main>
  );
};

export default AddPost;
