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

    async editEvent(id, eventData) {

        const event = await this.getById(id)


        // event.creatorId = eventData.creatorId || event.creatorId
        event.name = eventData.name || event.name
        event.description = eventData.description || event.description
        event.coverImg = eventData.coverImg || event.coverImg
        event.location = eventData.location || event.location
        event.capacity = eventData.capacity || event.capacity
        event.startDate = eventData.startDate || event.startDate
        // event.isCanceled = eventData.isCanceled || event.isCanceled
        event.type = eventData.type || event.type
        await event.save()
        return eventData
    }


}

export const eventsService = new EventsService()