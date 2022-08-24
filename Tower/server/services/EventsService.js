import { dbContext } from "../db/DbContext.js"


class EventsService {
    async create(newEvent) {
        const event = await dbContext.Events.create(newEvent)
        await event.populate('creator', 'name picture')
        return event
    }




}

export const eventsService = new EventsService()