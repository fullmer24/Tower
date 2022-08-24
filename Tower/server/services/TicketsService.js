import { dbContext } from "../db/DbContext.js"


class TicketsService {
    async create(body) {
        const event = await dbContext.Events.findById(body.eventId)
        const ticket = await dbContext.Tickets.create(body)
        // @ts-ignore
        event.capacity -= 1
        await ticket.populate('event')
        await ticket.populate('profile', 'name picture')
        // @ts-ignore
        event.save()
        return ticket
    }





}



export const ticketsService = new TicketsService()