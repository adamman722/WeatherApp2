import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
//MAKE THIS LOOK PRETTY
function App() {
  const [count, setCount] = useState(0);
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}.${month}.${year}.`;
  const API_KEY = "ad7f82725b4befcf687e7293bcf0305a";

  //hooks
  const locationRef = useRef();
  const [currentWeather, setCurrentWeather] = useState({});
  const [failed, setFailed] = useState(false);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getWeather = () => {
    console.log(locationRef.current.value);
    setFiveDayForecast([]);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${locationRef.current.value}&appid=${API_KEY}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const currentWeatherForecast = data.list[0].weather[0].description;
        const currentTemp = Math.round(data.list[0].main.temp - 273.15);

        setCurrentWeather({ currentWeatherForecast, currentTemp });

        for (let i = 1; i <= 5; i++) {
          const date = new Date(data.list[i].dt * 1000).toDateString();
          const temp = Math.round(data.list[i].main.temp - 273.15);
          const condition = data.list[i].weather[0].description;
          setFiveDayForecast((prev) => [
            ...prev,
            <p key={i}>
              {date}: {temp}°C, {condition}
            </p>,
          ]);
          setFailed(false);
        }
      })
      .catch((error) => setFailed(true));
  };
  return (
    <div className="App">
      <header>
        <h1>Weather Application</h1>
      </header>
      <main>
        <input type="text" name="" id="location" ref={locationRef} />
        <button id="search" onClick={getWeather}>
          Search
        </button>
        <div id="weather">
          {failed ? <p>You entred in an invalid city</p> : null}
          {currentWeather.currentWeatherForecast}
          {currentWeather.currentTemp}
          <div>{fiveDayForecast}</div>
        </div>
      </main>
      <footer>
        <p>Copyright © {year}</p>
      </footer>
    </div>
  );
}

export default App;
