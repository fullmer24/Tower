import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:eventId', this.editEvent)
            .delete('/:id', this.cancel)
            .get('/:id/tickets', this.getEventTickets)

    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next.error(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next.error(error)
        }
    }

    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            let eventData = req.body
            let event = await eventsService.editEvent(req.params.eventId, eventData)
            res.send(event)
        }
        catch (error) {
            next(error)
        }
    }

    async cancel(req, res, next) {
        try {
            const message = await eventsService.cancel(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next.error(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const tickets = await ticketsService.getEventTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }




}