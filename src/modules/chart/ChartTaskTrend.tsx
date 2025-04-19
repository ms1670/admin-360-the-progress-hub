// src/modules/chart/ChartTaskTrend.tsx

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Typography, Paper } from '@mui/material';
import { Task } from '../../types/taskTypes';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  tasks: Task[];
};

const ChartTaskTrend = ({ tasks }: Props) => {
  const statusColors: Record<string, string> = {
    Completed: '#2e7d32',     // Green
    'In Progress': '#f9a825', // Yellow
    Pending: '#d32f2f'        // Red
  };

  // Group tasks by date and status
  const groupedData: Record<string, Record<string, number>> = {};

  tasks.forEach((task) => {
    const date = new Date(task.created_at).toISOString().split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = { Completed: 0, 'In Progress': 0, Pending: 0 };
    }
    if (groupedData[date][task.status] !== undefined) {
      groupedData[date][task.status]++;
    }
  });

  const sortedDates = Object.keys(groupedData).sort();

  const getStatusData = (status: string) =>
    sortedDates.map((date) => groupedData[date][status] || 0);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Completed',
        data: getStatusData('Completed'),
        borderColor: statusColors.Completed,
        backgroundColor: statusColors.Completed,
        tension: 0.4,
        fill: false
      },
      {
        label: 'In Progress',
        data: getStatusData('In Progress'),
        borderColor: statusColors['In Progress'],
        backgroundColor: statusColors['In Progress'],
        tension: 0.4,
        fill: false
      },
      {
        label: 'Pending',
        data: getStatusData('Pending'),
        borderColor: statusColors.Pending,
        backgroundColor: statusColors.Pending,
        tension: 0.4,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Tasks'
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        📊 Task Status Trend Over Time
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="body2">No task data available</Typography>
      ) : (
        <Box sx={{ height: 350 }}>
          <Line data={data} options={options} />
        </Box>
      )}
    </Paper>
  );
};

export default ChartTaskTrend;
