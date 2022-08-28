import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async create(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('CREATE TICKET', res.data)
        AppState.ticketProfiles.push(res.data)
        AppState.ticketEvents.push(res.data)
        // TODO Make sure we also push into the ticketEvents array in our Appstate when we create a ticket. Also make sure we are populating the event and profile on a create in the backend
    }

    async getEventTickets() {
        const res = await api.get(`account/tickets`)
        logger.log('GET TICKET FOR ACCOUNT', res.data)
        AppState.ticketProfiles = res.data
    }

    async getProfileTickets(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('GET EVENT TICKETS', res.data)
        AppState.ticketEvents = res.data
    }

    async removeTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log('REMOVE TICKET', res.data)
        AppState.ticketProfiles = AppState.ticketProfiles.filter(t => t.id != ticketId)
        AppState.ticketEvents = AppState.ticketEvents.filter(t => t.id != ticketId)
    }
}


export const ticketsService = new TicketsService()