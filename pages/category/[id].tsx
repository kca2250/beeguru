import Link from "next/link";
import { About } from "../../components/About";
import { Categories } from "../../components/Categories";
import { Footer } from "../../components/layouts/Footer";
import { Header } from "../../components/layouts/Header";
import { client } from "../../libs/client";
import { formatDate } from "../../libs/formatDate";
import { Blog } from "../../models/blog";
import { Category } from "../../models/category";
import { ParamsNextPageContext } from "../../models/nextPageContext";

const Category: React.FC<{
  blogs: Pick<Blog, "publishedAt" | "id" | "title">[];
  category: Pick<Category, "name">[];
  categories: Category[];
}> = ({ blogs, category, categories }) => {
  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="p-4 my-3 max-w-screen-md ">
        <p className="pb-4">
          <span className="text-lg font-semibold pr-2">
            #{category[0].name}
          </span>
          の記事一覧
        </p>
        {blogs.length === 0 && <p className="mt-5">記事が見つかりません</p>}
        <ul>
          {blogs.map((blog) => {
            const publishAt = formatDate(blog.publishedAt);
            return (
              <li className="pb-3" key={blog.id}>
                <Link href={`/${blog.id}`} passHref>
                  <small className="bg-slate-600 text-white px-1 rounded">
                    {publishAt}
                  </small>
                  <p className="text-cyan-700 hover:text-cyan-500  hover:decoration-cyan-500 hover:underline">
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

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map(
    (category: { id: string }) => `/category/${category.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (ctx: ParamsNextPageContext) => {
  const id = ctx.params.id;
  const blog = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}`, orders: "-publishedAt" },
  });
  const category = await client.get({
    endpoint: "categories",
    queries: { filters: `id[equals]${id}` },
  });

  const categories = await client.get({ endpoint: "categories" });

  return {
    props: {
      blogs: blog.contents,
      category: category.contents,
      categories: categories.contents,
    },
  };
};

export default Category;
