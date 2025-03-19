<template>
    <tr>
        <td class="table-data">
            {{ item.ticket_order }}
        </td>
        <td class="table-data">
            {{ formatDepartment(item.department) }}
        </td>
        <td class="table-data">
            {{ formatSubject(item.subject) }}
        </td>
        <td class="table-data">
            {{ formatPriorityLevel(item.priority_level) }}
        </td>
        <td class="table-data">
            {{ formatAsignee(item.assigned_by) }}
        </td>
        <td class="table-data">
            {{ formatStatus(item.status) }}
        </td>
        <td class="table-data">
            {{ item.request_date }}
        </td>
        <td class="table-data">
            {{ item.completed_date || "TBD"}}
        </td>
        <td class="table-data">
            <!-- <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#feedbackModal">
                <i class="bx bx-comment-dots mb-0"></i>
            </button> -->
            <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                <i class="bx bx-comment-dots mb-0"></i>
            </button>
        </td>
    </tr>

    <feedback-modal />
</template>
<script>
import apiClient from "@/services/authorization";
import { useToast } from "vue-toastification";
import FeedbackModal from "./feedback-modal.vue";
export default
{
    props:
    {
        item: Object,
        isLoading: Boolean
    },

    components:
    {
        FeedbackModal
    },

    mounted()
    {
        this.toast = useToast()
    },

    methods:
    {
        formatDepartment(department)
        {
            if(department === 1)
            {
                return "CBA - College of Business and Administration";
            }
            else if(department === 2)
            {
                return "CASED - College of Arts and Science Education";
            }
            else if(department === 3)
            {
                return "Registrar";
            }
            else if(department === 4)
            {
                return "Payroll";
            } 
            else if(department === 5)
            {
                return "Accounting Finance";
            }
            else if(department === 6)
            {
                return "Quality Assurance";
            }
            else if(department === 7)
            {
                return "AASS";
            }
            else if(department === 8)
            {
                return "HR - Human Resource";
            }
            else if(department === 9)
            {
                return "MIS Office";
            }
            else if(department === 10)
            {
                return "Rikdo Office";
            }
            else if(department === 11)
            {
                return "Graduate School";
            }
            else if(department === 12)
            {
                return "Museum";
            } 
            else if(department === 13)
            {
                return "Library";
            }
            else if(department === 14)
            {
                return "Sewing";
            }
            else if(department === 15)
            {
                return "Principal Office";
            }
            else if(department === 16)
            {
                return "CESO Office";
            }
            else if(department === 17)
            {
                return "Cashier";
            } 
            else if(department === 18)
            {
                return "CCS - College of Computer Studies";
            }                                               
            else
            {
                return "n/a";
            }
        },
        formatSubject(subject)
        {
            if(subject === 1)
            {
                return "Desktop Computer";
            }
            else if(subject === 2)
            {
                return "Laptop Computer";
            }
            else if(subject === 3)
            {
                return "Printer Services";
            }
            else if(subject === 4)
            {
                return "Software Installation";
            }
            else if(subject === 5)
            {
                return "Internet Connection";
            }
            else if(subject === 6)
            {
                return "Wireless Connection";
            }
            else if(subject === 7)
            {
                return "New User (Microsoft Account)";
            }
            else if(subject === 8)
            {
                return "Login Issues";
            }
            else if(subject === 9)
            {
                return "Other";
            }
            else
            {
                return "n/a";
            }
        },
        formatPriorityLevel(priority_level)
        {
            if(priority_level === 1)
            {
                return "Low";
            }
            else if(priority_level === 2)
            {
                return "Medium";
            }
            else if(priority_level === 3)
            {
                return "High";
            }
            else if(priority_level === 4)
            {
                return "Emergency";
            }
            else
            {
                return "n/a";
            }
        },

        formatStatus(status)
        {
            if(status === 1)
            {
                return "Pending";
            }
            else if(status === 2)
            {
                return "In-Progress";
            }
            else if(status === 3)
            {
                return "Resolved";
            }
            else if(status === 4)
            {
                return "Unresolved";
            }
            else
            {
                return "n/a";
            }
        },

        formatAsignee(asigned_by)
        {
            if(asigned_by === 1)
            {
                return "Robert John Javani Minimo";
            }
            else if(asigned_by === 2)
            {
                return "Jacob R Canlas";
            }
            else if(asigned_by === 3)
            {
                return "Jeryc Erjy Mapilisan";
            }
            else
            {
                return "n/a";
            }
        },

        async deleteTicket()
        {
            if(!confirm("Are you sure you want to delete?")) return;

            try
            {
                const response = await apiClient.delete(`/ticket/${this.item.id}`);
                console.log("delete sucess:", response.data);
                this.toast.success("Ticket deleted successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            catch(error)
            {
                console.error("Error deleteing:", error);
                this.toast.error("Ticket deleted unsuccessfully!")
            }
        }
    }
}
</script>
<style scoped>
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #2369c1;
    color: #ffffff;
}
.shimmer-loader {
    height: 16px;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>