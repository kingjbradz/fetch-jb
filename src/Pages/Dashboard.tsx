import DashboardComponent from "../Components/DashboardComponent.tsx";
import { Box } from "@mui/material";
import AppBar from "../Components/TopBar.tsx";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 1 }}>
      <DashboardComponent />
    </Box>
  )
}

export default Dashboard