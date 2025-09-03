import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {EventsList} from './components/EventsList';
import {EventDetail} from './components/EventDetail';
import {NewEventForm} from './components/NewEventForm';
import {Navigation} from './components/Navigation';
import type {EventProps} from './components/Event/types';

const sampleData: EventProps = {
    id: "1",
    title: "Týmové plánování",
    location: "Praha",
    dates: [
        {
            timestamp: new Date("2025-09-01").getTime(),
            records: [
                { name: "Bob", answer: "yes" },
                { name: "Bobek", answer: "no" }
            ]
        },
        {
            timestamp: new Date("2025-09-02").getTime(),
            records: [
                { name: "Bob", answer: "if-needed" },
                { name: "Bobek", answer: "yes" }
            ]
        }
    ]
};

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/events" element={<EventsList data={[sampleData]} />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/events/new" element={<NewEventForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
