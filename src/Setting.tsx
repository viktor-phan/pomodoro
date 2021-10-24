import React, { useContext } from "react";
import ReactSlider from "react-slider";
import { BackButton } from "./BackButton";
import SettingContext from "./SettingContext";
export const Setting = () => {
  const settingInfo: any = useContext(SettingContext);
  return (
    <div style={{ textAlign: "left" }}>
      <label htmlFor="">Work time: {settingInfo.workTime}m </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingInfo.workTime}
        onChange={(newVal) => settingInfo.setWorkTime(newVal)}
        min={1}
        max={120}
      />
      <label htmlFor="">Rest time: {settingInfo.restTime}m</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingInfo.restTime}
        onChange={(newVal) => settingInfo.setRestTime(newVal)}
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton
          onClick={() => {
            settingInfo.setShowSettings(false);
          }}
        />
      </div>
    </div>
  );
};
