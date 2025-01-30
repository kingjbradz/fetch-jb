const baseUrl = `https://frontend-take-home-service.fetch.com`
import { Dog } from "./types";

export const login = async (name: string, email: string) => {
  const url = "https://frontend-take-home-service.fetch.com/auth/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email }),
    credentials: "include" // include credentials for cookies
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  
  return response; // Return the response for further handling (or error checking)
};

export const fetchDogIds = async (pageCursor: string = ""): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/dogs/search?size=25&from=${pageCursor}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error("Failed to fetch dog IDs");

  const data = await response.json();
  return data.resultIds;
};

export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  const response = await fetch(`${baseUrl}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dogIds)
  });

  if (!response.ok) throw new Error("Failed to fetch dog details");

  return response.json();
};
