import './App.css';
import { useEffect, useState } from 'react';

const WeatherInfo = ( {icon, temp, city, country, lati, long, humidity, wind, type} ) =>{
   return <>
        <div className='image'>
            <img src= {`./assets/${type}/${icon}.png`} alt='image' />
        </div>
        <div className='temp'>{temp}&#176;C</div>
        <div className='location'>{city}</div>
        <div className='country'>{country}</div>
        <div className='co-ordinates'>
            <div>
                <span className='lati'>latitude</span>
                <span>{lati}</span>
            </div>
            <div>
                <span className='long'>longitude</span>
                <span>{long}</span>
            </div>
        </div>
        <div className='data-container'>
            <div className='element'>
                <img src='./assets/humidity-2.png' alt='humidity' className='icon'/>
                <div className='data'>
                    <div className='humidity-percent'>{humidity}%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>

            <div className='element'>
                <img src='./assets/wind.png' alt='wind' className='icon'/>
                <div className='data'>
                    <div className='wind-speed'>{wind} Km/hr</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    </>
}



function App() {

    const [inputText, setInputText] = useState('Chennai');

    const [icon, setIcon] = useState('');
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('IN');
    const [lati, setLati] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [type, setType] = useState('');

    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const HandleSearch = async ()=>{
        
        setLoading(true)

        let api_key = '2ca78b2a64874af7b56170216240102&q';
        let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}=${inputText} `;

        try{
            const data = await fetch(url)
                        .then((response)=> response.json());

            if(data.cod === '404'){
                console.error('City not found');
                setCityNotFound(true);
                setLoading(false);
                return;
            }else{
                console.log(data)
            }

            setHumidity(data.current.humidity);
            setWind(data.current.wind_kph);
            setTemp(Math.floor(data.current.temp_c));
            setCity(data.location.name);
            setCountry(data.location.country);
            setLati(data.location.lat);
            setLong(data.location.lon);
            setIcon(data.current.condition.icon);

        }catch(error){
            console.error("An error occured:", error.message);
            setError('An error occured while fetching data')
        }finally{
            setLoading(false);
        }
    }

    const iconsName = [113, 116, 119, 122, 143, 176, 179, 182, 185, 200, 227, 230, 248, 260, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 350, 353, 356, 359, 362, 365, 368, 371, 374, 377, 386, 389, 392, 395, 185, 200, 227, 230, 248, 260, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 250, 353, 356, 359, 362, 365, 368, 371, 374, 377, 386, 389, 392, 113, 116, 119, 122, 143, 176, 179, 182, 395];

    
    iconsName.map((num)=>{
        // const dayType = [`//cdn.weatherapi.com/weather/64x64/day/${num}.png`, `//cdn.weatherapi.com/weather/64x64/night/${num}.png`];

        // dayType.map((e, index)=> {
        //     <p key={index}></p>
        //     if(e === icon){
        //         if(index === 0){
        //             type = 'day';
        //             return;
        //         }else{
        //             type = 'night';
        //             return;
        //         }
        //     }
        //     return;
        // })

        const day = `//cdn.weatherapi.com/weather/64x64/day/${num}.png`;
        const night = `//cdn.weatherapi.com/weather/64x64/night/${num}.png`;

        if(icon === day){
            setType('day')
            setIcon(num,'.png');
            return;

        }else if(icon === night){
            setType('night')
            setIcon(num,'.png');
            return;
        }
    }) ;
    
    const handleCity = (e) => {
        setInputText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if(e.key == 'Enter'){
            HandleSearch();
        }
    };

    useEffect(()=>{
        HandleSearch();
    }, []);

  return (
   <>
        <div className='container'>
            <div className='input-container'>
                <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={inputText} onKeyDown={handleKeyDown} />
                <div className='search-icon' onClick={()=> HandleSearch()}>
                    <img src='./assets/search-3.png' alt='search'/>
                </div>
            </div>
            

           { loading && <div className='loading-message'>Loading...</div>}
            { error && <div className='error-message'>{}</div>}
            { cityNotFound && <div className='city-not-found'>City not found</div>}

            { !loading && !cityNotFound && <WeatherInfo icon = {icon} temp={temp} city={city} country={country} lati={lati} long={long} humidity={humidity} wind={wind} type={type} />}

            <p className='copyright'>
                Designed by<span> Hemanth</span>
            </p>
        </div>
   </>
  );
}

export default App;