import { useState, useEffect } from "react";
import { Dog } from "../Helpers/types";
import { fetchDogSearch, fetchDogsByIds } from "../Helpers/api";

const DashboardComponent = ({}: {}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCursor, setPageCursor] = useState<string>(""); // This now stores the cursor directly
  const [prevCursor, setPrevCursor] = useState<string>(""); // Store prev cursor
  const [nextCursor, setNextCursor] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const getDogs = async (cursor: string = "") => {
    try {
      console.log("Current pageCursor: ", pageCursor); // Debugging pageCursor
      const { resultIds, next, prev } = await fetchDogSearch(pageCursor || "");
      const dogsData = await fetchDogsByIds(resultIds);
      setDogs(dogsData);
      setTotal(resultIds.length);
      // Store cursors properly
      setPrevCursor(prev || "");
      setNextCursor(next || "");

      // Update the pageCursor to match the one being fetched
      setPageCursor(cursor);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect firing");
    getDogs();
  }, []);

  const handlePage = (direction: "next" | "prev") => {
    setLoading(true);
    if (direction === "next" && nextCursor) {
      getDogs(nextCursor); // Use the stored next cursor
    } else if (direction === "prev" && prevCursor) {
      getDogs(prevCursor); // Use the stored prev cursor
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading dogs...</p>
      ) : (
        <div>
          <ul>
            {dogs.map((dog) => (
              <li key={dog.id}>
                {dog.name} ({dog.breed}) - {dog.age} years old, located in{" "}
                {dog.zip_code}
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div>
            <button onClick={() => handlePage("prev")} disabled={!prevCursor}>
              Previous
            </button>
            <button onClick={() => handlePage("next")} disabled={!nextCursor}>
              Next
            </button>
          </div>

          {/* Display total dogs count */}
          <p>{`Showing ${dogs.length} dogs`}</p>
        </div>
      )}
    </>
  );
};

export default DashboardComponent;
