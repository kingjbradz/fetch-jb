import { useState, useEffect, ChangeEvent } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { Dog } from "../Helpers/Interfaces.tsx";
import {
  fetchDogSearch,
  fetchDogsByIds,
  fetchBreeds,
  matchDog,
} from "../Helpers/Api.tsx";
import DashboardTable from "./DashboardTable.tsx";
import DogFilters from "./DogFilters.tsx";
import MatchDialog from "./MatchDialog.tsx"; // Import the new MatchDialog component

const DashboardComponent = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCursor, setPageCursor] = useState<string>("");
  const [prevCursor, setPrevCursor] = useState<string>("");
  const [nextCursor, setNextCursor] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [total, setTotal] = useState<number>(0);
  const [selectedDogIds, setSelectedDogIds] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

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

  const getDogs = async (
    cursor: string = "",
    filters: any = {},
    resetPagination: boolean = false
  ) => {
    setLoading(true);
    try {
      const { resultIds, next, prev, total } = await fetchDogSearch(cursor, {
        ...filters,
        sort: `breed:${sortOrder}`,
      });
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

  const handleMatchDogs = async () => {
    if (selectedDogIds.length === 0) return;

    console.log("Matching dogs with IDs:", selectedDogIds);

    const matchedDog = await matchDog(selectedDogIds);

    if (matchedDog) {
      console.log("Matched Dog:", matchedDog);
      setMatchedDog(matchedDog); // Set matched dog in state
      setTimeout(() => {
        setDialogOpen(true); // Open dialog after state is set
      }, 50); // Small delay to ensure state update completes before opening the dialog
    } else {
      console.log("No match found.");
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
  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPageCursor(""); // Reset pagination when filtering
  };

  const currentPageSelected = dogs
    .map((dog) => dog.id)
    .filter((id) => selectedDogIds.includes(id));

  const handleSelectionChange = (currentPageSelection: string[]) => {
    // Get the IDs of the dogs that are on the current page.
    const currentPageIds = dogs.map((dog) => dog.id);

    // Get IDs that were previously selected but are no longer in the new selection
    const deselectedIds = currentPageIds.filter(
      (id) => selectedDogIds.includes(id) && !currentPageSelection.includes(id)
    );

    // Filter out deselected IDs from the global selection
    const updatedGlobalSelection = selectedDogIds.filter(
      (id) => !deselectedIds.includes(id)
    );

    // Merge with the new selections
    setSelectedDogIds([...updatedGlobalSelection, ...currentPageSelection]);
  };

  return (
    <>
      <DogFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setPageCursor={setPageCursor}
        breedsList={breedsList}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <DashboardTable
            dogs={dogs}
            handlePage={handlePage}
            prevCursor={prevCursor}
            nextCursor={nextCursor}
            total={total}
            paginationModel={paginationModel}
            selectedDogIds={currentPageSelected}
            onSelectionChange={handleSelectionChange}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleMatchDogs}
            disabled={selectedDogIds.length === 0}
          >
            Find your match!
          </Button>
        </Box>
      )}

      <MatchDialog
        matchedDog={matchedDog}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)} // Close the dialog
      />
    </>
  );
};

export default DashboardComponent;

