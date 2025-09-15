import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { EventProps } from "./Event/types";

export const EventsList = () => {
    const [data, setData] = useState<EventProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/events")
            .then((res) => {
                if (!res.ok) throw new Error("Chyba při načítání událostí");
                return res.json();
            })
            .then((json) => setData(json.items))
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

