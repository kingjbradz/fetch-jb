import React, { useState, useEffect } from 'react';
import { Dog } from "../Helpers/types.tsx";
import { fetchDogSearch, fetchDogsByIds, fetchBreeds } from "../Helpers/api.tsx";
import DashboardTable from "./DashboardTable.tsx";

const DashboardComponent = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCursor, setPageCursor] = useState<string>(""); 
  const [prevCursor, setPrevCursor] = useState<string>(""); 
  const [nextCursor, setNextCursor] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [total, setTotal] = useState<number>(0);

  // 🔹 Store all filters in a single state object
  const [filters, setFilters] = useState({
    ageMin: "",
    ageMax: "",
    breeds: "",
    zipCodes: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [breedsList, setBreedsList] = useState<string[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breeds = await fetchBreeds();
        console.log("Fetched breeds:", breeds);
        setBreedsList(breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    getBreeds();
  }, []);

  const getDogs = async (cursor: string = "", filters: any = {}, resetPagination: boolean = false) => {
    setLoading(true);
    try {
      const { resultIds, next, prev, total } = await fetchDogSearch(cursor, { ...filters, sort: `breed:${sortOrder}` });
      const dogsData = await fetchDogsByIds(resultIds);
      setDogs(dogsData);
      setPrevCursor(prev || "");
      setNextCursor(next || "");
      setTotal(total);
  
      if (resetPagination) {
        setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
        setPageCursor(""); // Reset pagination to start
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Debounce filter updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  // 🔹 Fetch dogs when filters, pagination, or sorting changes
  useEffect(() => {
    getDogs(pageCursor, debouncedFilters);
  }, [pageCursor, debouncedFilters, sortOrder]);

  // 🔹 Handle pagination
  const handlePage = (direction: "next" | "prev") => {
    let newPage = paginationModel.page;
    if (direction === "next" && nextCursor) {
      newPage += 1;
      setPageCursor(nextCursor);
    } else if (direction === "prev" && prevCursor) {
      newPage = Math.max(0, newPage - 1);
      setPageCursor(prevCursor);
    }
    setPaginationModel({ ...paginationModel, page: newPage });
  };

  // 🔹 Handle filter changes dynamically
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPageCursor(""); // Reset pagination when filtering
  };

  return (
    <>
      <div>
        <input type="text" name="ageMin" value={filters.ageMin} onChange={handleFilterChange} placeholder="Min Age" />
        <input type="text" name="ageMax" value={filters.ageMax} onChange={handleFilterChange} placeholder="Max Age" />
        
        <select name="breeds" value={filters.breeds} onChange={handleFilterChange}>
          <option value="">Select a breed</option>
          {breedsList.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        
        <input type="text" name="zipCodes" value={filters.zipCodes} onChange={handleFilterChange} placeholder="Zip Codes" />

        <button
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setPageCursor(""); // Reset pagination to start from first page
          }}
        >
          Sort by Breed ({sortOrder === "asc" ? "A → Z" : "Z → A"})
        </button>
      </div>

      {loading ? (
        <p>Loading dogs...</p>
      ) : (
        <DashboardTable
          dogs={dogs}
          handlePage={handlePage}
          prevCursor={prevCursor}
          nextCursor={nextCursor}
          total={total}
          paginationModel={paginationModel}
        />
      )}
    </>
  );
};

export default DashboardComponent;
