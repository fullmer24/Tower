<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div class="row">
      <div class="col-12">
        <h2>Your Events</h2>
      </div>
      <div v-for="t in tickets" :key="t.id" class=" card col-md-3 p-2 m-2">
        {{ t.event?.name }}
        {{ t.event?.startDate }}
        <button class="btn btn-danger" @click="removeTickets"><i class="mdi mdi-delete-forever"></i></button>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService.js';

export default {
  name: 'Account',
  props: { ticket: { type: Object, required: true } },
  setup() {
    async function getEventTickets(eventId) {
      try {
        await ticketsService.getEventTickets(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }
    onMounted(() => {
      getEventTickets();
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.ticketProfiles),
      async removeTicket() {
        try {
          await ticketsService.removeTicket(props.ticket.id)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
