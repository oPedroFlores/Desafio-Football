import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const GraphGols = ({ infoTeam }) => {
  useEffect(() => {
    if (
      !infoTeam ||
      !infoTeam.response ||
      !infoTeam.response.goals ||
      !infoTeam.response.goals.minute
    ) {
      return;
    }

    const chartData = Object.entries(infoTeam.response.goals.minute).map(
      ([minute, data]) => ({
        minute,
        total: data ? data.total : 0,
      }),
    );

    const labels = chartData.map((data) => data.minute);
    const counts = chartData.map((data) => data.total);

    const chart = new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Goals by minute',
            data: counts,
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [infoTeam]);

  return (
    <div>
      <canvas id="acquisitions" />
    </div>
  );
};

export default GraphGols;
