import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async delete(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        if (!comment) {
            throw new BadRequest('no comments at that id')
        }
        // @ts-ignore
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden('you can not delete that')
        }
        await comment.remove()
        return 'comment deleted'
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment
            .populate('creator', 'name picture')
        return comment
    }

    async getAllComments(eventId) {
        const comment = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')
            .populate('event')
        return comment
    }

}





export const commentsService = new CommentsService()