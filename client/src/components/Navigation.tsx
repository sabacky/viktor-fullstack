import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav style={{padding: "1rem", borderBottom: "1px solid #ccc"}}>
            <ul style={{display: "flex", gap: "1rem", listStyle: "none", padding: 0}}>
                <li><Link to="/events">Seznam událostí</Link></li>
                <li><Link to="/events/new">Nová událost</Link></li>
            </ul>
        </nav>
    );
};
