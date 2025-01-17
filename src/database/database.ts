import mongoose, { Schema, model, connect, Types } from 'mongoose';
import { Event, DetailedEvent, Weather, Organizer, Attendee } from '../helpers/interfaces';

export const connection = () => {
  connect('mongodb://localhost/AllEvents')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB:', err)
  });
}

const organizerSchema = new Schema<Organizer>({
    name: {type: String},
})

const attendeeSchema = new Schema<Attendee>({
  status: {type: String},
  email: {type: String, index: true},
  attName: {type: String},
  eventId: {type: String}
})

export const eventSchema = new Schema<Event>({
  name: {type: String, required: true, index: { unique: false }},
  isOutside: {type: Boolean, required: true},
  location: {type: String, required: true},
  date: {type: Number, required: true},
  organizer: {type: organizerSchema, required: false},
  attendees: {type: [attendeeSchema], required: false }
})

const attendeeModel = model<Attendee>('attendee', attendeeSchema);

const organizerModel = model<Organizer>('organizer', organizerSchema);

export const eventsModel = model<Event>('event', eventSchema);

export const addEvent = (newEvent: Event) => {
  return eventsModel.create(newEvent)
}

export const getAllEvents = (from?: number, to?: number, lastId?: string) =>  {
  //pagination is achieved by utilizing the objectid. These ids are indexed and incremented making them perfect for scalable pagination. For demo purposes the results per page was limited to 5. Results were first filtered by date range, and then return the first 5 results greater than the 'lastId'.

  //if both 'from' and 'to' args are valid
  if (from && to) {
    return (lastId
    ? eventsModel.find({date: {$gte: from, $lte: to}, _id: {$gt: lastId}}).limit(5)
    : eventsModel.find({date: {$gte: from, $lte: to}}).limit(5))
  }
  //if 'from' is valid, but 'to' is not
  else if (from && !to) {
    return (lastId
      ? eventsModel.find({date: {$gte: from}, _id: {$gt: lastId}}).limit(5)
      : eventsModel.find({date: {$gte: from}}).limit(5)
      )

  }
  //if both 'from' and 'to' are invalid
  else {
    let currTime = Math.floor(new Date().getTime() / 1000);
    return (lastId
      ? eventsModel.find({date: {$gte: currTime}, _id: {$gt: lastId}}).limit(5)
      : eventsModel.find({date: {$gte: from}}).limit(5)
      )
  }
}

export const getEventDetails = (eventId: string) => {
  return eventsModel.find({"_id": eventId})
}

//added for testing purposes on Postman. In the future would add functionality on UI.
export const addAttendee = (newAttendee: Attendee) => {
//if time, check for duplicates prior to adding
  return attendeeModel.findOneAndUpdate({email: newAttendee.email, eventId: newAttendee.eventId}, newAttendee, {new: true, upsert: true})
}

export const getAllAttendees = (id: string) => {
  return attendeeModel.find({"eventId": id})
}




