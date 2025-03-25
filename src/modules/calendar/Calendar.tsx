import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material";

const Calendar = () => {
  return (
    <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", background: "#fff" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Event Calendar
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="400px"
        events={[
          { title: "Agriculture Meeting", date: "2025-03-10" },
          { title: "Education Seminar", date: "2025-03-12" },
          { title: "Finance Report Submission", date: "2025-03-15" },
        ]}
      />
    </Box>
  );
};

export default Calendar;
