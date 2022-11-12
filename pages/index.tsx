import { NextPage } from "next";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { About } from "../components/About";
import { Categories } from "../components/Categories";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { client } from "../libs/client";
import { formatDate } from "../libs/formatDate";
import { Blog } from "../models/blog";
import { Category } from "../models/category";

const Home: NextPage<{
  blogs: Pick<Blog, "title" | "publishedAt" | "id" | "category">[];
  categories: Category[];
}> = ({ blogs, categories }) => {
  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="my-3 px-4">
        <ul>
          {blogs.length === 0 && <p>記事が見つかりません</p>}
          {blogs.map((blog) => {
            const publishedAt = formatDate(blog.publishedAt);
            return (
              <li className="pb-3" key={blog.id}>
                <Link href={`/${blog.id}`} passHref>
                  <div className="flex items-center gap-3">
                    <small className="bg-slate-600 text-white px-1 rounded">
                      {publishedAt}
                    </small>
                    <small className="text-slate-600">
                      #{blog.category.name}
                    </small>
                  </div>
                  <p className="py-1 text-cyan-700 hover:text-cyan-500  hover:decoration-cyan-500 hover:underline">
                    {blog.title}
                  </p>
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
  const data = await client.get({
    endpoint: "blogs",
    queries: { orders: "-publishedAt" },
  });
  const category = await client.get({ endpoint: "categories" });

  return {
    props: {
      blogs: data.contents,
      categories: category.contents,
    },
  };
};

export default Home;
