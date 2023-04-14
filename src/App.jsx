import Quiz from "./Quiz";
import { jsQuizz } from "./services/static-data";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  return <Quiz questions={jsQuizz.questions}></Quiz>;
}

export default App;
