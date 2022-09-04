import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [weather, setWeather] = useState(0);
  const [temp, setTemp]= useState(true);
 
  useEffect (() =>{
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=bc04563b51c9c42e28207d3105254de1`)
       .then((res) => {
        res.data.main.temp = res.data.main.temp -273.15
        setWeather(res.data)})
    }
   }, []);

   console.log(weather);


  return (
    <div className="App">
      <h1>City Weather</h1>
      <h2>{weather.name} {weather.sys?.country}</h2>
      <p>"{weather.weather?.[0].description}"</p>
      <div className='main'>
        <div>
          <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
          <div>
             <b> {temp ? weather.main?.temp : weather.main?.temp*1.8 + 32}
              {temp ? "°C" : "°F"} </b>
          </div>
        </div>
        <section>
        <div>
        <span class="material-symbols-outlined">cloudy</span>
        <b> Clouds: </b>
          {weather.clouds?.all}%
        </div>
        <div>
        <span class="material-symbols-outlined">air</span>
        <b> Speed Wind:  </b>
         {weather.wind?.speed}m/s
        </div>
        <div>
        <span class="material-symbols-outlined">device_thermostat</span>
        <b> Pressure: </b>
          {weather.main?.pressure}mb
        </div>
        <div>
        <span class="material-symbols-outlined">humidity_high</span>
        <b> Humidity: </b>
          {weather.main?.humidity} %
        </div>
        </section>
      </div>
     <button onClick={() => setTemp(!temp)}>Degrees {temp ? "°C" : "°F"}</button>
    </div>
  )
}

export default App
