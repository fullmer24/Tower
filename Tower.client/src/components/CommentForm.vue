<template>
    <form @submit.prevent="handleSubmit">
        <p>ADD COMMENT</p>
        <input type="text" placeholder="Your comment here" v-model="editable.body">
        <button>Submit</button>
    </form>
</template>



<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            async handleSubmit() {
                try {
                    editable.value.eventId = route.params.eventId
                    await commentsService.create(editable.value)
                    Pop.toast('Comment created')
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>





<style >
</style>