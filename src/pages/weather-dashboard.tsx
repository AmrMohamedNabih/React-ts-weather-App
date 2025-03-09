import CurrentWeather from "@/components/current-weather";
import ErrorAlert from "@/components/error-alert";
import HourlyTemperature from "@/components/hourly-temperature";

import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { WeatherDetails } from "@/components/weather-details";
import { WeatherForecast } from "@/components/weather-forecast";

import { useGeoLocation } from "@/hooks/use-geolocatiob";
import {
  useForecastQuery,
  useReversGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { RefreshCw } from "lucide-react";

function WeatherDashboard() {
  const {
    coordinates,
    isLoading: LocationLoading,
    error: LocationError,
    getLocation,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReversGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (LocationLoading) {
    return <LoadingSkeleton />;
  }
  if (LocationError || !coordinates) {
    return (
      <ErrorAlert
        message={LocationError ? LocationError : "Location Permission Required"}
      />
    );
  }
  const locationName = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        message={"Failed to fetch weather Information please try again"}
      />
    );
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="space-y-4">
      {/* favorites  */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`w-4 h-4 ${
              weatherQuery.isFetching || forecastQuery.isFetching
                ? "animate-spin"
                : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} location={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
