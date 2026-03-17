import { Form, Link, useLoaderData } from "react-router";
import { useState } from "react";
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
    meals: mealData.meals || [],
  };
};

export default function Home() {
  const { categories, meals: loaderMeals } = useLoaderData<typeof loader>();
  const [meals, setMeals] = useState(loaderMeals);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    ).then((res) => res.json());
    setMeals(data.meals || []);
  };

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
      {/* Categories */}
      <div
        style={{
          background: "#eee",
          padding: "10px",
          borderRadius: "5px",
          gap: "25px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <strong>Categorieën: </strong>
        {categories.map((cat: any) => (
          <Link
            key={cat.idCategory}
            to={`/category/${cat.strCategory}`}
            style={{ marginRight: "10px" }}
          >
            {cat.strCategory}
          </Link>
        ))}
      </div>

      {/* Search Form */}
      <Form onSubmit={handleSearch} style={{ margin: "15px 0" }}>
        <input
          name="q"
          type="search"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      {/* Meals List */}
      <section>
        <h2>Meals List</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {meals.length === 0 ? (
            <p>No meals found.</p>
          ) : (
            meals.map((meal: any) => (
              <div key={meal.idMeal} style={{ width: "200px" }}>
                <Link
                  to={`/meal/${meal.idMeal}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width="100%"
                    style={{ borderRadius: "8px" }}
                  />
                  <h3 style={{ fontSize: "1rem" }}>{meal.strMeal}</h3>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}