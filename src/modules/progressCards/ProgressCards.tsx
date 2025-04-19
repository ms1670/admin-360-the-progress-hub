import { Box, Card, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Assignment";
import InProgressIcon from "@mui/icons-material/Autorenew";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import DoneIcon from "@mui/icons-material/CheckCircle";
import { Task } from "../../types/taskTypes";

interface ProgressCardsProps {
  tasks: Task[];
}

const ProgressCards: React.FC<ProgressCardsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter(task => task.status === "In Progress").length;
  const pendingCount = tasks.filter(task => task.status === "Pending").length;
  const completedCount = tasks.filter(task => task.status === "Completed").length;

  const progressData = [
    { title: "Total Task", count: totalTasks, icon: <TaskIcon />, color: "#1976d2" },
    { title: "In Progress", count: inProgressCount, icon: <InProgressIcon />, color: "#ff9800" },
    { title: "Pending", count: pendingCount, icon: <PendingIcon />, color: "#f44336" },
    { title: "Completed", count: completedCount, icon: <DoneIcon />, color: "#4caf50" },
  ];

  return (
    <Box sx={{ border: "1px solid #DDD", borderRadius: "16px", padding: "8px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, m: 2 }}>
        {progressData.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row", // Make icon, title, count in a row
              alignItems: "center",
              justifyContent: "flex-start",
              border: "1px solid #DDD",
              padding: 2,
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
              height: "80px",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.color + "20",
              }}
            >
              <Box sx={{ fontSize: 28, color: item.color }}>{item.icon}</Box>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ color: "#333" }}>
                {item.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#222" }}>
                {item.count}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressCards;


//// worked progress cards (Row method)

// import { Box, Card, Typography } from "@mui/material";
// import TaskIcon from "@mui/icons-material/Assignment";
// import InProgressIcon from "@mui/icons-material/Autorenew";
// import PendingIcon from "@mui/icons-material/HourglassEmpty";
// import DoneIcon from "@mui/icons-material/CheckCircle";
// import { Task } from "../../types/taskTypes";

// interface ProgressCardsProps {
//   tasks: Task[];
// }

// const ProgressCards: React.FC<ProgressCardsProps> = ({ tasks }) => {
//   // ✅ Calculate task counts dynamically
//   const totalTasks = tasks.length;
//   const inProgressCount = tasks.filter(task => task.status === "In Progress").length;
//   const pendingCount = tasks.filter(task => task.status === "Pending").length;
//   const completedCount = tasks.filter(task => task.status === "Completed").length;

//   const progressData = [
//     { title: "Total Task", count: totalTasks, icon: <TaskIcon />, color: "#1976d2" },
//     { title: "In Progress", count: inProgressCount, icon: <InProgressIcon />, color: "#ff9800" },
//     { title: "Pending", count: pendingCount, icon: <PendingIcon />, color: "#f44336" },
//     { title: "Completed", count: completedCount, icon: <DoneIcon />, color: "#4caf50" },
//   ];

//   return (
//     <Box sx={{ border: "1px solid #898", borderRadius: "16px", padding: "8px" }}>
//       <Box sx={{ display: "flex", gap: 2, m: 2 }}>
//         {progressData.map((item, index) => (
//           <Card
//             key={index}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: 3,
//               flex: 1,
//               borderRadius: "12px",
//               background: "#fff",
//               boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//               height: "120px",
//             }}
//           >
//             <Box
//               sx={{
//                 width: 50,
//                 height: 50,
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: item.color + "20",
//               }}
//             >
//               <Box sx={{ fontSize: 28, color: item.color }}>{item.icon}</Box>
//             </Box>
//             <Typography variant="h6" sx={{ color: "#333", mt: 1 }}>
//               {item.title}
//             </Typography>
//             <Typography variant="h5" sx={{ fontWeight: "bold", color: "#222" }}>
//               {item.count}
//             </Typography>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default ProgressCards;


// import { Box, Card, Typography } from "@mui/material";
// import TaskIcon from "@mui/icons-material/Assignment";
// import InProgressIcon from "@mui/icons-material/Autorenew";
// import PendingIcon from "@mui/icons-material/HourglassEmpty";
// import DoneIcon from "@mui/icons-material/CheckCircle";

// const progressData = [
//   { title: "Total Task", count: 120, icon: <TaskIcon />, color: "#1976d2" },
//   { title: "In Progress", count: 45, icon: <InProgressIcon />, color: "#ff9800" },
//   { title: "Pending", count: 30, icon: <PendingIcon />, color: "#f44336" },
//   { title: "Completed", count: 45, icon: <DoneIcon />, color: "#4caf50" },
// ];

// const ProgressCards = () => {
//   return (
//     <Box sx={{ border:"1px solid #898", borderRadius:"16px", padding: "8px"}}>
//       <Box sx={{ display: "flex", gap: 2, m: 2}}>
//       {progressData.map((item, index) => (
//         <Card
//           key={index}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 3,
//             flex: 1,
//             borderRadius: "12px",
//             background: "#fff",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//             height: "120px",
//           }}
//         >
//           <Box
//             sx={{
//               width: 50,
//               height: 50,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: item.color + "20", // Light transparent background
//             }}
//           >
//             <Box sx={{ fontSize: 28, color: item.color }}>{item.icon}</Box>
//           </Box>
//           <Typography variant="h6" sx={{ color: "#333", mt: 1 }}>
//             {item.title}
//           </Typography>
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#222" }}>
//             {item.count}
//           </Typography>
//         </Card>
//       ))}
//     </Box>
//     </Box>
//   );
// };

// export default ProgressCards;
