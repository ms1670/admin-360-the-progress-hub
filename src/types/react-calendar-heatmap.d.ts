declare module 'react-calendar-heatmap' {
    import * as React from 'react';
  
    export interface HeatmapValue {
      date: string;
      count: number;
    }
  
    export interface CalendarHeatmapProps {
      startDate: Date | string;
      endDate: Date | string;
      values: HeatmapValue[];
      classForValue?: (value: HeatmapValue | undefined) => string;
      tooltipDataAttrs?: (value: HeatmapValue | undefined) => object;
      showWeekdayLabels?: boolean;
      horizontal?: boolean;
      gutterSize?: number;
      onClick?: (value: HeatmapValue) => void;
    }
  
    export default class CalendarHeatmap extends React.Component<CalendarHeatmapProps> {}
  }
  