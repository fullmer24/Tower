import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
    creatorId: { type: ObjectId },
    name: { type: String, required: true, minlength: 1, maxlength: 250 },
    description: { type: String, required: true, minlength: 1, maxlength: 1000 },
    coverImg: { type: String, required: true, maxlength: 500 },
    location: { type: String, required: true, minlength: 1, maxlength: 500 },
    capacity: { type: Number, required: true, min: 1, max: 1000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})