import DashboardComponent from "../Components/DashboardComponent.tsx";
import AppBar from "../Components/AppBar.tsx";

const Dashboard = ({ setIsLoggedIn }: { setIsLoggedIn: (state: boolean) => void }) => {
  return (
    <>
      <DashboardComponent />
    </>
  )
}

export default Dashboard