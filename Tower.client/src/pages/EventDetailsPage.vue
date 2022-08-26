<template>
  <div class="eventDetails">
    <div class="bg-dark p-2">
      <div>
        <ActiveEventCard :event="activeEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js'
import EventCard from '../components/EventCard.vue';

export default {
  name: "EventdetailsPage",
  setup() {
    const route = useRoute();
    async function getActiveEvent() {
      try {
        await eventsService.getActiveEvent(route.params.eventId);
      }
      catch (error) {
        logger.error("[Get Event]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getActiveEvent();
    });
    return {
      activeEvent: computed(() => AppState.activeEvent)
    };
  },
  components: { EventCard }
}
</script>
