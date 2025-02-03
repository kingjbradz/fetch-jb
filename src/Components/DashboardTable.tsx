import { FC } from "react";
import { Avatar, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dog, DashboardTableProps } from "../Helpers/Interfaces.tsx";



const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 50, width: "100%" }}>
        <Avatar
          src={params.value}
          alt="Dog Image"
          sx={{ width: 40, height: 40 }}
          />
      </Box>
        ),
  },
  { field: "name", headerName: "Name", editable: true, hideable: false, filterable: false, flex: 1 },
  { field: "age", headerName: "Age", editable: true, hideable: false,  flex: 1  },
  { field: "breed", headerName: "Breed", editable: true, hideable: false,  flex: 1  },
  { field: "zip_code", headerName: "ZIP Code", editable: true, hideable: false,  flex: 1  },
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
    <Box sx={{ 
      width: "100%", bgcolor: "background.paper", borderRadius: "8px",
      height: 'calc(100vh - 220px)', // Example: Subtract 150px for the header and other components
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 1,
      boxShadow: 1,
      '& .MuiDataGrid-root': {
        flexGrow: 1,
        overflow: 'hidden',
      },

     }}>
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
          disableColumnMenu
          keepNonExistentRowsSelected
          hideFooterSelectedRowCount
      />
    </Box>
  );
};

export default DashboardTable;
