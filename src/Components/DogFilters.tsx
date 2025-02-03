import { FC } from "react";
import { TextField, Select, MenuItem, Button, Box } from "@mui/material";
import { DogFiltersProps } from "../Helpers/Interfaces";


const DogFilters: FC<DogFiltersProps> = ({
  filters,
  handleFilterChange,
  setSortOrder,
  sortOrder,
  setPageCursor,
  breedsList,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2,
        bgcolor: "background.paper",
        padding: 1,
        borderRadius: "4px",
        boxShadow: 1
      }}
    >
      {/* Age Filters */}
      <TextField
        type="number"
        name="ageMin"
        label="Min Age"
        value={filters.ageMin}
        onChange={handleFilterChange}
        size="small"
      />
      <TextField
        type="number"
        name="ageMax"
        label="Max Age"
        value={filters.ageMax}
        onChange={handleFilterChange}
        size="small"
      />

      {/* Breed Selector */}
      <Select
        name="breeds"
        value={filters.breeds}
        onChange={handleFilterChange}
        displayEmpty
        size="small"
      >
        <MenuItem value="">Select a breed</MenuItem>
        {breedsList.map((breed) => (
          <MenuItem key={breed} value={breed}>
            {breed}
          </MenuItem>
        ))}
      </Select>

      {/* Zip Code Filter */}
      <TextField
        type="text"
        name="zipCodes"
        label="Zip Code"
        value={filters.zipCodes}
        onChange={handleFilterChange}
        size="small"
      />

      {/* Sorting Button */}
      <Button
        variant="contained"
        onClick={() => {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          setPageCursor(""); // Reset pagination
        }}
      >
        Sort (A ↔ Z)
      </Button>
    </Box>
  );
};

export default DogFilters;
