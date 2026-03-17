import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async () => {
  const catData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  ).then((res) => res.json());

  const mealData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
  ).then((res) => res.json());

  return {
    categories: catData.categories || [],
    meals: mealData.meals || []
  };
};

export default function Home() {
  const { categories, meals } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>

      <div style={{ background: "#eee", padding: "10px", borderRadius: "5px", gap: "25px", display: "flex", flexWrap: "wrap" }}>
        <strong>Categorieën: </strong>
        {categories.map((cat: any) => (
          <Link key={cat.idCategory} to={`/category/${cat.strCategory}`} style={{ marginRight: "10px" }}>
            {cat.strCategory}
          </Link>
        ))}
      </div>

      <section>
        <h2>Meals List</h2>
        <ul>
          {meals.map((meal: any) => (
            <li key={meal.idMeal} className="meal-card">
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} width={200} /> 

              <ul>
                {Array.from({ length: 20 }, (_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`];
                  const measure = meal[`strMeasure${i + 1}`];
                  return ingredient?.trim() ? (
                    <li key={i}>{ingredient} - {measure}</li>
                  ) : null;
                })}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}