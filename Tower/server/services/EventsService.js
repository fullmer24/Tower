import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name picture')
        return event
    }
    async getAll() {
        const events = await dbContext.Events.find().sort({ createdAt: -1 }).populate('creator', 'name picture')

        return events
    }
    async getById(id) {
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('no event by that id')
        }
        return event
    }

    async editEvent(id, eventData, userId) {

        const event = await this.getById(id)
        if (event.isCanceled != false) {
            throw new BadRequest('This event is cancelled.')
        }
        if (event.creatorId != userId) {
            throw new BadRequest('you can not do that')
        }
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        event.type = eventData.type || event.type
        await event.save()
        return eventData
    }

    async cancel(id, userId) {
        const event = await this.getById(id)
        // @ts-ignore
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("You don't have permission to delete that")
        }
        event.isCanceled = true
        await event.save()
        return `event ${event.name} was cancelled`
    }



}

export const eventsService = new EventsService()