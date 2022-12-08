import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo with mongodb & Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles?.main}>
        <Link href={"PostList"}>List Post Data</Link>
        <Link href={"AddPost"}>Add new Post</Link>
      </main>
    </div>
  );
}
