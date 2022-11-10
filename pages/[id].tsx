import { About } from "../components/About";
import { Categories } from "../components/Categories";
import { Footer } from "../components/layouts/Footer";
import { Header } from "../components/layouts/Header";
import { client } from "../libs/client";

const BlogId = (data: {
  blog: {
    title: string;
    updatedAt: string;
    content: string;
    category: { name: string };
  };
}) => {
  const year = new Date(data.blog.updatedAt).getFullYear();
  const month = new Date(data.blog.updatedAt).getMonth();
  const day = new Date(data.blog.updatedAt).getDay();

  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="p-4 mx-auto my-5 max-w-screen-md ">
        <h1 className="pb-4">{data.blog.title}</h1>
        <div className="flex items-center gap-3 pb-3 mb-4 border-b">
          <small className="bg-slate-600 text-white px-1 rounded">{`${year}年${month}月${day}日`}</small>
          <small className="underline">#{data.blog.category.name}</small>
        </div>
        <article
          dangerouslySetInnerHTML={{
            __html: `${data.blog.content}`,
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
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });
  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
