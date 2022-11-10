type Categories = {
  name: string;
}[];

export const Categories: React.FC<{ categories: Categories }> = ({
  categories,
}) => {
  return (
    <div className="bg-gray-100 px-4 py-6">
      <h3 className="font-extrabold">CATEGORIES</h3>
      {categories.map((category: { name: string }, index: number) => (
        <small className="py-2 px-2" key={`category-${index}`}>
          #{category.name}
        </small>
      ))}
    </div>
  );
};
