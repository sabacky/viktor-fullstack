import {useState} from "react";

export const NewEventForm = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dates, setDates] = useState<string[]>([""]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleDateChange = (index: number, value: string) => {
        const updated = [...dates];
        updated[index] = value;
        setDates(updated);
    };

    const addDateField = () => {
        if (dates.length < 10) {
            setDates([...dates, ""]);
        }
    };

    const removeDateField = (index: number) => {
        const updated = [...dates];
        updated.splice(index, 1);
        setDates(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(false);

        if (!title.trim()) {
            setError("Název události je povinný.");
            return;
        }

        const validDates = dates
            .map((d) => new Date(d).getTime())
            .filter((d) => !isNaN(d));

        if (validDates.length < 1) {
            setError("Musí být zadán alespoň 1 validní datum.");
            return;
        }

        const payload = {
            title,
            location,
            dates: validDates,
        };

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            console.log("Odpověď serveru:", response.status);
            setSuccess(true);
        } catch (err) {
            setError("Nepodařilo se odeslat.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{padding: "1rem", maxWidth: "600px", margin: "0 auto"}}>
            <h1>Nová událost</h1>

            <div>
                <label>Název*:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Místo:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div>
                <label>Termíny:</label>
                {dates.map((date, index) => (
                    <div key={index} style={{marginBottom: "0.5rem"}}>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => handleDateChange(index, e.target.value)}
                            required
                        />
                        {dates.length > 1 && (
                            <button type="button" onClick={() => removeDateField(index)}>
                                Odebrat
                            </button>
                        )}
                    </div>
                ))}
                {dates.length < 10 && (
                    <button type="button" onClick={addDateField}>
                        Přidat další datum
                    </button>
                )}
            </div>

            <button type="submit">Odeslat</button>

            {error && <p style={{color: "red"}}>{error}</p>}
            {success && <p style={{color: "green"}}>Odesláno!</p>}
        </form>
    );
};
