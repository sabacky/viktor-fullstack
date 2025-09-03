import {Link} from "react-router-dom";
import type {EventProps} from "./Event/types";

type EventsListProps = {
    data: EventProps[];
};

export const EventsList: React.FC<EventsListProps> = ({data}) => {
    return (
        <div style={{padding: "1rem"}}>
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
