import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Songfinch Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 50 72"
              width="64"
              height="64"
            >
              <path
                fill="currentColor"
                d="M4.435 8.367A4.44 4.44 0 0 0 0 12.803v16.215a4.44 4.44 0 0 0 4.435 4.436 4.44 4.44 0 0 0 4.436-4.436V12.803a4.44 4.44 0 0 0-4.436-4.436ZM17.989 0a4.44 4.44 0 0 0-4.436 4.435v32.953a4.44 4.44 0 0 0 4.436 4.435 4.44 4.44 0 0 0 4.435-4.435V4.434A4.44 4.44 0 0 0 17.99 0ZM17.989 52.14a4.44 4.44 0 0 0-4.436 4.435v10.988a4.44 4.44 0 0 0 4.436 4.435 4.44 4.44 0 0 0 4.435-4.435V56.575a4.44 4.44 0 0 0-4.435-4.435ZM31.54 31.719a4.44 4.44 0 0 0-4.435 4.435v31.41A4.44 4.44 0 0 0 31.541 72a4.44 4.44 0 0 0 4.435-4.436v-31.41a4.438 4.438 0 0 0-4.435-4.435ZM31.54 0a4.44 4.44 0 0 0-4.435 4.435v10.982a4.44 4.44 0 0 0 4.436 4.435 4.44 4.44 0 0 0 4.435-4.435V4.435A4.437 4.437 0 0 0 31.541 0ZM45.094 7.91a4.44 4.44 0 0 0-4.435 4.435v3.07a4.44 4.44 0 0 0 4.435 4.436 4.44 4.44 0 0 0 4.435-4.436v-3.07a4.438 4.438 0 0 0-4.435-4.435ZM4.435 52.14A4.44 4.44 0 0 0 0 56.575v3.07a4.44 4.44 0 0 0 4.435 4.436 4.44 4.44 0 0 0 4.436-4.436v-3.07a4.44 4.44 0 0 0-4.436-4.435ZM45.094 40.988a4.44 4.44 0 0 0-4.435 4.435v14.224a4.44 4.44 0 0 0 4.435 4.436 4.44 4.44 0 0 0 4.435-4.436V45.423a4.438 4.438 0 0 0-4.435-4.435Z"
              />
            </svg>
          </div>
          <h1>Songfinch Intranet powered by Notion's API</h1>
          <p>
            This is a basic example of a site with data pulled from Notion's
            API. All of this data comes from{" "}
            <a target="_blank" href={`https://www.notion.so/${databaseId}`}>
              this Notion table
            </a>
            .
          </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts?.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>Read post →</Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
