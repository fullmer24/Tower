<template>
    <div class="event-card card">
        <div class="card-body">
            <div class="bg-light border elevation-2 rounded">
                <div class="row">
                    <div class="p-2">
                        <img class="img-fluid" :src="event.coverImg" alt="">
                    </div>
                    <div v-if="event.capacity > 0" class="col-md-6">
                        <h1 class="text-dark">{{ event.name }}</h1>
                        <h2 class="text-dark">{{ event.type }}</h2>
                        <h3 class="text-dark">{{ event.startDate }}</h3>
                        <p class="text-dark">{{ event.description }}</p>
                        <p class="text-dark">{{ event.location }}</p>
                        <p class="text-dark">{{ event.capacity }}</p>
                    </div>
                    <h2 v-else class="bg-warning text-danger border elevation-2 rounded">EVENT SOLD OUT</h2>
                    <div class="col-md-6">
                        <button v-if="event.creatorId == account.id && event.isCanceled == false"
                            @click="cancelEvent(event)" class="btn btn-danger">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="event.isCanceled == true" class="bg-warning border elevation-2 rounded">
                <h2 class=" text-danger">EVENT CANCELED</h2>
            </div>


        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
    props: { event: { type: Object, required: true } },
    setup(props) {
        return {
            async cancelEvent(event) {
                try {
                    const yes = await Pop.confirm('Cancel event?')
                    if (!yes) { return }
                    await eventsService.cancelEvent(event.id)
                } catch (error) {
                    logger.error('[Cancelling event]', error)
                    Pop.error(error)
                }
            },
            account: computed(() => AppState.account)
        };
    },
};
</script>

<style >
</style>