// Professional Weather Forecast Application
// API Configuration
const API_KEY = "a284fb1ecae65c96fcfa4a71ca613427"; // OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const cityInput = document.getElementById("cityInput");
const currentWeather = document.getElementById("currentWeather");
const currentWeatherContent = document.getElementById("currentWeatherContent");
const currentLocation = document.getElementById("currentLocation");
const extendedForecast = document.getElementById("extendedForecast");
const forecastContainer = document.getElementById("forecastContainer");
const recentCities = document.getElementById("recentCities");
const recentSelect = document.getElementById("recentSelect");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const currentTime = document.getElementById("currentTime");

// Theme elements
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.getElementById("body");
const header = document.getElementById("header");
const searchSection = document.getElementById("searchSection");
const weatherSection = document.getElementById("weatherSection");
const footer = document.getElementById("footer");

// Location tab elements
const popularTab = document.getElementById("popularTab");
const northTab = document.getElementById("northTab");
const southTab = document.getElementById("southTab");
const eastTab = document.getElementById("eastTab");
const westTab = document.getElementById("westTab");
const centralTab = document.getElementById("centralTab");
const popularCities = document.getElementById("popularCities");
const northIndia = document.getElementById("northIndia");
const southIndia = document.getElementById("southIndia");
const eastIndia = document.getElementById("eastIndia");
const westIndia = document.getElementById("westIndia");
const centralIndia = document.getElementById("centralIndia");

// Application State
let recentSearches = [];
let currentLocationData = null;
let currentTheme = 'light';

// Theme configurations
const themes = {
    light: {
        body: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
        header: 'bg-white/90',
        searchSection: 'bg-white/90',
        weatherSection: 'bg-white/90',
        footer: 'bg-white/90',
        icon: 'fas fa-moon',
        iconColor: 'text-gray-700'
    },
    dark: {
        body: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
        header: 'bg-gray-800/90',
        searchSection: 'bg-gray-800/90',
        weatherSection: 'bg-gray-800/90',
        footer: 'bg-gray-800/90',
        icon: 'fas fa-sun',
        iconColor: 'text-yellow-400'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    loadTheme();
});

// Initialize application
function initializeApp() {
    loadRecentSearches();
    setupEventListeners();
    setupPopularCities();
    setupLocationTabs();
    setupThemeToggle();
}

// Setup event listeners
function setupEventListeners() {
    // Search button click
    searchBtn.addEventListener("click", handleSearch);
    
    // Current location button click
    currentLocationBtn.addEventListener("click", handleCurrentLocation);
    
    // Enter key in input field
    cityInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
    
    // Recent cities dropdown change
    recentSelect.addEventListener("change", function() {
        const selectedCity = recentSelect.value;
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    });

    // Input field focus for better UX
    cityInput.addEventListener("focus", function() {
        this.parentElement.classList.add("ring-2", "ring-blue-500");
    });

    cityInput.addEventListener("blur", function() {
        this.parentElement.classList.remove("ring-2", "ring-blue-500");
    });
}

// Setup location tabs
function setupLocationTabs() {
    popularTab.addEventListener('click', () => switchTab('popular'));
    northTab.addEventListener('click', () => switchTab('north'));
    southTab.addEventListener('click', () => switchTab('south'));
    eastTab.addEventListener('click', () => switchTab('east'));
    westTab.addEventListener('click', () => switchTab('west'));
    centralTab.addEventListener('click', () => switchTab('central'));
}

// Switch between location tabs
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.location-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-blue-500', 'text-white');
        tab.classList.add('bg-gray-200', 'text-gray-700');
    });

    // Hide all location sections
    document.querySelectorAll('.location-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected tab and section
    switch(tabName) {
        case 'popular':
            popularTab.classList.add('active', 'bg-blue-500', 'text-white');
            popularTab.classList.remove('bg-gray-200', 'text-gray-700');
            popularCities.classList.remove('hidden');
            break;
        case 'north':
            northTab.classList.add('active', 'bg-blue-500', 'text-white');
            northTab.classList.remove('bg-gray-200', 'text-gray-700');
            northIndia.classList.remove('hidden');
            break;
        case 'south':
            southTab.classList.add('active', 'bg-blue-500', 'text-white');
            southTab.classList.remove('bg-gray-200', 'text-gray-700');
            southIndia.classList.remove('hidden');
            break;
        case 'east':
            eastTab.classList.add('active', 'bg-blue-500', 'text-white');
            eastTab.classList.remove('bg-gray-200', 'text-gray-700');
            eastIndia.classList.remove('hidden');
            break;
        case 'west':
            westTab.classList.add('active', 'bg-blue-500', 'text-white');
            westTab.classList.remove('bg-gray-200', 'text-gray-700');
            westIndia.classList.remove('hidden');
            break;
        case 'central':
            centralTab.classList.add('active', 'bg-blue-500', 'text-white');
            centralTab.classList.remove('bg-gray-200', 'text-gray-700');
            centralIndia.classList.remove('hidden');
            break;
    }
}

