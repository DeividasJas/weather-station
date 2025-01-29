"use client";

import { getCityWeather, searchCity } from "@/actions/citiesActions";
import { useState } from "react";
import { toast } from "sonner";
import { CityObject } from "@/types/projectTypes";
import { useWeather } from "@/context/weatherContext";

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState<CityObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setCityWeather, setLoadingCityWeather } = useWeather();

  const handleCityClick = async (city: CityObject) => {
    try {
      setSearchResults([]);
      setLoadingCityWeather(true);
      const cityWeatherData = await getCityWeather(city);
      setCityWeather(cityWeatherData);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoadingCityWeather(false);
    }
  };
  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    try {
      if (value.trim()) {
        setIsLoading(true);
        const results = await searchCity(value);
        setSearchResults(results);

        if (results.length <= 0 && value.trim().length > 0) {
          toast.error("No cities found");
        }
      } else {
        setSearchResults([]);
      }
    } catch (error: any) {
      console.error(error);
      setSearchResults([]);
      toast.error("An error occurred while searching for cities");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        noValidate
        className="mb-4 flex flex-col items-center justify-center space-x-4"
      >
        <input
          type="search"
          name="cityName"
          id="cityName"
          placeholder="Enter city name"
          className="w-[300px] rounded-sm px-2 py-1 outline outline-2 outline-zinc-600 focus:outline-blue-500"
          onChange={handleSearchChange}
        />

        <div className="ml-0">
          <ul className="divide-y-2 px-2">
            {searchResults.length > 0 &&
              (isLoading ? (
                <p>Loading results...</p>
              ) : (
                searchResults.map((city, index) => {
                  return (
                    <li key={index} className="px-2">
                      <section
                        className="hover:text-blue-500"
                        onClick={() => handleCityClick(city)}
                      >
                        {city.name}, {city.state}, {city.country}
                      </section>
                    </li>
                  );
                })
              ))}
          </ul>
        </div>
      </form>
    </>
  );
}
