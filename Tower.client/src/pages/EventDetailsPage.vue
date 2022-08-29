<template>
  <div class="eventDetails">
    <div class="row bg-dark p-2">
      <div class="col-md-6">
        <ActiveEventCard :event="activeEvent" />
      </div>
      <div class="col-md-6">
        <div class="row">
          <div v-if="activeEvent.capacity > 0 && activeEvent.isCanceled != true" class="col-2">
            <button title="Attend" v-if="!ticket" class="btn btn-info" @click="getTicket"><i class="mdi mdi-ticket"></i>
              Attend</button>
          </div>
          <div>
            <p>See Account for your tickets</p>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="row">
          <div v-for="t in ticketEvents" class="col-2">
            <img class="img-fluid rounded elevation-2" :src="t.profile.picture" :title="t.profile.name">
          </div>
        </div>
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
import { ticketsService } from '../services/TicketsService.js';
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
    async function getProfileTickets() {
      try {
        await ticketsService.getProfileTickets(route.params.eventId)
      } catch (error) {
        logger.error('GETTING PROFILE TICKETS', error)
        Pop.error(error)
      }
    }
    onMounted(() => {
      getActiveEvent();
      getEventComments();
      getProfileTickets();
    });
    return {
      activeEvent: computed(() => AppState.activeEvent),
      comment: computed(() => AppState.comments),
      ticketProfiles: computed(() => AppState.ticketProfiles),
      ticketEvents: computed(() => AppState.ticketEvents),
      ticket: computed(() => {
        if (AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      async getTicket() {
        try {
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id
          }
          logger.log('ticket', newTicket)
          await ticketsService.create(newTicket)
        } catch (error) {
          Pop.error(error)
        }
      },
      async removeTicket() {
        try {
          let ticketToRemove = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)
          await ticketsService.removeTicket(ticketToRemove.id)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { EventCard, CommentCard, CommentForm }
}
</script>
