<template>
    <div class="card card-body shadow-sm border-0 rounded-0">
        <p class="mb-0">Statistics</p>
        <div class="metric-chart">
            <canvas ref="lineReport" height="300"></canvas>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
    data() {
        return {
            lineChart: null,
        };
    },

    methods: {
        async fetchTicketStatistics() {
            try {
                const response = await apiClient.get("/ticketStat");
                const ticketStatus = response.data;

                // Define the labels for the chart (status labels)
                const labels = ["Ticket Status"];

                // Define the data for each status category
                const data1 = ticketStatus.pending || 0;     // Pending tickets
                const data2 = ticketStatus.inProgress || 0;  // In-Progress tickets
                const data3 = ticketStatus.resolved || 0;    // Resolved tickets
                const data4 = ticketStatus.unresolved || 0;  // Unresolved tickets

                // Call method to create/update the chart
                this.createLineChart(labels, [data1, data2, data3, data4]);

            } catch (error) {
                console.error("Error fetching ticket statistics:", error);
            }
        },

        createLineChart(labels, values) {
            if (this.lineChart) {
                this.lineChart.destroy();
            }

            // Create the new chart with updated data
            this.lineChart = new Chart(this.$refs.lineReport.getContext("2d"), {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Pending",
                            data: [values[0]], // Data for Pending
                            fill: false,
                            backgroundColor: "#d0d0d0", // Color for Pending
                            tension: 0.4,
                        },
                        {
                            label: "In-Progress",
                            data: [values[1]], // Data for In-Progress
                            fill: false,
                            backgroundColor: "#FFC300", // Color for In-Progress
                            tension: 0.4,
                        },
                        {
                            label: "Resolved",
                            data: [values[2]], // Data for Resolved
                            fill: false,
                            backgroundColor: "#28A745", // Color for Resolved
                            tension: 0.4,
                        },
                        {
                            label: "Unresolved",
                            data: [values[3]], // Data for Unresolved
                            fill: false,
                            backgroundColor: "#DC3545", // Color for Unresolved
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Number of Tickets",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },

    mounted() {
        this.fetchTicketStatistics(); // Fetch the statistics when the component is mounted
    },

    watch: {
        // Watch for changes if you need to refetch or re-render the chart based on timeFrame or other conditions
        timeFrame() {
            this.fetchTicketStatistics();
        },
    },
};
</script>

<style scoped>
.metric-chart {
    height: 300px;
    padding: 20px;
}
</style>
