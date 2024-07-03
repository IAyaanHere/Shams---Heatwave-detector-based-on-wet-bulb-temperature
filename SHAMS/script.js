const apiKey = '74939e5fd2430e1ffbf7d6276a940bc1';

document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

document.getElementById('fetchWeather').addEventListener('click', () => {
    const location = document.getElementById('manualLocation').value;
    if (location) {
        fetchWeatherDataByLocation(location);
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherData(lat, lon);
}

function fetchWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchWeatherDataByLocation(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wetBulbTemp = calculateWetBulb(temp, humidity);

    document.getElementById('temperature').textContent = temp;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wetBulb').textContent = wetBulbTemp.toFixed(2);
    document.getElementById('weatherData').classList.remove('hidden');

    if (wetBulbTemp >= 30) {
        showAlert('dangerAlert'); } else {
        showAlert('successAlert');
    }

    


    function showAlert(alertId) {
        const alertElement = document.getElementById(alertId);
        alertElement.classList.remove('hidden');
        alertElement.classList.add('fadeIn');
    }
    
    if (wetBulbTemp <= 30) {
        document.getElementById('heatwaveAlert').textContent = 'Safe - Currently You Are Not in Heatwave affected Area ...';
    } else {
        document.getElementById('heatwaveAlert').textContent = 'Danger- Currently You Are In Heatwave affected Area Be Careful ...';
    }

function calculateWetBulb(temp, humidity) {
    const wetBulb = temp * Math.atan(0.151977 * Math.sqrt(humidity + 8.313659)) +
                    Math.atan(temp + humidity) -
                    Math.atan(humidity - 1.676331) +
                    0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity) -
                    4.686035;
    return wetBulb;
}}


// slider auto changing logic

var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,  // 3 seconds
        disableOnInteraction: false,
    },
});

document.getElementById('menu-button').addEventListener('click', function() {
    var menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});