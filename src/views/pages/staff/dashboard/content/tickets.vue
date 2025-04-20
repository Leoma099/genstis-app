<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p class="mb-0">Ticket Status Summary</p>
        <small style="opacity: 0.5;">Chart summarizing tickets with various tasks</small>
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
                const response = await apiClient.get("/ticketStat");
                const ticketStatus = response.data;

                this.createDoughnutChart(ticketStatus.pending, ticketStatus.inProgress, ticketStatus.resolved, ticketStatus.unresolved,);
            }
            catch (error)
            {
                console.error("Error fetching ticket data:", error);
            }
        },

        createDoughnutChart(pending, inProgress, resolved, unresolved)
        {
            if (this.doughnutChart)
            {
                this.doughnutChart.destroy();
            }

            const data =
            {
                labels: [
                    `Pending: ${pending}`,
                    `In-Progress: ${inProgress}`,
                    `Resolved: ${resolved}`,
                    `Unresolved: ${unresolved}`
                ],
                datasets: [
                    {
                        data: [pending, inProgress, resolved, unresolved], // Real-time data
                        backgroundColor: ["#d0d0d0", "#FFC300", "#28A745", "#DC3545"],
                        hoverOffset: 10, // Adds hover effect
                    },
                ],
            };

            const options =
            {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
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
