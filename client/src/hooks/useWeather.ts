import {useEffect, useState} from "react";

type WeatherData = {
    temperature: number;
};

export function useWeather(location: string) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                // souřadnice mšsta
                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`
                );

                if (!geoRes.ok) throw new Error("Nelze získat souřadnice");

                const geoData = await geoRes.json();
                const place = geoData.results?.[0];

                if (!place) throw new Error("Město nenalezeno");

                const {latitude, longitude} = place;

                // 2. fetch počasí
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );

                if (!weatherRes.ok) throw new Error("Nelze načíst počasí");

                const weatherData = await weatherRes.json();
                const temperature = weatherData.current_weather?.temperature;

                if (typeof temperature !== "number") {
                    throw new Error("Teplota není dostupná");
                }

                setData({temperature});
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    return {data, loading, error};
}
