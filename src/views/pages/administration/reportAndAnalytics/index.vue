<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="page-title mb-0">Report and Analytics</h1>
            
            <div>
                <button class="btn btn-primary rounded-0" @click="printReport">
                    <i class="bx bx-printer me-2"></i> Print Report
                </button>
            </div>
        </div>

        <div class="mt-4" id="print-section">
            <div class="row mb-4">
                <div class="col-md-3">
                    <status-component />
                </div>
                <div class="col-md-3">
                    <priority-component />
                </div>
                <div class="col-md-6">
                    <statistics-component />
                </div>
            </div>
            <resolved-by-staff-component />
        </div>
    </div>
</template>

<script>
import ResolvedByStaffComponent from './content/resolvedByStaff.vue';
import StatisticsComponent from "./content/ticketStatistic.vue";
import StatusComponent from "./content/status.vue";
import PriorityComponent from "./content/priority.vue";
import html2canvas from 'html2canvas';

export default {
    components: {
        ResolvedByStaffComponent,
        StatisticsComponent,
        StatusComponent,
        PriorityComponent,
    },

    methods: {
        async printReport() {
            const printSection = document.getElementById('print-section');
            const charts = printSection.querySelectorAll('canvas');

            for (const canvas of charts) {
                const img = await html2canvas(canvas).then(c => {
                    const image = new Image();
                    image.src = c.toDataURL("image/png");
                    image.style.maxWidth = '100%';
                    image.style.display = 'block';
                    return image;
                });
                canvas.parentNode.replaceChild(img, canvas);
            }

            const printContent = printSection.innerHTML;
            const printWindow = window.open('', '', 'width=1000,height=800');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Report</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            table, th, td {
                                border: 1px solid #ccc;
                            }
                            th, td {
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f0f0f0;
                            }
                            h1, h2, h3 {
                                color: #333;
                            }
                            img {
                                max-width: 100%;
                                display: block;
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    }
}
</script>

<style scoped>
.page-title
{
    color: #007bff;
}
</style>