import Link from "next/link";

type Categories = {
  name: string;
  id: string;
}[];

export const Categories: React.FC<{ categories: Categories }> = ({
  categories,
}) => {
  return (
    <div className="bg-gray-100 px-4 py-6 flex flex-col">
      <h3 className="font-extrabold">CATEGORIES</h3>
      {categories.map(
        (category: { name: string; id: string }, index: number) => (
          <Link key={`category-${index}`} href={`/category/${category.id}`}>
            <small className="py-[2px]">#{category.name}</small>
          </Link>
        )
      )}
    </div>
  );
};
