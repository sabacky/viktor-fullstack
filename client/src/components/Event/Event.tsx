import React from "react";
import type {EventProps, UserRecord} from "./types";

export const Event: React.FC<EventProps> = ({location, title, dates}) => {
    const allNames: string[] = [];

    dates.forEach((date) => {
        date.records.forEach((record) => {
            if (!allNames.includes(record.name)) {
                allNames.push(record.name);
            }
        });
    });

    const votes: Record<string, Record<number, UserRecord["answer"]>> = {};

    allNames.forEach((name) => {
        votes[name] = {};

        dates.forEach((date) => {
            const record = date.records.find((r) => r.name === name);

            if (record) {
                votes[name][date.timestamp] = record.answer;
            }
        });
    });

    return (
        <div>
            <h2>{title}</h2>
            {location && <p>Místo: {location}</p>}

            {dates.length === 0 ? (
                <p>Žádné dostupné termíny.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Účastník</th>
                        {dates.map((d) => (
                            <th key={d.timestamp}>
                                {new Date(d.timestamp).toLocaleDateString("cs-CZ")}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {allNames.map((name) => (
                        <tr key={name}>
                            <td>{name}</td>
                            {dates.map((d) => {
                                const vote = votes[name]?.[d.timestamp] ?? "-";
                                return <td key={d.timestamp}>{vote}</td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
