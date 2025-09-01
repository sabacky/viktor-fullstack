import {useParams} from "react-router-dom";
import {Event} from "./Event/Event";
import type {EventProps} from "./Event/types";
import {useWeather} from "../hooks/useWeather";

// dočasně
const sampleData: EventProps[] = [
    {
        id: "1",
        title: "Týmové plánování",
        location: "Praha",
        dates: [
            {
                timestamp: new Date("2025-09-01").getTime(),
                records: [
                    { name: "Bob", answer: "yes" },
                    { name: "Bobek", answer: "no" },
                ],
            },
            {
                timestamp: new Date("2025-09-02").getTime(),
                records: [
                    { name: "Bob", answer: "if-needed" },
                    { name: "Bobek", answer: "yes" },
                ],
            },
        ],
    },
];

export const EventDetail = () => {
    const {id} = useParams<{ id: string }>();
    const event = sampleData.find((e) => e.id === id);

    const {data: weather, loading, error} = useWeather(event?.location ?? "");

    if (!event) {
        return <div>Událost nebyla nalezena.</div>;
    }

    return (
        <div style={{padding: "1rem"}}>
            <Event {...event} />

            <div style={{marginTop: "1rem"}}>
                <h3>Počasí</h3>
                {loading && <p>Načítám počasí…</p>}
                {error && <p style={{ color: "red" }}>Chyba: {error}</p>}
                {weather && <p>Aktuální teplota: {weather.temperature}°C</p>}
            </div>
        </div>
    );
};
