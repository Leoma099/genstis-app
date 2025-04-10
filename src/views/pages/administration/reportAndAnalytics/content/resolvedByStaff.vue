<template>

    <div class="card card-body shadow-sm rounded-0 border-0">

        <div class="d-flex justify-content-between align-items-center">

            <div>
                <h3 class="page-title mb-0">List of Assigned</h3>
            </div>

            <div class="col-md-4">
                <input type="text" v-model="searchQuery" @input="fetchData" placeholder="Search ticket order"
                    class="form-control rounded-0">
            </div>

        </div>

        <div class="table-responsive mt-3">
            <table class="table table-bordered table-hover mb-0">
                <thead>
                    <tr>
                        <th class="table-header">TICKET ORDER</th>
                        <th class="table-header">DEPARTMENT</th>
                        <th class="table-header">CLIENT NAME</th>
                        <th class="table-header">SUBJECT</th>
                        <th class="table-header">PRIORITY</th>
                        <th class="table-header">ASSIGNEE</th>
                        <th class="table-header">STATUS</th>
                    </tr>
                </thead>
                <tbody v-if="!isEmpty">
                    <tr v-for="(item, index) in items" :key="index">
                        <td class="table-data">
                            {{ item.ticket_order }}
                        </td>
                        <td class="table-data">
                            {{ formatDepartment(item.department) }}
                        </td>
                        <td class="table-data">
                            {{ item.full_name }}
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
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" class="text-center">No Data Record</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination is here -->
        <div class="pagination-container">
            <div class="entries-info">
                Showing {{ (currentPage - 1) * perPage + 1 }} to {{ currentPage * perPage }} of {{ items.length }} records
            </div>
            <div class="pagination-buttons">
                <!-- Pagination buttons here -->
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from "@/services/authorization";
export default
{
    data()
    {
        return{
            items: [],
            searchQuery: "",
            isEmpty: false,
            perPage: 10,
            currentPage: 1,
        }
    },

    mounted()
    {
        this.fetchData();
    },

    methods:
    {
        async fetchData()
        {
            try
            {
                const response = await apiClient.get("/ticket",
                    {
                        params:
                        {
                            search: this.searchQuery,
                            page: this.currentPage,
                            perPage: this.perPage
                        }
                    }
                );
                this.items = response.data;
            }
            catch(error)
            {
                console.error("Error occured:", error)
            }
        },
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
    }
}
</script>

<style scoped>
.table-header
{
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #a200ff;
    color: #ffffff;
}
.page-title
{
    color: #a200ff;
}
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 14px;
}
.table-scrollable
{
    max-height: 500px;
    overflow: hidden; /* Hidden by default */
}
.table-scrollable:hover
{
    overflow-y: auto; /* Show scrollbar when hovering */
}
</style>