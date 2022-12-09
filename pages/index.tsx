import { NextPage } from "next";
import Link from "next/link";
import { Layouts } from "../components/layouts";
import { client } from "../libs/client";
import { formatDate } from "../libs/formatDate";
import { Blog } from "../models/blog";
import { Category } from "../models/category";

const Home: NextPage<{
  blogs: Pick<Blog, "title" | "publishedAt" | "id" | "category">[];
  categories: Category[];
}> = ({ blogs, categories }) => {
  return (
    <Layouts categories={categories}>
      <ul>
        {blogs.length === 0 && <p>記事が見つかりません</p>}
        {blogs.map((blog) => {
          const publishedAt = formatDate(blog.publishedAt);
          return (
            <li className="pb-3 before:contents" key={blog.id}>
              <div className="flex items-center gap-3">
                <small className="bg-slate-600 text-white px-1 rounded">
                  {publishedAt}
                </small>
                <Link href={`/category/${blog.category.id}`}>
                  <small className="text-slate-600 hover:underline">
                    #{blog.category.name}
                  </small>
                </Link>
              </div>
              <Link href={`/${blog.id}`} passHref>
                <p className="py-1 text-cyan-700 hover:text-cyan-500  hover:decoration-cyan-500 hover:underline">
                  {blog.title}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layouts>
  );
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: { orders: "-publishedAt" },
  });
  const categories = await client.get({ endpoint: "categories" });

  return {
    props: {
      blogs: data.contents,
      categories: categories.contents,
    },
  };
};

export default Home;
