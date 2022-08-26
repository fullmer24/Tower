<template>
  <div class="eventDetails">
    <div class="bg-dark p-2">
      <div>
        <ActiveEventCard :event="activeEvent" />
      </div>
    </div>
    <div>
      <CommentForm />
    </div>
    <div v-for="c in comment" :key="c.id">
      <CommentCard :comment="c" />
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
import CommentCard from '../components/CommentCard.vue';
import CommentForm from '../components/CommentForm.vue';
import { commentsService } from '../services/CommentsService.js';

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
    async function getEventComments() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId);
      } catch (error) {
        logger.error("Getting events", error);
        Pop.error(error)
      }
    }
    onMounted(() => {
      getActiveEvent();
      getEventComments();
    });
    return {
      activeEvent: computed(() => AppState.activeEvent),
      comment: computed(() => AppState.comments)
    };
  },
  components: { EventCard, CommentCard, CommentForm }
}
</script>
