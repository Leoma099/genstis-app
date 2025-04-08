<template>
    <div class="card card-body shadow-sm border-0 rounded-0">

        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h3 class="page-title mb-0">Monthly Ticket Requested</h3>
            </div>
            <div>
                <select
                    class="form-select form-select-sm rounded-0"
                    v-model="selectedYear"
                    @change="fetchTicketStatistics">
                    <option
                        v-for="year in years"
                        :key="year"
                        :value="year">{{ year }}</option>
                </select>
            </div>
        </div>

        <div class="metric-chart mt-3">
            <canvas ref="lineReport" height="300"></canvas>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default
{
    data()
    {
        return {
            lineChart: null,
            selectedYear: new Date().getFullYear(),
            years: []
        };
    },

    methods:
    {
        async fetchTicketStatistics()
        {
            try
            {
                const response = await apiClient.get(`/ticketSubmittedCountedMonth?year=${this.selectedYear}`);
                const data = response.data;

                const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const monthly = data.monthly;

                this.createLineChart(labels, monthly);

            }
            catch (error)
            {
                console.error("Error fetching ticket statistics:", error);
            }
        },

        createLineChart(labels, monthly)
        {
            if (this.lineChart)
            {
                this.lineChart.destroy();
            }

            this.lineChart = new Chart(this.$refs.lineReport.getContext("2d"),
            {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Ticket Requested",
                            data: monthly,
                            fill: false,
                            backgroundColor: "#a200ff",
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Number of Ticket Requested",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },

    mounted()
    {
        this.fetchTicketStatistics();
        this.years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
    },
};
</script>

<style scoped>
.metric-chart
{
    height: 300px;
    padding: 20px;
}
.page-title
{
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
</style>
