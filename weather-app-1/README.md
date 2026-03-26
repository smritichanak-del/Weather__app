# Weather App

A React application that displays local area weather results for various regions. This project allows users to search for weather data based on their location or view weather information for multiple regions.

## Features

- Current weather information for a selected location
- 5-day weather forecast
- Temperature visualization chart
- Theme toggle for light and dark modes
- Search functionality for different locations
- Regional weather display

## Technologies Used

- React
- Vite
- OpenWeatherMap API
- CSS

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd weather-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_API_KEY=your_api_key_here
   ```

## Usage

To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Components

- **App.jsx**: Main component managing state and layout.
- **SearchBox.jsx**: Component for user input to search for weather data.
- **WeatherCard.jsx**: Displays current weather information.
- **Forecast.jsx**: Shows the weather forecast for upcoming days.
- **ThemeToggle.jsx**: Allows users to switch between light and dark themes.
- **TempChart.jsx**: Visualizes temperature data over time.

## Pages

- **Home.jsx**: Landing page with introductory content.
- **RegionalWeather.jsx**: Displays weather information for various regions.

## Hooks

- **useWeather.js**: Custom hook for fetching weather data.

## Utilities

- **api.js**: Utility functions for making API calls.

## Styles

- **App.css**: CSS styles for the application.

## License

This project is licensed under the MIT License.