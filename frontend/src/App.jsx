import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContainerHome from "./components/ContainerHome";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        
        <ContainerHome />
      </div>
    </div>
  )
}

export default App
