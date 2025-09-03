import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {EventsList} from "../EventsList";
import {EventProps} from "./types";

const sampleData: EventProps = {
    id: "1",
    title: "Týmové plánování",
    location: "Praha",
    dates: [
        {
            timestamp: 1693545600000,
            records: []
        }
        ],
    answers: {
        Bob: ["yes", "yes"],
        Bobek: ["no", "yes"],
    },
};

describe("EventsList", () => {
    it("zobrazí nadpis a událost", () => {
        render(
            <BrowserRouter>
                <EventsList data={[sampleData]} />
            </BrowserRouter>
        );

        expect(screen.getByRole("heading", { name: /seznam událostí/i })).toBeInTheDocument();
        expect(screen.getByText(/Týmové plánování/i)).toBeInTheDocument();

        const link = screen.getByRole("link", { name: /týmové plánování/i });
        expect(link).toHaveAttribute("href", "/events/1");
    });
});
