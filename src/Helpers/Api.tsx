import { Dog } from "./Interfaces.tsx";

const API_BASE_URL = `https://frontend-take-home-service.fetch.com`;

export const login = async (name: string, email: string) => {
  const url = `${API_BASE_URL}/auth/login`;

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

export const logout = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return true; // Indicate successful logout
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
    url = `${API_BASE_URL}${cursor}`;
  } else {
    // Build the base URL. Note: We do NOT add a '?' again if there is already one.
    url = `${API_BASE_URL}/dogs/search?size=25`;
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
  const response = await fetch(`${API_BASE_URL}/dogs`, {
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
    const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
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
    return data;
  } catch (error) {
    console.error("fetchBreeds error:", error);
    return [];
  }
};

export const matchDog = async (dogIds: string[]): Promise<Dog | null> => {
  try {
    const matchResponse = await fetch(`${API_BASE_URL}/dogs/match`, {
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
    if (!matchedDogId) return null;

    // Fetch details of the matched dog
    const dogsResponse = await fetch(`${API_BASE_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([matchedDogId]), // Send ID in an array
      credentials: "include",
    });

    if (!dogsResponse.ok)
      throw new Error("Failed to fetch matched dog details");

    const matchedDogData: Dog[] = await dogsResponse.json();
    return matchedDogData.length ? matchedDogData[0] : null;
  } catch (error) {
    console.error("Error matching dog:", error);
    return null;
  }
};
