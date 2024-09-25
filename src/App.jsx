import { useState, useEffect } from "react";
//import InputCheckboks from '../src/components/input_checkbox';
import "./App.css";

const App = () => {
  const [length, setLength] = useState(15);
  const [settings, setSettings] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    excDuplicate: false,
    spaces: false,
  });
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState("weak");
  const [copyStatus, setCopyStatus] = useState("copy_all");

  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|{}:;.,*+-#@<>~",
  };

  

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const updatePassIndicator = () => {
    setPassStrength(length <= 8 ? "weak" : length <= 16 ? "medium" : "strong");
};
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopyStatus("check");
    setTimeout(() => {
      setCopyStatus("copy_all");
    }, 1500);
  };
  const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = settings.excludeDuplicate;

    Object.keys(settings).forEach((setting) => {
      if (
        settings[setting] &&
        setting !== "excludeDuplicate" &&
        setting !== "spaces"
      ) {
        staticPassword += characters[setting];
      } else if (setting === "spaces" && settings[setting]) {
        staticPassword += `  ${staticPassword}  `;
      } 
    });

    for (let i = 0; i < length; i++) {
      if (staticPassword === '') {
        setPassword('');
        return alert ('Choose one password setting for generate new password');
      }
      let randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if (excludeDuplicate) {
        !randomPassword.includes(randomChar) || randomChar === " "
          ? (randomPassword += randomChar)
          : i--;
      } else {
        randomPassword += randomChar;
      }
    }
    setPassword(randomPassword);
  };

  useEffect(() => {
    updatePassIndicator();
}, [length, settings, updatePassIndicator]);

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="wrapper">
        <div className="input-box">
          <input type="text" value={password} readOnly />
          <span className="material-symbols-rounded" onClick={copyPassword} >
          {copyStatus}
          </span>
        </div>
        <div className="pass-indicator" id={passStrength}></div>
        <div className="pass-length">
          <div className="details">
            <label className="title">Password Length</label>
            <span>{length}</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={length}
            step="1"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="pass-settings">
          <label className="title">Password Settings</label>
          <ul className="options">
            <li className="option">
              <input
                type="checkbox"
                id="lowercase"
                name="lowercase"
                checked={settings.lowercase}
                onChange={handleChange}
              />
              <label htmlFor="lowercase">Lowercase (a-z)</label>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="uppercase"
                name="uppercase"
                checked={settings.uppercase}
                onChange={handleChange}
              />
              <label htmlFor="uppercase">Uppercase (A-Z)</label>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="numbers"
                name="numbers"
                checked={settings.numbers}
                onChange={handleChange}
              />
              <label htmlFor="numbers">Numbers (0-9)</label>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="symbols"
                name="symbols"
                checked={settings.symbols}
                onChange={handleChange}
              />
              <label htmlFor="symbols">Symbols (!-$^+)</label>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="exc-duplicate"
                name="excDuplicate"
                checked={settings.excDuplicate}
                onChange={handleChange}
              />
              <label htmlFor="exc-duplicate">Exclude Duplicate</label>
            </li>
            <li className="option">
              <input
                type="checkbox"
                id="spaces"
                name="spaces"
                checked={settings.spaces}
                onChange={handleChange}
              />
              <label htmlFor="spaces">Include Spaces</label>
            </li>
          </ul>
        </div>
        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
