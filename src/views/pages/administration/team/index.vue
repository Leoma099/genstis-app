<template>

    <div class="animate animate-fade-in">

        <p class="page-title mb-0">TEAM</p>

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
    font-weight: 600;
    font-size: 1.5rem;
    color: #a200ff;
}
.button-color {
    background-color: #a200ff;
    color: #ffffff;
}
</style>