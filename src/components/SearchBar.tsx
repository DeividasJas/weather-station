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
      setLoadingCityWeather(true);
      const results = await getCityWeather(city);

      if (results.success) {
        setCityWeather(results.data);
        setSearchResults([]);
      } else {
        toast.error(results.error);
      }
    } catch (error: any) {
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
      if (!value.trim()) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);

      const results = await searchCity(value);
      if (results.success) {
        setSearchResults(results.data);
        // if (results.data.length === 0) {
        //   toast.error("No cities found");
        // }
      } else {
        setSearchResults([]);
        throw new Error(results.error);
      }
    } catch (error: any) {
      console.error(error);
      setSearchResults([]);
      toast.error(error.message);
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
