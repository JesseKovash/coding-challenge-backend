import React from "react";
import { Weather, DetailedEvent } from "../helpers/interfaces";

type oneEventProps = {
  eventList: DetailedEvent[] | null;
  retrieveDetails: (id: string) => void;
};

const OneEvent: React.FC<oneEventProps> = ({ eventList, retrieveDetails }) => {

  const eventElements = eventList?.map((oneEvent, index) => {
    return (
      <div className="one-event">
        {"weather" in oneEvent ? (
        // if weather is a property on oneEvent, 'get event details' button has been clicked and the event was updated
          <div className="one-event-left">
            <h3>{oneEvent.name}</h3>
            <h4>{oneEvent.location}</h4>
            <h4>{new Date(oneEvent.date).toDateString()}</h4>
            <h4>{oneEvent.isOutside ? "Outdoor Event" : "Indoor Event"}</h4>
            <h4>
              {oneEvent.organizer
                ? `Organizer: ${oneEvent?.organizer.name}`
                : null}
            </h4>
            <h4>{`${oneEvent.attendees?.length} people are attending`}</h4>
          </div>
        ) : (
          // weather is not a property on oneEvent, default setting prior to getting event details
          <div className="one-event-left">
            <h3>{oneEvent.name}</h3>
            <h4>{oneEvent.location}</h4>
            <h4>{new Date(oneEvent.date).toDateString()}</h4>
          </div>
        )}

        {"weather" in oneEvent ? null : (
          // hides button if 'get event details' has already been clicked
          <div id={`id${index}`}>
            <button
              className={`weather-button class${index}`}
              onClick={() => retrieveDetails(oneEvent._id!)}
            >
              Get Event Details
            </button>
          </div>
        )}
        {"weather" in oneEvent && oneEvent.weather ? (
          //if weather is a property on oneEvent and is not null, display weather for event
          <div className="weather">
            <h3>{`${oneEvent.weather.temperatureInDegreesCelcius}`}
            <span>&deg; C</span>
            </h3>
            <h4>{
              oneEvent.weather.chanceOfRain === 'Unknown Chance of Rain' ?
              `${oneEvent.weather.chanceOfRain}` :
            `${oneEvent.weather.chanceOfRain}% Chance of Rain`}
            </h4>
          </div>
        ) : null}
      </div>
    );
  });
  return <div className="event-items">
    {eventElements}
    </div>;
};

export default OneEvent;
