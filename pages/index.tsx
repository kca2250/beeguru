import { NextPage } from "next";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { About } from "../components/About";
import { Categories } from "../components/Categories";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { client } from "../libs/client";

const Home: NextPage = ({ blogs, categories }: any) => {
  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />

      <main className="my-4 px-4">
        <ul>
          {blogs.map((blog: any) => {
            const year = new Date(blog.publishedAt).getFullYear();
            const month = new Date(blog.publishedAt).getMonth();
            const day = new Date(blog.publishedAt).getDay();
            return (
              <li className="py-3" key={blog.id}>
                <Link href={`/${blog.id}`} passHref>
                  <div className="flex items-center gap-3">
                    <small className="bg-slate-600 text-white px-1 rounded">{`${year}年${month}月${day}日`}</small>
                    <small className="text-slate-600">
                      #{blog.category.name}
                    </small>
                  </div>
                  <h2 className="py-1 text-cyan-700 hover:text-cyan-500  hover:decoration-cyan-500 hover:underline">
                    {blog.title}
                  </h2>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <div>
        <About />
        <Categories categories={categories} />
        <Footer />
      </div>
    </div>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const category = await client.get({ endpoint: "categories" });

  console.log(category);
  return {
    props: {
      blogs: data.contents,
      categories: category.contents,
    },
  };
};

export default Home;
