<template>
    <div class="event-card card">
        <div class="card-body">
            <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
                <div class="bg-light border elevation-2 rounded selectable">
                    <div class="p-1">
                        <img class="img-fluid" :src="event.coverImg" alt="">
                        <h3 class="text-dark">{{ event.name }}</h3>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>




<script>

export default {
    props: { event: { type: Object, required: true } },
    setup(props) {
        return {
        };
    },
};
</script>




<style >
</style>