import img2 from "./Images/img2.png";
import playiconimg from "./Images/playiconimg.png";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("hello");
  const [searchResult, SetSearchResult] = useState([]);
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const fetchdata = async () => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    );
    const data = await res.json();
    SetSearchResult(data);
  };
  useEffect(() => {
    fetchdata();
  }, [text]);
  console.log(searchResult?.[0]);

  const MeaningText = ({ meaning }) => {
    return (
      <>
        <h4>{meaning?.partOfSpeech}</h4>
        <ul>
          {meaning?.definitions?.map((def) => {
            return <li>{def?.definition}</li>;
          })}
        </ul>

        <p style={{ color: "purple" }}>
          {meaning?.antonyms?.length > 0 ? "Antonym" : ""}
        </p>
        {meaning?.antonyms?.map((ant) => {
          return <span style={{ color: "purple" }}>{ant}</span>;
        })}

        <hr style={{ margin: "15px 0" }} />
      </>
    );
  };
  const AudioPlay = ({ url }) => {
    const audio = new Audio(url);
    return (
      <>
        {!url ? (
          <button
            disabled={!url}
            className="playbtn"
            onClick={() => audio.play()}
          ></button>
        ) : (
          <button
            disabled={!url}
            className="playbtn"
            onClick={() => audio.play()}
          >
            <img src={playiconimg} alt="play" />
          </button>
        )}
      </>
    );
  };
  return (
    <div className="App">
      <div className="dictionary-container">
        <div className="top">
          <div className="logo">
            <img src={img2} alt="Dictionary"></img>
          </div>

          <div className="toggle">
            <button onClick={toggleTheme} className="btntoggle"></button>
          </div>
        </div>

        <div className="search-input">
          <input
            onChange={(e) => setText(e.target.value)}
            placeholder="search"
          />
        </div>
        <div className="result">
          <div className="result_top">
            <div>
              <h1>{searchResult?.[0]?.word}</h1>
              <span>{searchResult?.[0]?.phonetics[1]?.text}</span>
            </div>
          </div>
          <div>
            <AudioPlay url={searchResult?.[0]?.phonetics[0]?.audio} />
          </div>
          <div className="part-of-speech">
            {searchResult?.[0]?.meanings[0]?.partOfSpeech}
          </div>
          <div className="meanings">
            <h5>meanings :</h5>

            {searchResult?.[0]?.meanings?.map((meaning) => {
              return <MeaningText meaning={meaning} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
