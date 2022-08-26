<template>
    <div class="comment-card">
        <div class="row card-body">
            <div class=" col-3 comment-creator">
                <img :src="comment.creator.picture" alt="" :title="comment.creator.name" class="elevation-4">
                {{ comment.creator.name }}-{{ new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day:
                            'numeric'
                    })
                }}
            </div>
            <div class="col-7 bg-light text-dark">
                {{ comment.body }}
            </div>
            <div v-if="comment.creator.id == account.id">
                <button @click="deleteComment(comment.id)">Delete</button>
            </div>
        </div>
    </div>
</template>




<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {
        comment: { type: Object, required: true }
    },
    setup() {
        // const route = useRoute()
        // onMounted(() => {
        //     getEventComments();
        // });
        return {
            account: computed(() => AppState.account),
            // comment: computed(() => AppState.comments),
            async deleteComment(id) {
                try {
                    const yes = await Pop.confirm('Delete comment?')
                    if (!yes) { return }
                    await commentsService.deleteComment(id)
                } catch (error) {
                    logger.error('[Deleting Comment]', error)
                    Pop.error(error)
                }
            }
        };
    },
};
</script>



<style >
</style>