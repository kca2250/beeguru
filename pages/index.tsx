import { NextPage } from "next";
import Link from "next/link";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { client } from "../libs/client";

const Home: NextPage = ({ blogs }: any) => {
  return (
    <>
      <Header />
      <main>
        <ul>
          {blogs.map((blog: { id: string; title: string; content: string }) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`} passHref>
                {blog.title}
              </Link>
              <span dangerouslySetInnerHTML={{ __html: `${blog.content}` }} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
