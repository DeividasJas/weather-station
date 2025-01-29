"use client";
import { useWeather } from "@/context/weatherContext";
import Image from "next/image";
export default function CurrentCityWeather() {
  const { cityWeather, loadingCityWeather } = useWeather();

  if (!cityWeather) return;

  return loadingCityWeather ? (
    <p className="text-center">Loading city data</p>
  ) : (
    <div className="flex flex-col items-center border">
      <h2 className="text-3xl">{cityWeather?.name}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@2x.png`}
        alt="Weather conditions"
        width={100}
        height={100}
      />
      <ul>
        <li>Temperature: {cityWeather?.main.temp}°C</li>
        <li>Conditions: {cityWeather?.weather[0].description}</li>
        <li>Humidity: {cityWeather?.main.humidity}</li>
        <li>Wind speed: {cityWeather?.wind.speed}</li>
      </ul>
    </div>
  );
}
