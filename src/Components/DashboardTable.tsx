import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dog } from "../Helpers/Types.tsx";

interface DashboardTableProps {
  dogs: Dog[];
  handlePage: (direction: "next" | "prev") => void;
  prevCursor: string;
  nextCursor: string;
  total: number;
  paginationModel: { page: number; pageSize: number };
  selectedDogIds: string[];
  onSelectionChange: (newSelection: string[]) => void;
}

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Avatar
        src={params.value}
        alt="Dog Image"
        sx={{ width: 50, height: 50 }}
      />
    ),
  },
  { field: "name", headerName: "Name", width: 180, editable: true, sortable: false, hideable: false, filterable: false },
  { field: "age", headerName: "Age", type: "number", width: 100, editable: true, hideable: false },
  { field: "breed", headerName: "Breed", width: 180, editable: true, hideable: false },
  { field: "zip_code", headerName: "ZIP Code", width: 150, editable: true, hideable: false },
];

const DashboardTable: FC<DashboardTableProps> = ({
  dogs,
  handlePage,
  prevCursor,
  nextCursor,
  total,
  paginationModel,
  selectedDogIds,
  onSelectionChange
}) => {
  const rows = dogs.map((dog) => ({
    id: dog.id,
    name: dog.name,
    age: dog.age,
    breed: dog.breed,
    zip_code: dog.zip_code,
    img: dog.img
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        rowSelectionModel={selectedDogIds}
        onRowSelectionModelChange={(newSelection) =>
          onSelectionChange(newSelection as string[])
        }
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => {
          if (newModel.page > paginationModel.page && nextCursor) {
            handlePage("next");
          } else if (newModel.page < paginationModel.page && prevCursor) {
            handlePage("prev");
          }
        }}
        rowCount={total}
        pageSizeOptions={[25]}
        isCellEditable={() => false}
      />
    </div>
  );
};

export default DashboardTable;
