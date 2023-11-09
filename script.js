const api={
    key:"bb203e9b65ca4d744eb2ca6169b576d9",
    baseurl:"http://api.openweathermap.org/data/2.5/"
}
const searchBox=document.querySelector('.search-box');

const setQuery=(e)=>
{
    if(e.code === 'Enter')
    {
        getResults(searchBox.value);
    }
    
}
searchBox.addEventListener('keypress',setQuery);

const getResults=(query)=>
{
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    } ).then(displayResults);
}

const displayResults=(weather)=>
{
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText=weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;  
}

const dateBuilder=(d)=>
{
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let date=d.getDate();
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}