import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for styling the calendar

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Store events

  // Handle date selection
  const onDateChange = (newDate) => {
    setDate(newDate);
    // You can fetch or filter events based on the selected date here
  };

  // Add event (for example purposes, we just add an event on the selected date)
  const addEvent = () => {
    const event = prompt('Enter event details:');
    if (event) {
      setEvents([...events, { date, event }]);
    }
  };

  // Filter events based on the selected date
  const getEventsForSelectedDate = (selectedDate) => {
    return events.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };

  return (
    <div className="calendar-container-box">
      <h3>Event Calendar</h3>
      <Calendar onChange={onDateChange} value={date} />
      
      <div className="event-details">
        <h4>Events on {date.toDateString()}:</h4>
        <ul>
          {getEventsForSelectedDate(date).map((event, index) => (
            <li key={index}>{event.event}</li>
          ))}
        </ul>
      </div>

      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};

export default EventCalendar;


// // src/modules/Calendar/Calendar.js
// import React from 'react';
// import './Calendar.css'; // Make sure the CSS file is linked correctly

// const Calendar = () => {
//   return (
//     <div className="calendar-container">
//       <h3>Upcoming Events</h3>
//       <p>This is the calendar component where you can display events.</p>
//       {/* Add calendar logic or calendar UI here */}
//     </div>
//   );
// };

// export default Calendar;



// // src/modules/calendar/Calendar.js
// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./Calendar.css";

// const EventCalendar = ({ events, addEvent }) => {
//   const [date, setDate] = useState(new Date());
//   const [eventName, setEventName] = useState("");

//   // Handle date change
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };

//   // Handle event add
//   const handleAddEvent = () => {
//     if (eventName.trim() === "") return;

//     addEvent({
//       id: Date.now(),
//       name: eventName,
//       date: date.toISOString().split("T")[0], // Store date in YYYY-MM-DD format
//     });

//     setEventName(""); // Clear input after adding
//   };

//   // Filter events for the selected date
//   const eventsForSelectedDate = events.filter(
//     (event) => event.date === date.toISOString().split("T")[0]
//   );

//   return (
//     <div className="calendar-container">
//       <h2>Event Calendar</h2>

//       <div className="calendar-wrapper">
//         <Calendar onChange={handleDateChange} value={date} />
//       </div>

//       <div className="events">
//         <h3>Events for {date.toDateString()}:</h3>
//         <ul>
//           {eventsForSelectedDate.length > 0 ? (
//             eventsForSelectedDate.map((event) => (
//               <li key={event.id}>{event.name}</li>
//             ))
//           ) : (
//             <li>No events for this day</li>
//           )}
//         </ul>
//       </div>

//       {/* Add New Event */}
//       <div className="add-event">
//         <input
//           type="text"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           placeholder="Event name"
//         />
//         <button onClick={handleAddEvent}>Add Event</button>
//       </div>
//     </div>
//   );
// };

// export default EventCalendar;
