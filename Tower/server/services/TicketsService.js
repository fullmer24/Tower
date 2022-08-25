import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class TicketsService {
    async create(body) {

        const event = await dbContext.Events.findById(body.eventId)
        // @ts-ignore
        if (event.capacity == 0) {
            throw new BadRequest('no tickets available')
        }
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

    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
            .populate('event')
        if (!ticket) {
            throw new BadRequest('no ticket at that id')
        }
        const event = await eventsService.getById(ticket.eventId)
        // @ts-ignore
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('you can not remove that')
        }

        // @ts-ignore
        event.capacity += 1
        await event.save()
        await ticket.remove()
        return 'Ticket Cancelled'
    }

}



export const ticketsService = new TicketsService()