import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentWeather, Forecast } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '35370c5be5d8718ff614f8e7658a4f66';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'vi');

    return this.http.get<CurrentWeather>(`${this.baseUrl}/weather`, { params });
  }

  getCurrentWeatherByCoords(lat: number, lon: number): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'vi');

    return this.http.get<CurrentWeather>(`${this.baseUrl}/weather`, { params });
  }

  getForecast(city: string): Observable<Forecast> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'vi');

    return this.http.get<Forecast>(`${this.baseUrl}/forecast`, { params });
  }

  getForecastByCoords(lat: number, lon: number): Observable<Forecast> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'vi');

    return this.http.get<Forecast>(`${this.baseUrl}/forecast`, { params });
  }
}
