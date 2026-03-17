import { useLoaderData, Link } from "react-router"
import type { Route } from "./+types/meal"

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`,
  )
  const data = await res.json()
  return { meal: data.meals[0] }
}

export default function Meal() {
  const { meal } = useLoaderData<typeof loader>()

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Link to="/">← Terug naar overzicht</Link>

      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width={300} style={{ borderRadius: "10px" }} />

      <h3>Ingrediënten</h3>
      <ul>
        {Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];

          return ingredient?.trim() ? (
            <li key={i}>
              <strong>{ingredient}</strong> - {measure}
            </li>
          ) : null;
        })}
      </ul>

      <h3>Instructies</h3>
      
      <p style={{ lineHeight: "1.6", whiteSpace: "pre-line" }}>
        {meal.strInstructions}
      </p>
    </div>
  );
}
