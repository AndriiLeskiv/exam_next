import {FC} from "react";
import Link from "next/link";
import {IRecipes} from "@/app/models/recipes/IRecipes";

type Props = {
    selectedRecipe: IRecipes;
};

const RecipeDetailPage: FC<Props> = ({ selectedRecipe }) => {
    if (!selectedRecipe) return <p>No recipe details available.</p>;

    console.log("selectedRecipes", selectedRecipe);
    return (
        <div className="details_result">
            <h1>{selectedRecipe.name}</h1>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} width="300"/>
            <p><strong>Ingredients:</strong></p>
            <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <p><strong>Instruction:</strong></p>
            <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>

            <p><strong>Cooking time:</strong> {selectedRecipe.prepTimeMinutes} min.</p>
            <p><strong>Calories per serving:</strong> {selectedRecipe.caloriesPerServing}</p>
            <p><strong>Kitchen:</strong> {selectedRecipe.cuisine}</p>
            {selectedRecipe.userId ? (
                <p>This recipe was created by: <Link href={`/users/${selectedRecipe.userId}`}>View profile</Link></p>
            ) : (
                <p>Author information not available.</p>
            )}
        </div>
    );
};

export default RecipeDetailPage;