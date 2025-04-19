// src/modules/chart/ChartTaskDepartment.tsx

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Typography, Paper } from '@mui/material';
import { Task } from '../../types/taskTypes';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  tasks: Task[];
};

const ChartTaskDepartment = ({ tasks }: Props) => {
  const statusColors: Record<string, string> = {
    Pending: '#ef5350',        // Red
    'In Progress': '#fbc02d',  // Yellow
    Completed: '#66bb6a'       // Green
  };

  // Get unique departments
  const departments = Array.from(new Set(tasks.map(task => task.department)));

  // Initialize data structure
  const getStatusCounts = (status: string) =>
    departments.map(
      dept => tasks.filter(task => task.department === dept && task.status === status).length
    );

  const data = {
    labels: departments,
    datasets: [
      {
        label: 'Pending',
        data: getStatusCounts('Pending'),
        backgroundColor: statusColors.Pending
      },
      {
        label: 'In Progress',
        data: getStatusCounts('In Progress'),
        backgroundColor: statusColors['In Progress']
      },
      {
        label: 'Completed',
        data: getStatusCounts('Completed'),
        backgroundColor: statusColors.Completed
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Departments'
        }
      },
      y: {
        stacked: true,
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
        🏢 Department-wise Task Breakdown
      </Typography>

      {tasks.length === 0 ? (
        <Typography variant="body2">No task data available</Typography>
      ) : (
        <Box sx={{ height: 350 }}>
          <Bar data={data} options={options} />
        </Box>
      )}
    </Paper>
  );
};

export default ChartTaskDepartment;
