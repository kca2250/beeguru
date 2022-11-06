import { Footer } from "../../components/layouts/Footer";
import { Header } from "../../components/layouts/Header";
import { client } from "../../libs/client";

const BlogId = (data: {
  blog: { title: string; publishedAt: string; content: string };
}) => {
  return (
    <>
      <Header />
      <main>
        <h1>{data.blog.title}</h1>
        <p>{data.blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${data.blog.content}`,
          }}
        />
      </main>
      <Footer />
    </>
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
