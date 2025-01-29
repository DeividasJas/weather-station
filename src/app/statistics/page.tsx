import lookup from "country-code-lookup";
import { getStatistics } from "@/actions/statisticsActions";
import { Metadata } from "next";
import { City } from "@prisma/client";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Most searched cities statistics",
};

export default async function page() {
  const response = await getStatistics();

  if (!response.success) {
    return (
      <div className="text-center">
        <h1 className="text-3xl">Statistics</h1>
        <p className="text-red-500">Error: {response.error}</p>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-center text-3xl">Statistics</h1>
      {response && response.data?.length > 2 && (
        <h3 className="my-4 text-center text-xl">
          Top {response.data.length} cities by search:
        </h3>
      )}
      <ul className="mx-auto flex max-w-[300px] flex-col divide-y-2">
        {response.data.map((city: City) => {
          const countryName = lookup.byIso(city.country);
          return (
            <li key={city.id}>
              <span className="font-bold">{city.name}</span>,{" "}
              {countryName?.country}
              <br />
              Search count: {city.searchCount}
            </li>
          );
        })}
      </ul>
    </>
  );
}
