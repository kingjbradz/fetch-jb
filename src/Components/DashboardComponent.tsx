import Dashboard from "../Pages/Dashboard";

const DashboardComponent = ({ setIsLoggedIn }: { setIsLoggedIn: (state: boolean) => void }) => {
  return (
    <Dashboard setIsLoggedIn={setIsLoggedIn} />
  )
}