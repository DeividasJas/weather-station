Objective
Create a simple weather application that fetches weather data from a public API and displays it to
the user. The application should allow users to search for weather information by city name.


Requirements:
* Setup Next.js Project with TypeScript ✅

Fetch Data from a Public API:
* Use the OpenWeatherMap API (free tier) to fetch weather data. ✅
* Sign up for an API key if you don’t have one. ✅

Create a Search Feature:
* Add a search bar where users can input a city name. ✅
* Fetch weather data for the entered city and display it on the page. 

Display Weather Data:
* City name ✅
* Temperature (in Celsius) ✅
* Weather condition (e.g., "Clear", "Cloudy") ✅
* Humidity ✅
* Wind speed ✅

Error Handling:
* Handle errors gracefully (e.g., if the city is not found or the API request fails). ✅
* Display a user-friendly error message. ✅

Optional: Add a Loading State:
* Show a loading spinner or message while the API request is in progress. ✅

Bonus Points:
* Implement usage statistics tracking and display them on a separate page. ✅



How search works:
1. get city name from form
2. use the name to fetch OpenWeatherApi
3. if city is valid:
    3.1 display current weather data
    3.2 add city to db
    3.3 increment cityCount in db
