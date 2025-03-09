<template>

    <div class="animate animate-fade-in">

        <p class="page-title mb-0">View Mail</p>

        <div class="col-6 mx-auto mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">

                <div class="form-group mb-3">
                    <label for="" class="form-label me-3">To:</label>
                    <input type="text" class="form-control form-control-sm rounded-0" value="Juan Dela Cruz" disabled>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label me-3">Subject:</label>
                    <input type="text" class="form-control form-control-sm rounded-0" value="Regarding the issue" disabled>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label me-3">Body:</label>
                    <textarea name="" id="" cols="30" rows="5" class="form-control form-control-sm rounded-0" disabled>Lorem ipsum dolor sit amet consectetur adipisicing elit.</textarea>
                </div>

                <div class="text-end">

                    <router-link :to="'/administration/mail-box'" type="button" class="btn btn-sm btn-secondary rounded-0 me-3">Cancel</router-link>

                    <button type="button" class="btn btn-sm btn-primary rounded-0">Reply</button>

                </div>

            </div>

        </div>

    </div>

</template>
<script>
export default
{
    data()
    {
        return{

            items: [],

        }
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
    color: #2369c1;
}
.button-color {
    background-color: #2369c1;
    color: #ffffff;
}
.table-header {
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px;
    background-color: #2369c1;
    color: #ffffff;
}
</style>