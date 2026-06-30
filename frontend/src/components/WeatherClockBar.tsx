"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Sun, Cloud, CloudRain, Loader2 } from 'lucide-react';

interface CityData {
  name: string;
  tz: string;
  lat: number;
  lon: number;
}

const CITIES: CityData[] = [
  { name: 'Jakarta', tz: 'Asia/Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Mekkah', tz: 'Asia/Riyadh', lat: 21.4225, lon: 39.8262 },
  { name: 'Madinah', tz: 'Asia/Riyadh', lat: 24.4686, lon: 39.6142 },
  { name: 'Dubai', tz: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
];

export default function WeatherClockBar() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState<Record<string, { temp: number, code: number }>>({});

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Fetch Weather for all cities
    const fetchWeather = async () => {
      try {
        const newData: Record<string, { temp: number, code: number }> = {};
        for (const city of CITIES) {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
          if (res.ok) {
            const data = await res.json();
            newData[city.name] = {
              temp: Math.round(data.current_weather.temperature),
              code: data.current_weather.weathercode,
            };
          }
        }
        setWeatherData(newData);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      }
    };

    fetchWeather();
    // Refresh weather every 30 mins
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  if (!mounted) {
    return <div className="h-8 bg-surface-container-low w-full border-b border-white/5"></div>;
  }

  const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes
    if (code <= 3) return <Sun className="w-3.5 h-3.5 text-yellow-400" />;
    if (code <= 48) return <Cloud className="w-3.5 h-3.5 text-gray-400" />;
    return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
  };

  const formatTime = (date: Date, tz: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date).replace(/\./g, ':');
  };

  return (
    <div className="bg-[#0A0A0A] border-b border-primary/20 text-on-surface-variant text-[11px] md:text-xs py-1.5 w-full z-[60] relative shadow-[0_2px_15px_rgba(212,175,55,0.05)]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-4">
        
        {/* Left Side: Brand Tagline or Current Location (Optional) */}
        <div className="hidden md:flex items-center gap-2 text-primary/80 uppercase tracking-widest font-semibold text-[10px]">
          Talita Umroh VIP
        </div>

        {/* Right Side: Clocks & Weather */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {CITIES.map((city) => (
            <div key={city.name} className="flex items-center gap-2 md:gap-3">
              <span className="font-semibold text-primary">{city.name}</span>
              
              {/* Clock */}
              <div className="flex items-center gap-1 font-mono tracking-wider bg-white/5 px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 text-primary/70" />
                <span>{formatTime(time, city.tz)}</span>
              </div>
              
              {/* Weather */}
              <div className="flex items-center gap-1">
                {weatherData[city.name] ? (
                  <>
                    {getWeatherIcon(weatherData[city.name].code)}
                    <span>{weatherData[city.name].temp}°C</span>
                  </>
                ) : (
                  <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
