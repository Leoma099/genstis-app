<template>

    <div class="animate animate-fade-in">

        <div class="d-flex justify-content-between align-items-center">
            <p class="page-title mb-0">Mailbox List</p>
            <router-link :to="'/administration/mail-box/create'" class="btn rounded-0 button-color">Compose</router-link>
        </div>

        <div class="mt-4">

            <div class="card card-body shadow-sm border-0 rounded-0">
                <div class="table-responsive">
                    <table class="table table-borderless table-hover mb-0">
                        <thead>
                            <tr>
                                <th class="table-header">SENDER NAME</th>
                                <th class="table-header">SUBJECT</th>
                                <th class="table-header">DESCRIPTION</th>
                                <th class="table-header">CREATED</th>
                                <th class="table-header">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <item-component
                                v-for="(item, index) in items"
                                :key="index"
                                :item="item" /> -->
                                <tr>
                                    <td>
                                        <router-link :to="`/administration/mail-box/view`">
                                            Juan Dela Cruz
                                        </router-link>
                                    </td>
                                    <td>Regarding the issue</td>
                                    <td>{{ truncateText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam iste odio doloremque. Accusamus cupiditate magni hic placeat, quia veniam ipsam ut incidunt molestias dolores maxime, in ab repellat accusantium? Quam facere possimus aspernatur sapiente qui quod nisi, animi, nam dolore consectetur doloremque debitis ipsam! Autem esse labore illum impedit quia quisquam voluptas cumque aut nisi itaque iste dignissimos fuga, perferendis harum molestiae, laudantium modi aspernatur quidem quam ullam. Atque ea repellat sunt obcaecati recusandae rem nemo dolores corporis quo labore tenetur pariatur ad voluptates possimus commodi quibusdam officiis dicta expedita molestias, reprehenderit sit voluptatem esse. Cupiditate autem quae unde doloribus.", 10) }}</td>

                                    <td>
                                        <button type="button" class="btn btn-sm"><i class="bx bx-envelope-open"></i></button>
                                        <button type="button" class="btn btn-sm"><i class="bx bx-trash"></i></button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
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
    },

    methods:
    {
        truncateText(text, length)
        {
            return text.length > length ? text.substring(0, length) + "..." : text;
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