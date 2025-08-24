import './App.css';
import { Event } from './components/Event/Event';
import type { EventProps } from './components/Event/types';

const sampleData: EventProps = {
    id: "1",
    title: "Týmové plánování",
    location: "Praha",
    dates: [
        {
            timestamp: new Date("2025-09-01").getTime(),
            records: [
                {name: "Bob", answer: "yes"},
                {name: "Bobek", answer: "no"}
            ]
        },
        {
            timestamp: new Date("2025-09-02").getTime(),
            records: [
                {name: "Bob", answer: "if-needed"},
                {name: "Bobek", answer: "yes"}
            ]
        }
    ]
};

function App() {
    return (
        <div className="App">
            <Event
                id={sampleData.id}
                title={sampleData.title}
                location={sampleData.location}
                dates={sampleData.dates}
            />
        </div>
    );
}

export default App;
