"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {IRecipes} from "@/app/models/recipes/IRecipes";
import {getAllRecipes, getRecipesByTagApi} from "@/app/service/api.service";
import {SearchBar} from "@/app/components/search/SearchBar";
import {RecipeList} from "@/app/components/recipe/RecipeList";
import {Pagination} from "@/app/components/pagination/Pagination";
const RecipesContainer = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const searchQuery = searchParams.get("q") || "";
    const tag = searchParams.get("tag") || "";

    useEffect(() => {
        fetchRecipes(page, searchQuery, tag).catch((error) =>
            console.error("Помилка отримання рецептів:", error)
        );
    }, [page, searchQuery, tag]);

    const fetchRecipes = async (page: number, query: string, tag: string) => {
        if (loading) return;
        setLoading(true);
        try {
            let response;
            if (tag) {
                response = await getRecipesByTagApi(tag, page);
            } else {
                response = await getAllRecipes(page, query);
            }
            setRecipes(response.recipes);
            setTotal(response.total);
        } catch (error) {
            console.error("Помилка отримання рецептів:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateParams = (params: Record<string, string>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, value);
            else newParams.delete(key);
        });

        router.push(`/recipes?${newParams.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        updateParams({page: newPage.toString()});
    };

    const handleSearch = (query: string) => {
        updateParams({page: "1", q: query, tag: ""});
    };

    const handleTagClick = (tag: string) => {
        updateParams({page: "1", tag, q: ""});
    };

    return (
        <div>
            <h1>Recipe list</h1>
            <SearchBar searchType="recipes" onSearch={handleSearch} search={searchQuery}/>
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <ul className="recipe-list">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <li key={recipe.id} className="recipe-item">
                                <RecipeList recipe={recipe} onTagClick={handleTagClick} />
                            </li>
                        ))
                    ) : (
                        <p>No recipes</p>
                    )}
                </ul>
            )}
            {total > 0 && (
                <Pagination totalPages={Math.ceil(total / 30)} currentPage={page} onPageChange={handlePageChange}/>
            )}
        </div>
    );
};

export default RecipesContainer;