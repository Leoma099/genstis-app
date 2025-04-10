<template>
    <div>
        <div class="card card-body shadow-sm border-0 rounded-0">
            <h3 class="mb-0"><strong>Customer Satisfaction Score</strong></h3>

            <div class="row">
                <div class="col-md-4">
                    <h3>{{ satisfaction.positive }}%</h3>
                    <p>Positive</p>
                </div>
                <div class="col-md-4">
                    <h3>{{ satisfaction.neutral }}%</h3>
                    <p>Neutral</p>
                </div>
                <div class="col-md-4">
                    <h3>{{ satisfaction.negative }}%</h3>
                    <p>Negative</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/authorization";

export default {
    data() {
        return {
            satisfaction: {
                positive: 0,
                neutral: 0,
                negative: 0
            }
        };
    },

    mounted() {
        this.fetchSatisfaction();
    },

    methods: {
        async fetchSatisfaction() {
            try {
                const response = await apiClient.get("/satisfaction-score");
                this.satisfaction = response.data;
            } catch (error) {
                console.error("Error fetching satisfaction score:", error.response?.data || error.message);
            }
        }
    }
}
</script>
