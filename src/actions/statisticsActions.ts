"use server";
import { prisma } from "@/utils/prismaClient";
import { CityObject } from "@/types/projectTypes";
import { addNewCity } from "./citiesActions";

export const incrementStatistics = async (city: CityObject) => {
  try {
    await addNewCity(city);
    await prisma.city.update({
      where: {
        name: city.name,
      },
      data: {
        searchCount: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getStatistics = async () => {
  try {
    const mostSearchedCities = await prisma.city.findMany({
      orderBy: {
        searchCount: "desc",
      },
      take: 20,
    });
    return mostSearchedCities;
  } catch (error) {
    console.error(error);
  }
};
