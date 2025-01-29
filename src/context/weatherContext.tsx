"use client";
import { useContext, createContext, useState } from "react";
import { CityWeather } from "@/types/projectTypes";

type WeatherContextType = {
  cityWeather: CityWeather | undefined;
  setCityWeather: React.Dispatch<React.SetStateAction<CityWeather | undefined>>;
  loadingCityWeather: boolean;
  setLoadingCityWeather: React.Dispatch<React.SetStateAction<boolean>>;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [cityWeather, setCityWeather] = useState<CityWeather>();
  const [loadingCityWeather, setLoadingCityWeather] = useState<boolean>(false);

  return (
    <WeatherContext.Provider
      value={{
        cityWeather,
        setCityWeather,
        loadingCityWeather,
        setLoadingCityWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
