// src/modules/chart/ChartStatusPie.tsx
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Typography } from '@mui/material';
import { Task } from '../../types/taskTypes';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  tasks: Task[];
};

const ChartStatusPie = ({ tasks }: Props) => {
  const statusCount = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ['#f44336', '#ff9800', '#4caf50'], // Red, Orange, Green
        borderWidth: 1
      }
    ]
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Task Status Overview
      </Typography>
      <Pie data={data} />
    </Box>
  );
};

export default ChartStatusPie;
