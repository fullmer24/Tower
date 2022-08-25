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

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId })
            .populate('profile', 'name picture')
        return tickets
    }
    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
            .populate('event')
        return tickets
    }

    // event.capacity += 1 

}



export const ticketsService = new TicketsService()