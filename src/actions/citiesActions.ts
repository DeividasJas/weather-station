"use server";
import { CityObject, ServiceResponse } from "@/types/projectTypes";
import { prisma } from "@/utils/prismaClient";
import { incrementStatistics } from "./statisticsActions";

const api_key = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

export const addNewCity = async (
  cityObject: CityObject,
): Promise<ServiceResponse> => {
  try {
    const existingCity = await prisma.city.findUnique({
      where: {
        name: cityObject.name,
      },
    });

    if (existingCity) {
      console.log("City already exists, skipping creation.");
      return {
        success: true,
        message: "City already exists",
      };
    }

    const newCity = await prisma.city.create({
      data: {
        name: cityObject.name,
        country: cityObject.country,
        latitude: cityObject.lat,
        longitude: cityObject.lon,
        searchCount: 1,
      },
    });

    return {
      success: true,
      data: newCity,
      message: "City created successfully",
    };
  } catch (error) {
    console.error("Error in addNewCity:", error);
    return { success: false, error: "Error while adding city" };
  }
};

export const searchCity = async (
  cityName: string,
  limit: number = 5,
): Promise<ServiceResponse> => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${api_key}`,
    );

    const data = await response.json();
    if (data.length === 0) throw new Error("No cities found");

    return {
      success: true,
      data: data,
      message: "Successfully fetched cities",
    };
  } catch (error: any) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
};

export const getCityWeather = async (
  city: CityObject,
): Promise<ServiceResponse> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${api_key}&units=metric`,
    );

    if (!response.ok) throw new Error("Error while fetching city weather");

    const results = await incrementStatistics(city);

    if (!results.success) throw new Error(results.error);

    const data = await response.json();

    return {
      success: true,
      data: data,
      message: "Successfully fetched city weather",
    };
  } catch (error: any) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
};
