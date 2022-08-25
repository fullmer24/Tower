export class Event {
    constructor(data) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.description = data.description || ''
        this.coverImg = data.coverImg || ''
        this.location = data.location || ''
        this.capacity = data.capacity || 0
        this.startDate = data.startDate || ''
        this.type = data.type || ''
    }
}