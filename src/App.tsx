import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Timer } from "./Timer";
import { Setting } from "./Setting";
import SettingContext from "./SettingContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  return (
    <div className="main">
      <SettingContext.Provider
        value={{
          workTime,
          restTime,
          setWorkTime,
          setRestTime,
          showSettings,
          setShowSettings,
        }}
      >
        {showSettings ? <Setting /> : <Timer />}
      </SettingContext.Provider>
    </div>
  );
}

export default App;
