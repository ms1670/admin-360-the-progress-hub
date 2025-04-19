// src/modules/chart/Chart.tsx

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Box, Typography } from '@mui/material';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Completed Tasks',
      data: [12, 19, 10, 5, 14, 9],
      backgroundColor: 'rgba(25, 118, 210, 0.5)',
      borderColor: '#1976d2',
      tension: 0.4,
      fill: true
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    }
  }
};

const Chart = () => {
  return (
    <Box sx={{ backgroundColor: '#fff', padding: 2, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Weekly Task Completion
      </Typography>
      <Line data={data} options={options} />
    </Box>
  );
};

export default Chart;
