import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { EventProps } from "./Event/types";
import client from "../api/client";

export const EventsList = () => {
    const [data, setData] = useState<EventProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        client.GET("/api/events")
            .then((response) => {
                if (response.error) throw new Error("Chyba při načítání událostí");
                setData(response.data?.items || []);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Načítám události...</p>;
    if (error) return <p>Chyba: {error}</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Seznam událostí</h1>
            <ul>
                {data.map((event) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};