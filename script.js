const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const resultBox = document.getElementById("resultBox");

function handleSearch() {
  const query = input.value.trim();

  if (!query) {
    resultBox.innerHTML = "<p class='text-red-500'>Please enter a search term.</p>";
    return;
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const meals = data.meals;

      if (!meals) {
        resultBox.innerHTML = `<p class="text-gray-500">No meals found for "${query}".</p>`;
        return;
      }

      let html = `<h2 class="text-xl font-bold mb-4">Results for "${query}":</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

      meals.forEach(meal => {
        html += `
          <div class="border rounded p-4 shadow bg-white">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover rounded mb-2">
            <h3 class="text-lg font-semibold">${meal.strMeal}</h3>
            <p class="text-sm text-gray-600">Category: ${meal.strCategory || 'N/A'}</p>
            <p class="text-sm text-gray-600">Area: ${meal.strArea || 'N/A'}</p>
          </div>
        `;
      });

      html += `</div>`;
      resultBox.innerHTML = html;
    })
    .catch(err => {
      resultBox.innerHTML = `<p class="text-red-500">Error fetching meals.</p>`;
      console.error(err);
    });
}

button.addEventListener("click", handleSearch);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});
