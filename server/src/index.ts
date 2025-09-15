import express from 'express';
import cors from 'cors';

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

const events = {
    items: [
        {
            id: 1,
            location: "Praha",
            title: "Super akce",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [
                        { name: "Honza", answer: "yes" },
                        { name: "Jana", answer: "no" }
                    ]
                },
                {
                    timestamp: 1726600861177,
                    records: [
                        { name: "Jana", answer: "no" }
                    ]
                }
            ]
        },
        {
            id: 2,
            location: "Brno",
            title: "Super akce 2",
            dates: [
                {
                    timestamp: 1726514405258,
                    records: [
                        { name: "Honza", answer: "no" },
                        { name: "Jana", answer: "no" },
                        { name: "Petr", answer: "no" }
                    ]
                },
                {
                    timestamp: 1726600861177,
                    records: [
                        { name: "Jana", answer: "no" }
                    ]
                }
            ]
        }
    ]
};

app.get('/api/events', (_req, res) => {
    res.json(events);
});

app.get('/api/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.items.find((e) => e.id === id);

    if (event) {
        res.json(event);
    } else {
        res.status(404).json({ error: 'Událost nenalezena' });
    }
});

app.post('/api/events', (req, res) => {
    const newEvent = req.body;

    if (
        !newEvent.title ||
        !newEvent.location ||
        !Array.isArray(newEvent.dates)
    ) {
        return res.status(400).json({ error: 'Neplatná data' });
    }
    const lastId = events.items.length > 0
        ? events.items[events.items.length - 1].id
        : 0;

    const eventWithId = {
        id: lastId + 1,
        title: newEvent.title,
        location: newEvent.location,
        dates: newEvent.dates.map((timestamp: number) => ({
            timestamp,
            records: []
        }))
    };

    events.items.push(eventWithId);

    res.status(201).json({ message: 'Událost přidána' });
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
