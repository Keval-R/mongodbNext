import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const PostList = ({ posts }) => {
  const router = useRouter();
  const deletePost = async (id) => {
    try {
      let response = await fetch("/api/posts", {
        method: "DELETE",
        body: id,
      });

      let data = await response.json();
      alert(data?.message);
      return router.push(router.asPath);
    } catch (error) {
      return false;
    }
  };

  const punlishPost = async (id, isPublished) => {
    console.log("post", id);
    try {
      // Update post
      await fetch("/api/posts", {
        method: "PUT",
        body: JSON.stringify({ id: id, isPublished: !isPublished }),
      });

      // reload the page
      return router.push(router.asPath);
    } catch (error) {
      // Stop publishing state
      return false;
    }
  };

  const list =
    posts?.length !== 0 &&
    posts?.map((data, index) => {
      return (
        <tr key={index}>
          <td> {index + 1}</td>
          <td> {data?.title}</td>
          <td> {new Date(data?.createdAt).toLocaleDateString()}</td>
          <td style={{ justifyContent: "center", display: "flex" }}>
            <button
              type="button"
              onClick={() => {
                punlishPost(data?._id, data?.published);
              }}
            >
              {data?.published ? "Unpublish" : "Publish"}
            </button>
          </td>
          <td>
            <button
              type="button"
              onClick={() => {
                deletePost(data?._id);
              }}
            >
              {"Delete"}
            </button>
          </td>
        </tr>
      );
    });
  return (
    <>
      <div style={{ justifyContent: "right", display: "flex" }}>
        <Link href={"./AddPost"}>
          <h1>Add post</h1>
        </Link>
      </div>
      <main className={styles.main}>
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>Title</td>
              <td>Created Date</td>
              <td>Publich/Unpublish</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </main>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  // let dev = process.env.NODE_ENV !== "production";
  // let { DEV_URL, PROD_URL } = process.env;
  let protocol = "https://";
  let host = req ? req.headers.host : window.location.hostname;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  let response = await fetch(`${protocol}${host}/api/posts`);
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

export default PostList;
