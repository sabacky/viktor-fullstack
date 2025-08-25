type Props = {
    title: string;
    location?: string;
};

export const EventHeader = ({title, location}: Props) => {
    return (
        <div>
            <h2>{title}</h2>
            {location && <p>Místo: {location}</p>}
        </div>
    );
};
