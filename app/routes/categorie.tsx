import { Link, useLoaderData, useParams } from "react-router";
import type { Route } from "./+types/categorie";

export const loader = async ({ params }: Route.LoaderArgs) => {
    const { categoryName } = params;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    const data = await res.json();

    return {
        meals: data.meals || [],
        categoryName
    };
};

export default function CategoryPage() {
    const { meals, categoryName } = useLoaderData<typeof loader>();

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/">← Terug naar alle categorieën</Link>
            <h1 style={{ marginTop: "20px" }}>Maaltijden in {categoryName}</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px"
            }}>
                {meals.map((meal: any) => (
                    <div key={meal.idMeal} style={{ border: "1px solid #eee", padding: "10px", borderRadius: "8px" }}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%", borderRadius: "4px" }} />
                        <h4>{meal.strMeal}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}