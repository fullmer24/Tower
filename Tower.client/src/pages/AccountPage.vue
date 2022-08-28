<template>

  <div class="row">
    <div class="col-12">
      <h2>Your Events</h2>
    </div>
    <div v-for="t in tickets" :key="t.id" class=" card col-md-3 p-2 m-2">
      {{ t.event?.name }}
      {{ new Date(t.event?.startDate).toLocaleDateString() }}
      <button class="btn btn-danger" @click="removeTicket"><i class="mdi mdi-delete-forever"></i></button>

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
      },
      async removeTicket() {
        try {
          let ticketToRemove = AppState.ticketProfiles.find(t => t.accountId == AppState.account.id)
          await ticketsService.removeTicket(ticketToRemove.id)
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
