import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async () => {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
  ).then((res) => res.json());
  return { meals: data.meals || [] };
};

const Home = ({ loaderData }: { loaderData: { meals: any[] } }) => {
  const { meals } = loaderData;

  return (
    <div>

      <h2>Meals List</h2>

      {meals.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal} className="meal-card">
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} width={200} />
              <p><strong>Category:</strong> {meal.strCategory}</p>
              <p><strong>Area:</strong> {meal.strArea}</p>
              <p><strong>Instructions:</strong> {meal.strInstructions}</p>

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
      )}
    </div>
  );
};

export default Home;