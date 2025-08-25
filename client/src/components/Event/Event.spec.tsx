import { render, type RenderResult, screen } from "@testing-library/react";
import { Event } from "./Event";
import type { EventProps } from "./types";

describe("pokus", () => {
    const sampleData: EventProps = {
        id: "1",
        title: "Týmové plánování",
        location: "Praha",
        dates: [],
    };

    const renderComponent = (): RenderResult =>
        render(
            <Event
                id={sampleData.id}
                title={sampleData.title}
                location={sampleData.location}
                dates={sampleData.dates}
            />
        );

    it("should render title", () => {
        renderComponent();
        expect(screen.getByText(sampleData.title)).toBeInTheDocument();
    });

    it("should render location", () => {
        renderComponent();
        expect(screen.getByText(`Místo: ${sampleData.location}`)).toBeInTheDocument();
    });

    it("should show fallback text when no dates are available", () => {
        renderComponent();
        expect(screen.getByText("Žádné dostupné termíny.")).toBeInTheDocument();
    });
});
