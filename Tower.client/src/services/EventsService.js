import { AppState } from "../AppState.js"
import { Event } from "../models/Events.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        AppState.events = res.data
    }

    async getActiveEvent(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = res.data
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('CREATE EVENT', res.data)
        AppState.events.unshift(res.data)
        return res.data
    }
}

export const eventsService = new EventsService()