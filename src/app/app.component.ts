import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CurrentWeather, Forecast, ForecastItem } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentWeather: CurrentWeather | null = null;
  forecast: Forecast | null = null;
  city: string = '';
  loading = false;
  error: string | null = null;
  locationPermission = false;
  currentLocation: { lat: number; lon: number } | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getCurrentLocationWeather();
  }

  getCurrentLocationWeather() {
    this.loading = true;
    this.error = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          this.locationPermission = true;
          this.loadWeatherByCoords();
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.error = 'Không thể lấy vị trí hiện tại. Vui lòng nhập tên thành phố.';
          this.loading = false;
          this.loadDefaultWeather();
        }
      );
    } else {
      this.error = 'Trình duyệt không hỗ trợ định vị. Vui lòng nhập tên thành phố.';
      this.loading = false;
      this.loadDefaultWeather();
    }
  }

  loadWeatherByCoords() {
    if (!this.currentLocation) return;

    this.weatherService.getCurrentWeatherByCoords(this.currentLocation.lat, this.currentLocation.lon).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.city = data.name;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải dữ liệu thời tiết.';
        this.loading = false;
        console.error('Error fetching current weather:', error);
      }
    });

    this.weatherService.getForecastByCoords(this.currentLocation.lat, this.currentLocation.lon).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
      }
    });
  }

  loadDefaultWeather() {
    this.city = 'Hanoi';
    this.getWeather();
  }

  getWeather() {
    if (!this.city.trim()) return;

    this.loading = true;
    this.error = null;
    
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra tên thành phố.';
        this.loading = false;
        console.error('Error fetching current weather:', error);
      }
    });

    this.weatherService.getForecast(this.city).subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (error) => {
        console.error('Error fetching forecast:', error);
      }
    });
  }

  onCityChange() {
    if (this.city.trim()) {
      this.getWeather();
    }
  }

  onLocationClick() {
    this.getCurrentLocationWeather();
  }

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getForecastForNextDays(): ForecastItem[] {
    if (!this.forecast) return [];
    
    const today = new Date();
    const nextDays = [];
    
    for (let i = 1; i <= 5; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      
      const dayForecasts = this.forecast.list.filter(item => {
        const itemDate = new Date(item.dt * 1000);
        return itemDate.getDate() === targetDate.getDate() && 
               itemDate.getMonth() === targetDate.getMonth();
      });
      
      if (dayForecasts.length > 0) {
        nextDays.push(dayForecasts[0]);
      }
    }
    
    return nextDays;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  }

  getTemperatureColor(temp: number): string {
    if (temp < 0) return '#4A90E2'; // Blue for very cold
    if (temp < 10) return '#7ED321'; // Light blue for cold
    if (temp < 20) return '#F5A623'; // Yellow for cool
    if (temp < 30) return '#FF8C00'; // Orange for warm
    return '#D0021B'; // Red for hot
  }

  getWindDirection(deg: number): string {
    const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }
}
