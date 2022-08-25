<template>
    <div class="event-card card">
        <div class="card-body">
            <div class="bg-light border elevation-2 rounded selectable">
                <div class="p-1">
                    <img class="img-fluid" :src="event.coverImg" alt="">
                    <h1 class="text-dark">{{ event.name }}</h1>
                    <h2 class="text-dark">{{ event.type }}</h2>
                    <h3 class="text-dark">{{ event.startDate }}</h3>
                    <p class="text-dark">{{ event.description }}</p>
                    <p class="text-dark">{{ event.location }}</p>
                    <p class="text-dark">{{ event.capacity }}</p>
                </div>
            </div>
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