import Dashboard from "./tehnoApp/Dashboard";
import Navigation from "./tehnoApp/Navigation";
import Sidebar from "./tehnoApp/Sidebar";
import Login from "./user/Login";

function App() {
  return (
    <>
      {/* <Login /> */}
      <div className="flex flex-row">
        <Sidebar />
        <Dashboard />
        {/* <Navigation /> */}
      </div>
      {/* <Navigation /> */}
    </>
  );
}

export default App;
