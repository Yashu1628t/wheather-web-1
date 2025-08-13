# Weather Forecast Application

A modern, responsive weather forecast application built with HTML, CSS (Tailwind), and JavaScript. The application provides real-time weather data and extended forecasts for any location worldwide.

## 🌟 Features

### Core Functionality
- **Current Weather Display**: Real-time temperature, humidity, wind speed, and weather conditions
- **Extended Forecast**: 5-day weather forecast with detailed information
- **Location-Based Weather**: Get weather for your current location using GPS
- **City Search**: Search weather by city name with autocomplete suggestions
- **Recent Searches**: Dropdown menu with recently searched cities (stored in localStorage)

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with glass morphism effects
- **Weather Icons**: Visual representation of weather conditions
- **Loading States**: Smooth loading animations and error handling
- **Real-time Clock**: Current time display in the header

### Technical Features
- **API Integration**: OpenWeatherMap API for accurate weather data
- **Error Handling**: Comprehensive error handling and user feedback
- **Input Validation**: Robust validation for city names and user inputs
- **Local Storage**: Persistent storage of recent searches
- **Geolocation**: Current location detection with permission handling

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- OpenWeatherMap API key

### Getting Started

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd weather-forecast-app
   ```

2. **Get API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/)
   - Sign up for a free account
   - Navigate to "API Keys" section
   - Copy your API key

3. **Configure API Key**
   - Open `script.js` file
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = "your_actual_api_key_here";
   ```

4. **Run the Application**
   - Open `index.html` in your web browser
   - Or serve the files using a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

5. **Access the Application**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or simply open `index.html` directly in your browser

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured layout with side-by-side components
- **Tablet (iPad Mini)**: Adjusted grid layouts and spacing
- **Mobile (iPhone SE)**: Stacked layout with touch-friendly buttons

## 🎯 Usage Guide

### Searching for Weather
1. **By City Name**:
   - Enter a city name in the search input
   - Click "Search" button or press Enter
   - View current weather and 5-day forecast

2. **By Current Location**:
   - Click "Current" button
   - Allow location access when prompted
   - View weather for your current location

3. **Recent Searches**:
   - Use the dropdown menu to select from recently searched cities
   - Click on any city to load its weather data

### Understanding the Display
- **Current Weather**: Shows temperature, humidity, wind speed, and conditions
- **Extended Forecast**: 5-day forecast with daily weather details
- **Weather Icons**: Visual indicators for different weather conditions
- **Error Messages**: Clear feedback for invalid inputs or API errors

## 🛠️ Technical Implementation

### Project Structure
```
weather-forecast-app/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css           # Custom CSS styles
└── README.md          # Documentation
```

### Key Technologies
- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **OpenWeatherMap API**: Weather data provider
- **Weather Icons**: Icon library for weather conditions

### API Endpoints Used
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- Extended Forecast: `https://api.openweathermap.org/data/2.5/forecast`

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Customization

### Styling
- Modify `style.css` for custom styles
- Update Tailwind classes in `index.html` for layout changes
- Weather icons can be customized in the `getWeatherIcon()` function

### Features
- Add more forecast days by modifying the `processForecastData()` function
- Implement additional weather data (UV index, air quality, etc.)
- Add temperature unit conversion (Celsius/Fahrenheit)

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your API key is correctly set in `script.js`
   - Verify the API key is active in your OpenWeatherMap account

2. **Location Not Working**
   - Check browser permissions for location access
   - Ensure HTTPS is used (required for geolocation in some browsers)

3. **City Not Found**
   - Verify the city name spelling
   - Try using the city name with country code (e.g., "London, UK")

4. **No Weather Data**
   - Check internet connection
   - Verify API key is valid and has sufficient quota

### Error Messages
- **"City not found"**: Invalid city name or API error
- **"Location access denied"**: Browser location permission denied
- **"Network error"**: Check internet connection and API status

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📞 Support

For support or questions:
- Check the troubleshooting section above
- Review the OpenWeatherMap API documentation
- Ensure all setup steps are completed correctly

---

**Note**: This application requires an active internet connection to fetch weather data from the OpenWeatherMap API. 