import React, { useEffect, useState} from 'react';



const apiInfo = {
  key:"ae46f0004b35e070d24d399980f942e1",
  base:"https://api.openweathermap.org/data/2.5/"
}

const ico = "http://openweathermap.org/img/w/" 
const typee = ".png";


function App() {

  const[value, setValue] =      useState('meknes');
  const [weather, setWeather] = useState({});
  const [weather1, setWeather1] = useState('');
  const [test, setTest] = useState(false);

  const date = (param)=>{
    let months= ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tusday','Wednesday','Thursday',
    'Friday','Saturday'];

    let day = days[param.getDay()];
    let datee = param.getDate();
    let month = months[param.getMonth()];
    let year = param.getFullYear();

    return`${day}, ${datee} ${month} ${year}`;
  }

  const fetchInitial = async()=>{
      const query = apiInfo.base + 'weather?q=' + value
     + '&units=metric&APPID=' + apiInfo.key;

        const res = await fetch(query);
       const weather = await res.json();
       
       if((typeof weather.main.temp !== 'undefined')){
         setWeather1(weather.main.temp)
       }
      setWeather1('');
}

  useEffect(()=>{
      fetchInitial();
  }, [])

  const handleChange = (e)=>{
    setValue(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const query = apiInfo.base + 'weather?q=' + value
     + '&units=metric&APPID=' + apiInfo.key;

     try{
      fetch(query).then(res => res.json())
      .then(result =>{

        if(result.name !== 'undefined' ){
        setTest(true);
        setWeather(result);
        setWeather1(result.main.temp) ;
        setValue('');
        console.log(result);
        
        }
      })
     }catch(err){
      console.log(err);
     }
   
  }

  const handleBackground = ()=>{
    {
   
    if(weather1 < 14){
        return 'cold';
    }
    else{
      return 'hot';
    }
  }
  }
  return(
    
    <section className={`container dis-${handleBackground()}`}>
    <div className="date">{date(new Date())}</div>
      <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="search"
         placeholder="City or Country"
        onChange={handleChange}
         /></form>
      </div>
      {test &&
      <>
      <div className="name"><h1> {weather.name}</h1></div>
     
     <div className="degree">
 {(typeof weather.main !== 'undefined') && 
              <>
      
      <span className="temp feels">
              <span className="sp1">Feels like</span>
              <span className="sp2">    {Math.round(weather.main.feels_like)}°C</span>
      </span>
      <span className="temp tem">
           
              
              <span className="sp2">  {Math.round(weather.main.temp)}°C</span>
           
      </span>
      <span className="temp temMax">
              <span className="sp1">Max Temp</span>
              <span className="sp2">    {Math.round(weather.main.temp_max)}°C</span>
      </span>
         </>
            }
      </div>

       <div className="state">
        {((typeof weather.weather !== 'undefined') &&
         (typeof weather.main !== 'undefined')) && <>
        
       
                  
        <span className="sp3 clea"> 
        <span className="sp31">Humidity</span>
        <span className="sp32">{weather.main.humidity}</span>
        </span>
        <span className="sp3 sta">
        <span className="sp31">{weather.weather[0].main}</span>
        <span className="sp32 cl" >
        <img className="icon" src={ico + weather.weather[0].icon + typee} alt="" />
        </span>
        </span>
        <span className="sp3 cleaSky">
        
        <span className="sp31">{weather.weather[0].description}</span>
        
        </span>
        </>}
      </div>
      <div className="state1">
             {(typeof weather.wind !== 'undefined') && <>
       <span className="sp3 ">
        <span className="sp31">Wind deg</span>
        <span className="sp32">{weather.wind.deg}°</span>
        </span>
        <span className="sp3 ">
        <span className="sp31">Wind gust</span>
        <span className="sp32">{weather.wind.gust}</span>
        </span>
        <span className="sp3 ">
        <span className="sp31">Wind speed</span>
        <span className="sp32 spee">{weather.wind.speed} Km/h</span>
        </span>
              </>}
      </div>
      </>
      }
      
      
   </section>

);
 
}

export default App;
