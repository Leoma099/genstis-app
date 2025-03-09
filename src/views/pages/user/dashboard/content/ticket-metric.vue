<template>

    <div class="row">

        <div class="col-md-7">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <p class="mb-0">Tickets by categories</p>
                <div class="metric-chart">
                    <canvas ref="lineReport" height="300"></canvas>
                </div>
            </div>
        </div>

        <div class="col-md-5">
            <div class="card card-body shadow-sm border-0 rounded-0">
                <p class="mb-0">Tickets by categories</p>
                <div class="metric-chart">
                    <canvas ref="doughnutChart" height="300"></canvas>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
export default
{

    data()
    {
        return {

            doughnutChart: null,
            lineChart: null,
            timeFrame: "daily"

        }
    },

    methods:
    {

        createDoughnutChart()
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.destroy();
            }

            const data =
            {
                labels: [
                    "Low",
                    "Medium",
                    "High",
                    "Critical",
                ],
                datasets: [
                    {
                        data: [30, 15, 40, 15], // Example data values
                        backgroundColor: ["#3cb371", "#ffcc00", "#ff9900", "#ff0000"],
                        hoverOffset: 10, // Adds hover effect
                    },
                ],
            };

            const options =
            {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%",
                borderRadius: "5",
                plugins:
                {
                    legend:
                    {
                        position: "right", // Legend positioned on the left
                    },
                    tooltip:
                    {
                        callbacks:
                        {
                            label: function (tooltipItem)
                            {
                                let dataset = tooltipItem.dataset;
                                let dataIndex = tooltipItem.dataIndex;
                                let label = data.labels[dataIndex];
                                let value = dataset.data[dataIndex];
                                return `${label}: ${value}`;
                            },
                        },
                    },
                },
            };

            this.doughnutChart = new Chart(this.$refs.doughnutChart.getContext("2d"),
            {
                type: "doughnut",
                data: data,
                options: options,
            });
        },

        generateData()
        {

            let labels = [];
            let data = [];

            if (this.timeFrame === "daily")
            {
                labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                data = [5, 10, 12, 7, 15, 8, 20];
            }
            else if (this.timeFrame === "weekly")
            {
                labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
                data = [30, 50, 40, 60];
            }
            else if (this.timeFrame === "monthly")
            {
                labels = ["Jan", "Feb", "Mar"];
                data = [150, 200, 180];
            }

            this.createlineChart(labels, data);

        },

        createlineChart(labels, values)
        {

            if (this.lineChart)
            {
                this.lineChart.destroy();
            }

            this.lineChart = new Chart(this.$refs.lineReport.getContext("2d"),
            {

                type: "bar",

                data:
                {
                    labels: labels,
                    datasets: [
                        {
                            label: "Internet & Network Issues",
                            data: values.map((v) => v * 0.25),
                            fill: false,
                            backgroundColor: "#3498db",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                        {
                            label: "Student Account & Access Issues",
                            data: values.map((v) => v * 0.35),
                            fill: false,
                            backgroundColor: "#9b59b6",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                        {
                            label: "Software & Application Issues",
                            data: values.map((v) => v * 0.2),
                            fill: false,
                            backgroundColor: "#f39c12",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                        {
                            label: "Hardware & Peripheral Issues",
                            data: values.map((v) => v * 0.25),
                            fill: false,
                            backgroundColor: "#e74c3c",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                        {
                            label: "Laboratory Room & Facilities Issues",
                            data: values.map((v) => v * 0.35),
                            fill: false,
                            backgroundColor: "#2ecc71",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                        {
                            label: "Other IT-Related Concerns",
                            data: values.map((v) => v * 0.2),
                            fill: false,
                            backgroundColor: "#95a5a6",
                            tension: 0.1,
                            hoverOffset: 10,
                        },
                    ],
                },

                options:
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins:
                    {
                        legend:
                        {
                            position: "bottom",
                            // labels:
                            // {
                            //     usePointStyle: true,
                            // },
                        }
                    },
                    scales:
                    {
                        y:
                        {
                            title:
                            {
                                display: true,
                                text: "Number of Requests",
                            },
                            beginAtZero: true,
                        },
                    },
                },

            });

        }

    },

    watch:
    {

      timeFrame()
      {
        this.generateData();
      },

    },

    mounted()
    {

        this.generateData();
        this.createDoughnutChart();

    },

}
</script>

<style scoped>
.metric-chart {
    height: 300px;
    padding: 20px;
}
</style>