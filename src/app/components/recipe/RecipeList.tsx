import Link from "next/link";
import "./RecipeList.css";
import {IRecipes} from "@/app/models/recipes/IRecipes";

interface RecipeListProps {
    recipe: IRecipes;
    onTagClick: (tag: string) => void;
}

export const RecipeList = ({ recipe, onTagClick }: RecipeListProps) => {
    return (
        <div className="recipe-item">
            <Link href={`/recipes/${recipe.id}`} className="recipe-title">
                {recipe.name}
            </Link>

            <div className="recipe-tags">
                {recipe.tags?.map((tag, index) => (
                    <span key={index} className="tag" onClick={() => onTagClick(tag)}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};