import React from "react";
import { Category } from "../types";
import { MdOutlineArticle } from "react-icons/md";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-scroll pb-4 hide-scrollbar">
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-md whitespace-nowrap ${
          selectedCategory === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <MdOutlineArticle className="text-3xl" />
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex flex-col items-center px-4 py-2 rounded-sm whitespace-nowrap ${
            selectedCategory === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <category.icon className="text-3xl" />
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
