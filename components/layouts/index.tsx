import React, { ReactNode } from "react";
import { Category } from "../../models/category";
import { About } from "../About";
import { Categories } from "../Categories";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layouts: React.FC<{
  children: ReactNode;
  categories: Pick<Category, "id" | "name">[];
}> = ({ children, categories }) => {
  return (
    <div
      className="mx-auto my-auto max-w-screen-md h-screen"
      style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className="px-4 my-3">{children}</main>
      <div>
        <About />
        <Categories categories={categories} />
        <Footer />
      </div>
    </div>
  );
};
