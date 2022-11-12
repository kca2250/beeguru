import { NextPage } from "next";
import { About } from "../components/About";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { client } from "../libs/client";
import { formatDate } from "../libs/formatDate";
import { Blog } from "../models/blog";
import { ParamsNextPageContext } from "../models/nextPageContext";

const BlogId: NextPage<{
  blog: Pick<Blog, "publishedAt" | "title" | "category" | "content">;
}> = ({ blog }) => {
  const publishAt = formatDate(blog.publishedAt);

  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="p-4 my-5 max-w-screen-md ">
        <h1 className="pb-4">{blog.title}</h1>
        <div className="flex items-center gap-3 pb-3 mb-4 border-b">
          <small className="bg-slate-600 text-white px-1 rounded">
            {publishAt}
          </small>
          <small className="underline">#{blog.category.name}</small>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
          }}
        />
      </main>

      <div>
        <About />
        <Footer />
      </div>
    </div>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const paths = data.contents.map(
    (content: { id: string }) => `/${content.id}`
  );
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: ParamsNextPageContext) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  console.log(data);
  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
