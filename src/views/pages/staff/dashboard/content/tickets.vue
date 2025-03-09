<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p class="mb-0">Tickets</p>
        <div class="metric-chart">
        <canvas ref="doughnutChart" height="300"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import apiClient from "@/services/authorization"; // Ensure the path is correct

Chart.register(...registerables);

export default
{
    data()
    {
        return {
        doughnutChart: null,
        };
    },

    methods:
    {
        async fetchTicketData()
        {

            try
            {
                // Fetch the real-time ticket data from the API
                const response = await apiClient.get("/status");
                const resolvedUnresolvedData = response.data;

                this.createDoughnutChart(resolvedUnresolvedData.resolved, resolvedUnresolvedData.unresolved);
            }
            catch (error)
            {
                console.error("Error fetching ticket data:", error);
            }
        },

        createDoughnutChart(resolved, unresolved)
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.destroy();
            }

            const data =
            {
                labels: ["Resolved", "Unresolved"],
                datasets: [
                {
                    data: [resolved, unresolved], // Real-time data
                    backgroundColor: ["#008000", "#ff0000"],
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
                plugins: {
                legend: {
                    position: "right", // Legend positioned on the right
                },
                tooltip: {
                    callbacks: {
                    label: function (tooltipItem) {
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

            this.doughnutChart = new Chart(this.$refs.doughnutChart.getContext("2d"), {
                type: "doughnut",
                data: data,
                options: options,
            });
        },

        updateDoughnutChart()
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.data.datasets[0].data = [this.resolvedTickets, this.unresolvedTickets];
                this.doughnutChart.update(); // Update the chart with new data
            }
        },
    },

    mounted()
    {
        this.createDoughnutChart(); // Create the initial chart
        this.fetchTicketData(); // Fetch the initial data
    },
};
</script>

<style scoped>
.metric-chart {
height: 300px;
padding: 20px;
}
</style>
