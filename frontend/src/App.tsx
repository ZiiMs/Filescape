import { useEffect, useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import {
  GetDrives,
  GetFolders,
  GetHome,
  Greet,
  Test,
} from "../wailsjs/go/main/App";
import { main, disk } from "../wailsjs/go/models";

// Define the interface
// Example usage

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇",
  );
  const [testText, setTestText] = useState<number | undefined>();
  const [name, setName] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("");
  const [currentDirectoryList, setCurrentDirectoryList] = useState<
    main.Directory[]
  >([]);
  const [drives, setDrives] = useState<disk.PartitionStat[]>([]);
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);
  // const setDirectory = (cd: string) => setCurrentDirectory(cd);
  const setDirectoryList = (cd: main.Directory[]) =>
    setCurrentDirectoryList(cd);

  function greet() {
    Greet(name).then(updateResultText);
  }

  useEffect(() => {
    GetHome().then(setDirectoryList);
  }, []);

  function test() {
    Test().then((test: number) => setTestText(test));
  }

  return (
    <div id="App">
      <img src={logo} id="logo" alt="logo" />
      <div>
        {currentDirectoryList && (
          <div>
            All Files:{" "}
            {currentDirectoryList.map((dirs, index) => (
              <div key={index}>
                Name: {dirs.name} | Path: {dirs.path} | Type: {dirs.type}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {drives && (
          <div>
            All Drives:
            {drives.map((drive, index) => (
              <div key={index}>
                <div>Drive: {drive.device}</div>
                <div>Mountpoint: {drive.mountpoint}</div>
                <div>Fstype: {drive.fstype}</div>
                <div>Opts: {drive.opts}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div id="result" className="result">
        {resultText}
        <div>
          {currentDirectory && <div>Current DirType: {currentDirectory}</div>}
        </div>
      </div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={greet}>
          Greet
        </button>

        <button className="btn" onClick={test}>
          Test
        </button>
        {testText && <div>Test: {testText}</div>}
      </div>
    </div>
  );
}

export default App;
