  // Sample weather data
  const weatherData = {
    location: "New York, US",
    current: {
        temp: 24,
        condition: "Sunny",
        icon: "fas fa-sun",
        wind: 12,
        humidity: 65,
        pressure: 1013,
        uv: 6,
        visibility: 10,
        feelsLike: 26
    },
    hourly: [
        { time: "4 PM", temp: 25, icon: "fas fa-sun" },
        { time: "5 PM", temp: 24, icon: "fas fa-sun" },
        { time: "6 PM", temp: 23, icon: "fas fa-cloud-sun" },
        { time: "7 PM", temp: 22, icon: "fas fa-cloud-sun" },
        { time: "8 PM", temp: 21, icon: "fas fa-cloud" },
        { time: "9 PM", temp: 20, icon: "fas fa-cloud" },
        { time: "10 PM", temp: 19, icon: "fas fa-cloud" },
        { time: "11 PM", temp: 18, icon: "fas fa-cloud" },
        { time: "12 AM", temp: 18, icon: "fas fa-cloud" },
        { time: "1 AM", temp: 17, icon: "fas fa-cloud" },
        { time: "2 AM", temp: 17, icon: "fas fa-cloud" },
        { time: "3 AM", temp: 16, icon: "fas fa-cloud" }
    ],
    daily: [
        { day: "Saturday", icon: "fas fa-cloud-sun", high: 26, low: 17 },
        { day: "Sunday", icon: "fas fa-sun", high: 28, low: 19 },
        { day: "Monday", icon: "fas fa-cloud-showers-heavy", high: 22, low: 16 },
        { day: "Tuesday", icon: "fas fa-cloud-sun", high: 24, low: 18 },
        { day: "Wednesday", icon: "fas fa-sun", high: 27, low: 20 }
    ]
};

// Update DOM with weather data
function updateWeatherUI() {
    // Update location and date
    document.querySelector('.location-info h1').textContent = weatherData.location;
    
    // Update current weather
    document.querySelector('.temperature').textContent = `${weatherData.current.temp}°`;
    document.querySelector('.weather-icon i').className = weatherData.current.icon;
    document.querySelector('.weather-icon p').textContent = weatherData.current.condition;
    
    // Update details
    document.querySelectorAll('.detail-card h3')[0].textContent = `${weatherData.current.wind} km/h`;
    document.querySelectorAll('.detail-card h3')[1].textContent = `${weatherData.current.humidity}%`;
    document.querySelectorAll('.detail-card h3')[2].textContent = `${weatherData.current.pressure} hPa`;
    document.querySelectorAll('.detail-card h3')[3].textContent = `${weatherData.current.uv} Moderate`;
    document.querySelectorAll('.detail-card h3')[4].textContent = `${weatherData.current.visibility} km`;
    document.querySelectorAll('.detail-card h3')[5].textContent = `${weatherData.current.feelsLike}°`;
    
    // Update hourly forecast
    const hourlyContainer = document.getElementById('hourly-container');
    hourlyContainer.innerHTML = '';
    
    weatherData.hourly.forEach(hour => {
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        hourlyItem.innerHTML = `
            <p><strong>${hour.time}</strong></p>
            <i class="${hour.icon}"></i>
            <p>${hour.temp}°</p>
        `;
        hourlyContainer.appendChild(hourlyItem);
    });
    
    // Update daily forecast
    const dailyContainer = document.getElementById('daily-container');
    dailyContainer.innerHTML = '';
    
    weatherData.daily.forEach(day => {
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily-item';
        dailyItem.innerHTML = `
            <p class="day">${day.day}</p>
            <i class="${day.icon}"></i>
            <div class="temp-range">
                <span class="high">${day.high}°</span>
                <span class="low">${day.low}°</span>
            </div>
        `;
        dailyContainer.appendChild(dailyItem);
    });
}

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput) {
        // In a real app, this would fetch data from a weather API
        weatherData.location = searchInput;
        updateWeatherUI();
        
        // Show loading state
        const searchBtn = document.getElementById('search-btn');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading';
        
        // Simulate API delay
        setTimeout(() => {
            searchBtn.innerHTML = originalText;
            
            // Update background based on weather condition
            const bg = document.querySelector('body');
            bg.style.background = 'linear-gradient(to bottom, #2c3e50, #3498db)';
            
            // Reset background after animation
            setTimeout(() => {
                bg.style.background = 'linear-gradient(to bottom, #1a2980, #26d0ce)';
            }, 1000);
        }, 1000);
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateWeatherUI();
    
    // Update time every minute
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        document.querySelector('.location-info p').textContent = `${dateString} | ${timeString}`;
    }
    
    updateTime();
    setInterval(updateTime, 60000);
});
