"use server";
import { prisma } from "@/utils/prismaClient";
import { CityObject, ServiceResponse } from "@/types/projectTypes";
import { addNewCity } from "./citiesActions";

export const incrementStatistics = async (
  city: CityObject,
): Promise<ServiceResponse> => {
  try {
    const addCityResults = await addNewCity(city);

    if (!addCityResults.success) {
      console.log("add city result from increment", addCityResults);

      return addCityResults;
    }

    const updatedStatistics = await prisma.city.update({
      where: {
        name: city.name,
      },
      data: {
        searchCount: {
          increment: 1,
        },
      },
    });
    console.log(updatedStatistics);

    return { success: true, message: "Statistics updated" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error while incrementing statistics" };
  }
};

export const getStatistics = async (): Promise<ServiceResponse> => {
  try {
    const mostSearchedCities = await prisma.city.findMany({
      orderBy: {
        searchCount: "desc",
      },
      take: 20,
    });
    return {
      success: true,
      data: mostSearchedCities,
      message: "Successfully fetched most searched cities",
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error while fetching statistics" };
  }
};
