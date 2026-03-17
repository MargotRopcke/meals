import { useLoaderData } from "react-router"
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
    <>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} />
      <p>{meal.strInstructions}</p>
    </>
  )
}
