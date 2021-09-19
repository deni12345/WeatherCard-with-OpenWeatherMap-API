async function fetchWeatherData() {
    if (!('fetch' in window)) {
        alert('Fetch API not found, try including the polyfill');
        return false;
    } else {
        fetch('http://api.openweathermap.org/data/2.5/group?id=1566083,1581130,&units=metric&appid=9dfc525390c70b0c12e0a39f023c4d2b')
            .then(Response => Response.json()
                .then(d => addDataToCard(d.list)))
            .catch((error) => {
                console.error('Error:', error);
            });

    }
}

function addDataToCard(jsondata) {
    console.log(jsondata);
    let listCard = document.querySelectorAll('.weather-card');
    listCard.forEach((element, index) => {
        const cityName = element.querySelector('.city-name');
        const info = element.querySelector('.weather-info');;
        const weatherIcon = element.querySelector('.weather-icon');
        const tempr = element.querySelector('.tempr');

        cityName.innerHTML = `${jsondata[index].name}`;
        info.innerHTML =
            `${jsondata[index].weather[0].main}<span>Wind ${jsondata[index].wind.speed} m/s
        <span class="dot">•</span> Humidity ${jsondata[index].main.humidity}% </span>`;
        weatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${jsondata[index].weather[0].icon}@4x.png)`;
        tempr.innerHTML = parseInt(jsondata[index].main.temp) + "°";

    });
}

fetchWeatherData();