import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContainerHome from "./components/ContainerHome";
import UserActivity from "./components/UserActivity";
import UserAverageSessions from "./components/UserAverageSessions";
import UserPerformance from "./components/UserPerformance";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/user/:id" element={<ContainerHome />} />
            <Route path="/user/:id/activity" element={<UserActivity />} />
            <Route path="/user/:id/average-sessions" element={<UserAverageSessions />} />
            <Route path="/user/:id/performance" element={<UserPerformance />} />
            <Route path="/" element={<Navigate to="/user/12" />} />
            <Route path="*" element={<Navigate to="/user/12" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
