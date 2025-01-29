import SearchBar from "../components/SearchBar";
import CityCurrentWeather from "@/components/CurrentCityWeather";

export default function Home() {
  return (
    <>
      <h1 className="text-center my-4">Weather station ✌️</h1>
      <SearchBar />
      <CityCurrentWeather />
    </>
  );
}
