import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Recepten App" },
    { name: "description", content: "Ontdek heerlijke recepten!" },
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", listStyle: "none", padding: 0 }}>
          {meals.map((meal: any) => (
            <div key={meal.idMeal} style={{ width: "200px" }}>
              <Link to={`/meal/${meal.idMeal}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={meal.strMealThumb} alt={meal.strMeal} width="100%" style={{ borderRadius: "8px" }} />
                <h3 style={{ fontSize: "1rem" }}>{meal.strMeal}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}