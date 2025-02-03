import { FC, ChangeEvent } from "react";
import { TextField, Select, MenuItem, Button, Box, SelectChangeEvent } from "@mui/material";
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
      <TextField
        type="number"
        name="ageMin"
        label="Min Age"
        value={filters.ageMin}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFilterChange(event)}
        size="small"
      />
      <TextField
        type="number"
        name="ageMax"
        label="Max Age"
        value={filters.ageMax}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFilterChange(event)}
        size="small"
      />

      <Select
        name="breeds"
        value={filters.breeds}
        onChange={(event: SelectChangeEvent<string>) => handleFilterChange(event)}
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

      <TextField
        type="text"
        name="zipCodes"
        label="Zip Code"
        value={filters.zipCodes}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFilterChange(event)}
        size="small"
      />

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