// Setup theme toggle
function setupThemeToggle() {
    themeToggle.addEventListener('click', toggleTheme);
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// Apply theme
function applyTheme(theme) {
    const config = themes[theme];
    
    // Update body background
    body.className = `min-h-screen transition-all duration-500 ${config.body}`;
    
    // Update header
    header.className = `backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-40 transition-all duration-500 ${config.header}`;
    
    // Update search section
    searchSection.className = `backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 transition-all duration-500 ${config.searchSection}`;
    
    // Update weather section
    if (weatherSection) {
        weatherSection.className = `backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 transition-all duration-500 ${config.weatherSection}`;
    }
    
    // Update footer
    footer.className = `backdrop-blur-sm border-t border-gray-200 mt-auto transition-all duration-500 ${config.footer}`;
    
    // Update theme icon
    themeIcon.className = `${config.icon} ${config.iconColor}`;
    
    // Update text colors for dark theme
    if (theme === 'dark') {
        document.querySelectorAll('h1, h2, h3').forEach(el => {
            el.classList.add('text-white');
        });
        document.querySelectorAll('p, span').forEach(el => {
            if (!el.classList.contains('text-white') && !el.classList.contains('text-gray-600')) {
                el.classList.add('text-gray-300');
            }
        });
    } else {
        document.querySelectorAll('h1, h2, h3').forEach(el => {
            el.classList.remove('text-white');
        });
        document.querySelectorAll('p, span').forEach(el => {
            el.classList.remove('text-gray-300');
        });
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    applyTheme(currentTheme);
}

// Setup popular cities buttons
function setupPopularCities() {
    // Popular cities
    const popularCityBtns = document.querySelectorAll('.popular-city-btn');
    popularCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-blue-300');
            setTimeout(() => {
                this.classList.remove('bg-blue-300');
            }, 200);
        });
    });

    // North India cities
    const northCityBtns = document.querySelectorAll('.north-city-btn');
    northCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-red-300');
            setTimeout(() => {
                this.classList.remove('bg-red-300');
            }, 200);
        });
    });

    // South India cities
    const southCityBtns = document.querySelectorAll('.south-city-btn');
    southCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-orange-300');
            setTimeout(() => {
                this.classList.remove('bg-orange-300');
            }, 200);
        });
    });

    // East India cities
    const eastCityBtns = document.querySelectorAll('.east-city-btn');
    eastCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-yellow-300');
            setTimeout(() => {
                this.classList.remove('bg-yellow-300');
            }, 200);
        });
    });

    // West India cities
    const westCityBtns = document.querySelectorAll('.west-city-btn');
    westCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-green-300');
            setTimeout(() => {
                this.classList.remove('bg-green-300');
            }, 200);
        });
    });

    // Central India cities
    const centralCityBtns = document.querySelectorAll('.central-city-btn');
    centralCityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            cityInput.value = city;
            fetchWeatherData(city);
            addToRecentSearches(city);
            
            // Add visual feedback
            this.classList.add('bg-purple-300');
            setTimeout(() => {
                this.classList.remove('bg-purple-300');
            }, 200);
        });
    });
}

// Handle search button click
function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!validateInput(city)) {
        return;
    }
    
    fetchWeatherData(city);
    addToRecentSearches(city);
}

// Handle current location button click
function handleCurrentLocation() {
    if (!navigator.geolocation) {
        showError("Geolocation is not supported by this browser.");
        return;
    }
    
    showLoading(true);
    hideError();
    
    // Add loading state to button
    currentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    currentLocationBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
            resetLocationButton();
        },
        function(error) {
            showLoading(false);
            resetLocationButton();
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    showError("Location access denied. Please enable location services.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    showError("Location information unavailable.");
                    break;
                case error.TIMEOUT:
                    showError("Location request timed out.");
                    break;
                default:
                    showError("An unknown error occurred while getting location.");
            }
        }
    );
}

// Reset location button state
function resetLocationButton() {
    currentLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Current';
    currentLocationBtn.disabled = false;
}

// Validate user input
function validateInput(city) {
    if (!city) {
        showError("Please enter a city name.");
        return false;
    }
    
    if (city.length < 2) {
        showError("City name must be at least 2 characters long.");
        return false;
    }
    
    if (!/^[a-zA-Z\s,.-]+$/.test(city)) {
        showError("Please enter a valid city name (letters, spaces, commas, dots, and hyphens only).");
        return false;
    }
    
    hideError();
    return true;
}

