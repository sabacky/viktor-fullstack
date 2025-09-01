import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { EventDetail } from "../EventDetail";

// Flexibilní mockování hooku
const mockUseWeather = jest.fn();

jest.mock("../../hooks/useWeather", () => ({
    useWeather: () => mockUseWeather(),
}));

describe("EventDetail", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("zobrazí událost podle ID a počasí", () => {
        mockUseWeather.mockReturnValue({
            data: { temperature: 23 },
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={["/events/1"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Týmové plánování/i)).toBeInTheDocument();
        expect(screen.getByText(/Praha/i)).toBeInTheDocument();
        expect(screen.getByText(/Počasí/i)).toBeInTheDocument();
        expect(screen.getByText(/23°C/i)).toBeInTheDocument();
    });

    it("zobrazí fallback, pokud událost neexistuje", () => {
        mockUseWeather.mockReturnValue({
            data: { temperature: 23 },
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={["/events/999"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Událost nebyla nalezena/i)).toBeInTheDocument();
    });

    it("zobrazí chybovou hlášku, pokud počasí nelze načíst", () => {
        mockUseWeather.mockReturnValue({
            data: null,
            loading: false,
            error: "Chyba počasí",
        });

        render(
            <MemoryRouter initialEntries={["/events/1"]}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Chyba počasí/i)).toBeInTheDocument();
    });
});
