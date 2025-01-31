const baseUrl = `https://frontend-take-home-service.fetch.com`
import { Dog, DogsSearchResponse } from "./types";

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

export const fetchDogSearch = async (pageCursor: string = ""): Promise<DogsSearchResponse> => {
  let url = baseUrl
  if (pageCursor) {
    url = `${baseUrl + pageCursor}`;  // Add only the cursor value, like "25", not the full URL
  } else {
    url = `${baseUrl}/dogs/search`
  }
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error("Failed to fetch dog IDs");

  const data = await response.json();
  return data;
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