// Fetch weather data by city name
async function fetchWeatherData(city) {
    showLoading(true);
    hideError();
    
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
            fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        ]);
        
        if (!currentResponse.ok) {
            throw new Error(`City not found: ${city}`);
        }
        
        if (!forecastResponse.ok) {
            throw new Error("Unable to fetch forecast data");
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(currentData);
        displayExtendedForecast(forecastData);
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Fetch weather data by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
            fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        ]);
        
        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to fetch weather data for current location");
        }
        
        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        
        displayCurrentWeather(currentData);
        displayExtendedForecast(forecastData);
        
        // Update input field with current location city name
        cityInput.value = currentData.name;
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const weather = data.weather[0];
    const main = data.main;
    const wind = data.wind;
    const sys = data.sys;
    
    const weatherIcon = getWeatherIcon(weather.id);
    const weatherClass = getWeatherClass(weather.id);
    
    // Update location display
    currentLocation.textContent = `${data.name}, ${sys.country}`;
    
    currentWeatherContent.innerHTML = `
        <div class="weather-card bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-xl p-6 text-center fade-in border border-blue-100">
            <div class="weather-icon ${weatherClass} text-4xl mb-4">${weatherIcon}</div>
            <div class="temperature text-4xl font-bold text-gray-800 mb-2">${Math.round(main.temp)}<span class="temperature-unit text-2xl">°C</span></div>
            <div class="text-lg font-semibold text-gray-700 mb-2">${weather.main}</div>
            <div class="text-sm text-gray-600 capitalize">${weather.description}</div>
            <div class="mt-3 text-xs text-gray-500">
                <i class="fas fa-sun mr-1"></i>${new Date(data.dt * 1000).toLocaleTimeString()}
            </div>
        </div>
        
        <div class="weather-card bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-sm rounded-xl p-6 fade-in border border-red-100">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-thermometer-half text-red-500 text-xl"></i>
                <span class="text-sm text-gray-600 font-medium">Temperature</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">${Math.round(main.temp)}°C</div>
            <div class="text-sm text-gray-600 mb-2">
                Feels like: ${Math.round(main.feels_like)}°C
            </div>
            <div class="text-xs text-gray-500">
                <div class="flex justify-between">
                    <span>Min: ${Math.round(main.temp_min)}°C</span>
                    <span>Max: ${Math.round(main.temp_max)}°C</span>
                </div>
            </div>
        </div>
        
        <div class="weather-card bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm rounded-xl p-6 fade-in border border-blue-100">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-tint text-blue-500 text-xl"></i>
                <span class="text-sm text-gray-600 font-medium">Humidity</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">${main.humidity}%</div>
            <div class="text-sm text-gray-600">Relative humidity</div>
            <div class="mt-3 bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: ${main.humidity}%"></div>
            </div>
        </div>
        
        <div class="weather-card bg-gradient-to-br from-gray-50 to-slate-50 backdrop-blur-sm rounded-xl p-6 fade-in border border-gray-100">
            <div class="flex items-center justify-between mb-4">
                <i class="fas fa-wind text-gray-500 text-xl"></i>
                <span class="text-sm text-gray-600 font-medium">Wind Speed</span>
            </div>
            <div class="text-3xl font-bold text-gray-800 mb-2">${wind.speed} m/s</div>
            <div class="text-sm text-gray-600 mb-2">
                Direction: ${wind.deg ? getWindDirection(wind.deg) : 'N/A'}
            </div>
            <div class="text-xs text-gray-500">
                <i class="fas fa-compass mr-1"></i>${wind.deg || 0}°
            </div>
        </div>
    `;
    
    currentWeather.classList.remove("hidden");
}

