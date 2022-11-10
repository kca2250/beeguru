import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { About } from "../../components/About";
import { Categories } from "../../components/Categories";
import { Footer } from "../../components/layouts/Footer";
import { Header } from "../../components/layouts/Header";
import { client } from "../../libs/client";

interface MyNextPageContext extends NextPageContext {
  params: {
    id: string;
  };
}

const Category: NextPage = ({ blogs, category, categories }: any) => {
  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="p-4 my-5 max-w-screen-md ">
        <h2>
          <span className="text-lg font-semibold pr-2">
            #{category[0].name}
          </span>
          の記事一覧
        </h2>
        {blogs.length === 0 && <p className="mt-5">記事が存在しません。</p>}
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

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map(
    (category: { id: string }) => `/category/${category.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (ctx: MyNextPageContext) => {
  const id = ctx.params.id;
  const blog = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}` },
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
