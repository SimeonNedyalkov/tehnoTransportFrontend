import Dashboard from "./tehnoApp/Dashboard";
import Sidebar from "./tehnoApp/Sidebar";
import Login from "./user/Login";

function App() {
  return (
    <>
      {/* <Login /> */}
      <div className="flex flex-row">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
