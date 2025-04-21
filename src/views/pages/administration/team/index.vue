<template>

    <div class="animate animate-fade-in">

        <h1 class="page-title mb-0">TEAM</h1>

        <div class="mt-4">

            <div class="row mb-3">
                <asigned-ticket-component />

                <customer-satisfaction-component />
            </div>

            <team-member-component />

        </div>

    </div>

</template>

<script>
import AsignedTicketComponent from './content/asignedTicket.vue';
import CustomerSatisfactionComponent from './content/customerSatisfaction.vue';
import TeamMemberComponent from "./content/teamMember.vue";
export default
{
    components:
    {
        AsignedTicketComponent,
        CustomerSatisfactionComponent,
        TeamMemberComponent
    }
}
</script>

<style scoped>
.animate
{
    animation-duration: 1s;
    animation-fill-mode: none;
}
.animate-fade-in
{
    animation-name: fadeIn;
}

@keyframes fadeIn{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
.page-title {
    color: #007bff;
}
.button-color {
    background-color: #007bff;
    color: #ffffff;
}
</style>