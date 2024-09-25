const apiKey = '6b449967918a460a16d897ee885e0838';
const searcBtn= document.querySelector('.search button');
const weatherIcon= document.querySelector('.weather-icon');

document.getElementById('city').onchange = function() {
    checkWeather()
};

async function checkWeather() {
    const city = document.getElementById('city').value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${city}`;
    await fetch(apiUrl).then((res)=>{
        if(res.status == 404){
            document.querySelector('.weather').style.display='none';
            document.querySelector('.error').style.display='block';
            return;
        }else{
            return res.json()
        }
    }).then((res)=> { 
            document.querySelector('.temp').textContent=`${Math.round(res.main.temp)}°C`
            document.querySelector('.humidity').textContent=`${res.main.humidity}%`
            document.querySelector('.wind').textContent=`${res.wind.speed} Km/h`
            document.querySelector('.city').textContent=res.name
        return res;
    }).then((res)=>{
        if(res.weather[0].main =="Clouds"){
            weatherIcon.src='images/clouds.png';
        }else if(res.weather[0].main =="Clear"){
            weatherIcon.src='images/clear.png';
        }else if(res.weather[0].main =="Rain"){
            weatherIcon.src='images/rain.png';
        }else if(res.weather[0].main =="Drizzle"){
            weatherIcon.src='images/drizzle.png';
        }else if(res.weather[0].main =="Mist"){
            weatherIcon.src='images/mist.png';
        }
        document.querySelector('.weather').style.display='block';
        document.querySelector('.error').style.display='none';
    })
}
searcBtn.addEventListener("click", ()=>{
    checkWeather()
})

