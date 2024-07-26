import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

// Register the language locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  // API Key and URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  // Input handler
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  // Submit handler
  const submitHandler = () => {
    setState(getState);
  };

  // Kelvin to Fahrenheit converter
  const kelvinToFahrenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location:
            </label>
            <input
              type="text"
              id="location-name"
              className="form-control"
              value={getState}
              onChange={inputHandler}
            />
            <button className="btn btn-primary mt-2" onClick={submitHandler}>
              Search
            </button>
          </div>
        </div>
        <div className="card mt-3 mx-auto">
          {
            apiData.main ? (
              <div className="card-body text-center">
                <img
                  src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
                <p className="h2">
                  {kelvinToFahrenheit(apiData.main.temp)}&deg;F
                </p>
                <p className="h5">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="fas fa-1x mr-2 text-dark" />
                  <strong>{apiData.name}</strong>
                </p>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon icon={faTemperatureLow} className="fas fa-1x mr-2 text-primary" />
                      <strong>{kelvinToFahrenheit(apiData.main.temp_min)}&deg;F</strong>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <FontAwesomeIcon icon={faTemperatureHigh} className="fas fa-1x mr-2 text-danger" />
                      <strong>{kelvinToFahrenheit(apiData.main.temp_max)}&deg;F</strong>
                    </p>
                    <p>
                      <strong>{apiData.weather[0].main}</strong>
                    </p>
                    <p>
                      <strong>
                        {countries.getName(apiData.sys.country, 'en', { select: 'official' })}
                      </strong>
                    </p>
                  </div>
                </div>
                <p className="h5">
                  {apiData.weather[0].description}
                </p>
              </div>
            ) : (
              <h1>Loading...</h1>
            )
          }
        </div>
      </div>
      <footer className="footer">
        &copy; React Weather App
      </footer>
    </div>
  );
}

export default App;
