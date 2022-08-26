import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {
    async create(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('CREATED COMMENT IN SERVICE', res.data)
        AppState.comments.push(res.data)
        return res.data
    }

    async getCommentsByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comments = res.data
    }

    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
}

export const commentsService = new CommentsService()