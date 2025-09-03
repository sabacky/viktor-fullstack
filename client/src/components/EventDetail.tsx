import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Event } from "./Event/Event";
import type { EventProps } from "./Event/types";
import { useWeather } from "../hooks/useWeather";

export const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<EventProps | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/events/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Nepodařilo se načíst událost");
                return res.json();
            })
            .then(data => setEvent(data))
            .catch(err => setError(err.message));
    }, [id]);

    const { data: weather, loading } = useWeather(event?.location ?? "");

    if (error) return <p style={{ color: "red" }}>Chyba: {error}</p>;
    if (!event) return <p>Načítám detail události…</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <Event {...event} />

            <div style={{ marginTop: "1rem" }}>
                <h3>Počasí</h3>
                {loading && <p>Načítám počasí…</p>}
                {weather && <p>Aktuální teplota: {weather.temperature}°C</p>}
            </div>
        </div>
    );
};
