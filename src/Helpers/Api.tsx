const baseUrl = `https://frontend-take-home-service.fetch.com`;
import { Dog, DogsSearchResponse } from "./Types.tsx";

export const login = async (name: string, email: string) => {
  const url = `${baseUrl}/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
    credentials: "include", // include credentials for cookies
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response; // Return the response for further handling (or error checking)
};

export const fetchDogSearch = async (
  cursor: string = "",
  filters: any = {}
) => {
  // Extract the sort parameter from filters and remove it from the rest
  const { sort, ...otherFilters } = filters;
  // Use the provided sort or default to "breed:asc"
  const sortParam = sort ? sort : "breed:asc";

  let url = "";
  if (cursor && cursor.startsWith("/dogs/search")) {
    // If the cursor is already a full query string, use it directly
    url = `${baseUrl}${cursor}`;
  } else {
    // Build the base URL. Note: We do NOT add a '?' again if there is already one.
    url = `${baseUrl}/dogs/search?size=25`;
    url += `&sort=${encodeURIComponent(sortParam)}`;
    if (cursor) {
      url += `&from=${cursor}`;
    }
  }

  // Append additional filter parameters (excluding 'sort' since we've already handled it)
  Object.keys(otherFilters).forEach((key) => {
    if (otherFilters[key]) {
      url += `&${encodeURIComponent(key)}=${encodeURIComponent(
        otherFilters[key]
      )}`;
    }
  });

  console.log("fetchDogSearch URL:", url); // Debug: Verify URL structure

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dog IDs");
  }
  return await response.json();
};

export const fetchDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  console.log("dogIds being sent as", JSON.stringify(dogIds));
  const response = await fetch(`${baseUrl}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) throw new Error("Failed to fetch dog details");

  return response.json();
};

export const fetchBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${baseUrl}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch breed list: ${response.status}`);
    }
    const data = await response.json();
    console.log("Raw API response:", data); // ✅ Log raw API response
    return data;
  } catch (error) {
    console.error("fetchBreeds error:", error);
    return [];
  }
};

export const matchDog = async (dogIds: string[]): Promise<Dog | null> => {
  try {
      const matchResponse = await fetch(`${baseUrl}/dogs/match`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              // Add authentication headers if needed
          },
          body: JSON.stringify(dogIds),
          credentials: "include", // If cookies or auth are required
      });

      if (!matchResponse.ok) throw new Error("Failed to match dog");

      const { match: matchedDogId } = await matchResponse.json();
      console.log("Matched Dog ID:", matchedDogId);

      if (!matchedDogId) return null;

      // Fetch details of the matched dog
      const dogsResponse = await fetch(`${baseUrl}/dogs`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify([matchedDogId]), // Send ID in an array
          credentials: "include",
      });

      if (!dogsResponse.ok) throw new Error("Failed to fetch matched dog details");

      const matchedDogData: Dog[] = await dogsResponse.json();
      return matchedDogData.length ? matchedDogData[0] : null;
  } catch (error) {
      console.error("Error matching dog:", error);
      return null;
  }
};
