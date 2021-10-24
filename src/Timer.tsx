import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";
import { SettingButton } from "./SettingButton";
import SettingContext from "./SettingContext";
export const Timer = () => {
  const settingInfo: any = useContext(SettingContext);
  const red = "#f54e4e";
  const green = "#4aec8c";
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondLeft, setSecondLeft] = useState(0);
  const secondLeftRef = useRef(secondLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const initTimer = () => {
    setSecondLeft(settingInfo.workTime * 60);
  };
  const tick = () => {
    secondLeftRef.current--;
    setSecondLeft(secondLeftRef.current);
  };
  useEffect(() => {
    const switchMode = () => {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSecondLeft =
        (nextMode === "work" ? settingInfo.workTime : settingInfo.restTime) *
        60;
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondLeft(nextSecondLeft);
      secondLeftRef.current = nextSecondLeft;
    };

    secondLeftRef.current = settingInfo.workTime * 60;
    setSecondLeft(secondLeftRef.current);
    
    const interval: any = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 100);
    return () => clearInterval(interval);
  }, [settingInfo]);

  const totalSeconds =
    mode === "work" ? settingInfo.workTime * 60 : settingInfo.restTime * 60;
  const percentage = Math.round((secondLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondLeft / 60);
  let seconds: any = secondLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + `:` + seconds}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "butt",
          textColor: " #fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingButton
          onClick={() => {
            settingInfo.setShowSettings(true);
          }}
        />
      </div>
    </div>
  );
};
