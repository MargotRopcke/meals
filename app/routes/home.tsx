import { Form } from "react-router";
import { useState } from "react";

export const loader = async () => {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
  ).then((res) => res.json());
  return { meals: data.meals || [] };
};

const Home = ({ loaderData }: { loaderData: { meals: any[] } }) => {
  const [meals, setMeals] = useState(loaderData.meals);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    ).then((res) => res.json());
    setMeals(data.meals || []);
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <input
          name="q"
          type="search"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} width={200} />
              <p>{meal.strCategory}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;