import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        
        {/* Le contenu principal ira ici */}
      </div>
    </div>
  )
}

export default App
