import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// ✅ Correcting selectedDate type to `Date | null`
type Value = Date | null;

// Event type
interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
}

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("12:00"); // Default time

  // ✅ Handle date change (Ensures `selectedDate` is always `Date | null`)
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setSelectedDate(value[0]); // Use first date in range
    } else {
      setSelectedDate(null); // Explicitly set null if invalid
    }
  };

  // Open event dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close event dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEventTitle("");
    setEventTime("12:00"); // Reset time
  };

  // Add new event
  const handleAddEvent = () => {
    if (newEventTitle.trim() === "" || !selectedDate) return;

    const eventDate: Date = selectedDate ?? new Date(); // Fallback to today's date if null

    const newEvent: Event = {
      id: events.length + 1,
      title: newEventTitle,
      date: eventDate,
      time: eventTime,
    };

    setEvents([...events, newEvent]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ mt: 3, border: "1px solid #ddd", borderRadius: "8px", p: 2, background: "#fff" }}>
      {/* Calendar Header with "Add Event" Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Event Calendar</Typography>
        <Button variant="contained" onClick={handleOpenDialog}>
          + Add Event
        </Button>
      </Box>

      {/* ✅ Fixed Calendar Component */}
      <Calendar onChange={handleDateChange} value={selectedDate} />

      {/* Event List */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Event List</Typography>
        {events.length === 0 ? (
          <Typography sx={{ color: "gray", mt: 1 }}>No events added</Typography>
        ) : (
          events.map((event) => (
            <Box key={event.id} sx={{ borderBottom: "1px solid #ddd", py: 1 }}>
              <Typography>
                📅 {event.date.toDateString()} ⏰ {event.time} - <strong>{event.title}</strong>
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Event Title"
            variant="outlined"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Event Time"
            type="time"
            variant="outlined"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} variant="contained">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventCalendar;


// import { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// // Event type
// interface Event {
//   id: number;
//   title: string;
//   date: Date;
//   time: string;
// }

// const EventCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [events, setEvents] = useState<Event[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newEventTitle, setNewEventTitle] = useState("");
//   const [eventTime, setEventTime] = useState("12:00"); // Default time

//   // Handle date change
//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date);
//   };

//   // Open event dialog
//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   // Close event dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setNewEventTitle("");
//     setEventTime("12:00"); // Reset time
//   };

//   // Add new event
//   const handleAddEvent = () => {
//     if (newEventTitle.trim() === "" || !selectedDate) return;

//     const newEvent: Event = {
//       id: events.length + 1,
//       title: newEventTitle,
//       date: selectedDate,
//       time: eventTime,
//     };

//     setEvents([...events, newEvent]);
//     handleCloseDialog();
//   };

//   return (
//     <Box sx={{ mt: 3, border: "1px solid #ddd", borderRadius: "8px", p: 2, background: "#fff" }}>
//       {/* Calendar Header with "Add Event" Button */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Typography variant="h6">Event Calendar</Typography>
//         <Button variant="contained" onClick={handleOpenDialog}>
//           + Add Event
//         </Button>
//       </Box>

//       {/* Calendar Component */}
//       <Calendar onChange={handleDateChange} value={selectedDate} />

//       {/* Event List */}
//       <Box sx={{ mt: 2 }}>
//         <Typography variant="h6">Event List</Typography>
//         {events.length === 0 ? (
//           <Typography sx={{ color: "gray", mt: 1 }}>No events added</Typography>
//         ) : (
//           events.map((event) => (
//             <Box key={event.id} sx={{ borderBottom: "1px solid #ddd", py: 1 }}>
//               <Typography>
//                 📅 {event.date.toDateString()} ⏰ {event.time} - <strong>{event.title}</strong>
//               </Typography>
//             </Box>
//           ))
//         )}
//       </Box>

//       {/* Add Event Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Add New Event</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Event Title"
//             variant="outlined"
//             value={newEventTitle}
//             onChange={(e) => setNewEventTitle(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Event Time"
//             type="time"
//             variant="outlined"
//             value={eventTime}
//             onChange={(e) => setEventTime(e.target.value)}
//             sx={{ mt: 2 }}
//             InputLabelProps={{ shrink: true }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEvent} variant="contained">
//             Add Event
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default EventCalendar;

