import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Event } from "./Event/Event";
import type { EventProps } from "./Event/types";
import { useWeather } from "../hooks/useWeather";
import client from "../api/client";

export const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<EventProps | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        client.GET("/api/events/{id}", {
            params: {
                path: {
                    id: Number(id)
                }
            }
        })
            .then(response => {
                if (response.error) throw new Error("Nepodařilo se načíst událost");
                if (response.data) setEvent(response.data);
            })
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