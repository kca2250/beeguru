import Link from "next/link";

type Categories = {
  name: string;
  id: string;
}[];

export const Categories: React.FC<{ categories: Categories }> = ({
  categories,
}) => {
  return (
    <div className=" p-4 flex flex-col rounded-lg">
      <h3 className="font-extrabold">CATEGORIES</h3>
      {categories.length === 0 && (
        <small className="py-[2px]">カテゴリーが見つかりません</small>
      )}
      <div className="flex items-center gap-2">
        {categories.map(
          (category: { name: string; id: string }, index: number) => (
            <Link key={`category-${index}`} href={`/category/${category.id}`}>
              <p className="py-[2px] underline">#{category.name}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
