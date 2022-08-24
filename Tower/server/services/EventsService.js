import { dbContext } from "../db/DbContext.js"


class EventsService {
    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name picture')
        return event
    }




}

export const eventsService = new EventsService()