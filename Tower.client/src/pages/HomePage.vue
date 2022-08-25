<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>EVENTS</h2>
      </div>
    </div>
    <div class="row bg-dark text-light">
      <div class="col-12">
        filter <i class="mdi mdi-filter"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'sport'">Sport</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'digital'">Digital</div>
    </div>
    <div class="bg-dark">
      <div class="" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  name: 'Home',
  setup() {
    const filterTerm = ref('')
    async function getAll() {
      try {
        await eventsService.getAll();
      } catch (error) {
        logger.error("Getting events", error);
        Pop.error(error)
      }
    }

    onMounted(() => {
      getAll();
    });
    return {
      filterTerm,
      events: computed(() => AppState.events)
    }

  }
}
</script>
