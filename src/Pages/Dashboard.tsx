import { useState, useEffect } from "react"
import { Dog } from "../Helpers/types"
import { fetchDogIds, fetchDogsByIds } from "../Helpers/api"

const Dashboard = ({ setIsLoggedIn }: { setIsLoggedIn: (state: boolean) => void }) => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [pageCursor, setPageCursor] = useState<string>('')
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const getDogs = async () => {
      try {
        const dogIds = await fetchDogIds(pageCursor);
        const dogsData = await fetchDogsByIds(dogIds);
        setDogs(dogsData);
        setTotal(dogIds.length)
        setPageCursor("")
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getDogs();
  }, [pageCursor]);

  const handleNextPage = () => {
    if (pageCursor) {
      setPageCursor(pageCursor); // Load the next page using the cursor
    }
  };

  const handlePreviousPage = () => {
    if (pageCursor) {
      setPageCursor(pageCursor); // Load the previous page using the cursor
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
                {dog.name} ({dog.breed}) - {dog.age} years old, located in {dog.zip_code}
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div>
            <button onClick={handlePreviousPage} disabled={!pageCursor}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!pageCursor}>
              Next
            </button>
          </div>

          {/* Display total dogs count */}
          <p>{`Showing ${dogs.length} dogs`}</p>
        </div>
      )}
    </>
  );
}

export default Dashboard