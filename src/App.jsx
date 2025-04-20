import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Nav from "./components/Nav";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overviews from "./components/Overview";
import Details from "./components/Detail";
import Projects from "./components/Projects";
import Teams from "./components/Teams";
import Analytics from "./components/Analytics";
import Messages from "./components/Messages";
import Integrations from "./components/Integrations";
import Sidebar from "./components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="flex min-h-screen">
          <div className="grid-cols-5">
            <div className="flex flex-col">
              <Sidebar />
            </div>
          </div>
          <div className="flex flex-col mx-5">
            <div className="flex items-center">
              <Header />
            </div>
            <div className="flex flex-col ">
              <Overviews />
            </div>
            <div className="flex flex-col mt-10">
              <div>
                <Routes>
                  <Route path="/" element={<Details />}></Route>
                  <Route path="/projects" element={<Projects />}></Route>
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/messages" element={<Messages />}></Route>
                  <Route
                    path="/integrations"
                    element={<Integrations />}
                  ></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