// Display extended forecast
function displayExtendedForecast(data) {
    const dailyForecasts = processForecastData(data.list);
    
    forecastContainer.innerHTML = dailyForecasts.map((forecast, index) => {
        const weatherIcon = getWeatherIcon(forecast.weather.id);
        const weatherClass = getWeatherClass(forecast.weather.id);
        const date = new Date(forecast.dt * 1000);
        
        return `
            <div class="weather-card bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-xl p-6 text-center fade-in border border-gray-100 hover:shadow-lg transition-all duration-300" style="animation-delay: ${index * 0.1}s">
                <div class="text-lg font-semibold text-gray-800 mb-2">
                    ${date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div class="text-sm text-gray-600 mb-3">
                    ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div class="weather-icon ${weatherClass} text-3xl mb-3">${weatherIcon}</div>
                <div class="text-2xl font-bold text-gray-800 mb-2">
                    ${Math.round(forecast.main.temp)}°C
                </div>
                <div class="text-sm text-gray-600 mb-3 capitalize">
                    ${forecast.weather.description}
                </div>
                <div class="space-y-2 text-xs text-gray-500">
                    <div class="flex justify-between items-center">
                        <span><i class="fas fa-wind mr-1"></i>Wind:</span>
                        <span class="font-medium">${forecast.wind.speed} m/s</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span><i class="fas fa-tint mr-1"></i>Humidity:</span>
                        <span class="font-medium">${forecast.main.humidity}%</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span><i class="fas fa-thermometer-half mr-1"></i>Feels like:</span>
                        <span class="font-medium">${Math.round(forecast.main.feels_like)}°C</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    extendedForecast.classList.remove("hidden");
}

// Process forecast data to get daily forecasts
function processForecastData(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                dt: item.dt,
                main: item.main,
                weather: item.weather[0],
                wind: item.wind,
                count: 1
            };
        } else {
            // Average the values for the day
            const existing = dailyData[dayKey];
            existing.main.temp = (existing.main.temp + item.main.temp) / 2;
            existing.main.humidity = Math.round((existing.main.humidity + item.main.humidity) / 2);
            existing.main.feels_like = (existing.main.feels_like + item.main.feels_like) / 2;
            existing.wind.speed = (existing.wind.speed + item.wind.speed) / 2;
            existing.count++;
        }
    });
    
    return Object.values(dailyData).slice(0, 5); // Return first 5 days
}

// Get weather icon based on weather condition ID
function getWeatherIcon(weatherId) {
    const icons = {
        200: 'wi-thunderstorm',
        201: 'wi-thunderstorm',
        202: 'wi-thunderstorm',
        210: 'wi-lightning',
        211: 'wi-lightning',
        212: 'wi-lightning',
        221: 'wi-lightning',
        230: 'wi-thunderstorm',
        231: 'wi-thunderstorm',
        232: 'wi-thunderstorm',
        300: 'wi-sprinkle',
        301: 'wi-sprinkle',
        302: 'wi-sprinkle',
        310: 'wi-sprinkle',
        311: 'wi-sprinkle',
        312: 'wi-sprinkle',
        313: 'wi-sprinkle',
        314: 'wi-sprinkle',
        321: 'wi-sprinkle',
        500: 'wi-rain',
        501: 'wi-rain',
        502: 'wi-rain',
        503: 'wi-rain',
        504: 'wi-rain',
        511: 'wi-rain-mix',
        520: 'wi-showers',
        521: 'wi-showers',
        522: 'wi-showers',
        531: 'wi-showers',
        600: 'wi-snow',
        601: 'wi-snow',
        602: 'wi-snow',
        611: 'wi-sleet',
        612: 'wi-sleet',
        613: 'wi-sleet',
        615: 'wi-rain-mix',
        616: 'wi-rain-mix',
        620: 'wi-rain-mix',
        621: 'wi-snow',
        622: 'wi-snow',
        701: 'wi-fog',
        711: 'wi-smoke',
        721: 'wi-day-haze',
        731: 'wi-dust',
        741: 'wi-fog',
        751: 'wi-dust',
        761: 'wi-dust',
        762: 'wi-dust',
        771: 'wi-strong-wind',
        781: 'wi-tornado',
        800: 'wi-day-sunny',
        801: 'wi-day-cloudy',
        802: 'wi-cloudy',
        803: 'wi-cloudy',
        804: 'wi-cloudy'
    };
    
    return icons[weatherId] || 'wi-day-sunny';
}

// Get weather class for styling
function getWeatherClass(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'weather-stormy';
    if (weatherId >= 300 && weatherId < 400) return 'weather-rainy';
    if (weatherId >= 500 && weatherId < 600) return 'weather-rainy';
    if (weatherId >= 600 && weatherId < 700) return 'weather-snowy';
    if (weatherId >= 700 && weatherId < 800) return 'weather-cloudy';
    if (weatherId === 800) return 'weather-sunny';
    return 'weather-cloudy';
}

// Get wind direction
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

// Add city to recent searches
function addToRecentSearches(city) {
    if (!recentSearches.includes(city)) {
        recentSearches.unshift(city);
        if (recentSearches.length > 10) {
            recentSearches = recentSearches.slice(0, 10);
        }
        localStorage.setItem("recentCities", JSON.stringify(recentSearches));
        updateRecentCitiesDropdown();
    }
}

// Load recent searches from localStorage
function loadRecentSearches() {
    const stored = localStorage.getItem("recentCities");
    if (stored) {
        recentSearches = JSON.parse(stored);
        updateRecentCitiesDropdown();
    }
}

// Update recent cities dropdown
function updateRecentCitiesDropdown() {
    if (recentSearches.length > 0) {
        recentSelect.innerHTML = `
            <option value="">Select a recent city...</option>
            ${recentSearches.map(city => `<option value="${city}">${city}</option>`).join('')}
        `;
        recentCities.classList.remove("hidden");
    } else {
        recentCities.classList.add("hidden");
    }
}

// Show loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove("hidden");
        currentWeather.classList.add("hidden");
        extendedForecast.classList.add("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove("hidden");
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.classList.add("hidden");
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    currentTime.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
