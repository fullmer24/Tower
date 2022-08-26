<template>
    <div class="bg-dark p-2 rounded">
        <img class="img-fluid" :src="tickets.accountId" alt="">
    </div>
</template>

<script>
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
export default {

    setup(props) {
        return {

        }
    }
};
</script>


<style lang="scss" scoped>
</style>