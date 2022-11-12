import { NextPage } from "next";
import { Layouts } from "../components/layouts";
import { client } from "../libs/client";
import { formatDate } from "../libs/formatDate";
import { Blog } from "../models/blog";
import { Category } from "../models/category";
import { ParamsNextPageContext } from "../models/nextPageContext";

const BlogId: NextPage<{
  blog: Pick<Blog, "publishedAt" | "title" | "category" | "content">;
  categories: Pick<Category, "id" | "name">[];
}> = ({ blog, categories }) => {
  const publishAt = formatDate(blog.publishedAt);

  return (
    <Layouts categories={categories}>
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
    </Layouts>
  );
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const paths = data.contents.map(
    (content: { id: string }) => `/${content.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps = async (context: ParamsNextPageContext) => {
  const id = context.params.id;
  const blog = await client.get({ endpoint: "blogs", contentId: id });
  const categories = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog,
      categories: categories.contents,
    },
  };
};

export default BlogId;
