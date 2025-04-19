import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Task } from '../../types/taskTypes'; // Make sure you import your Task type

type Props = {
  tasks: Task[];
};

const TaskCalendarHeatmap: React.FC<Props> = ({ tasks }) => {
  const heatmapData = tasks.map(task => ({
    date: task.created_at.split('T')[0], // format: YYYY-MM-DD
    count: 1
  }));

  return (
    <div>
      <h2>Task Activity Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date('2025-01-01')}
        endDate={new Date('2025-12-31')}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${Math.min(value.count, 4)}`; // limit scale
        }}
      />
    </div>
  );
};

export default TaskCalendarHeatmap;
