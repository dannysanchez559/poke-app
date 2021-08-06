import React from "react";
import getTypeColors from "../util/getTypeColor";
import { Bar } from "react-chartjs-2";

// Gets stat values for graph
const BaseStats = ({ stats, types }) => {
  const getBaseStats = stats.map((index) => index.base_stat);
  const baseStatsData = getBaseStats.map((item) => item);

  const typeColor = types[0]["type"].name;

  return (
    <>
      <div className="graph-container">
        <Bar
          placeholder={"hi"}
          data={{
            labels: [
              "HP",
              "Attack",
              "Defense",
              "Sp. Attack",
              "Sp. Defense",
              "Speed",
            ],
            datasets: [
              {
                data: [...baseStatsData],
                backgroundColor: [getTypeColors[typeColor]],
                hoverBackgroundColor: [getTypeColors[typeColor]],
                borderRadius: 50,
                borderSkipped: false,
                borderWidth: 1,
                barThickness: 16,
              },
            ],
          }}
          height={200}
          width={600}
          options={{
            layout: {
              padding: 10,
            },
            indexAxis: "y",
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
              y: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
            },
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
                text: "",
              },
              tooltip: {
                enabled: true,
                backgroundColor: "rgb(0,0,0,0.6",
                titleColor: "#fff",
                bodyColor: "#fff",
                displayColors: false,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default BaseStats;
