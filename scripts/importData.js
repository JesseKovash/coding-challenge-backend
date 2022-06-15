// const {eventSchema, eventsModel, connection} =  require('/Users/jessekovash/Desktop/Coding/Interviews/sherpa/coding-challenge-backend/src/database/database.ts');
import { eventSchema, eventsModel, connection } from '/Users/jessekovash/Desktop/Coding/Interviews/sherpa/coding-challenge-backend/dist/database/database.js';
// const fs = require('fs');
import fs from 'fs';
let eventData = fs.readFileSync('/Users/jessekovash/Desktop/Coding/Interviews/sherpa/coding-challenge-backend/data/data.json');
const events = JSON.parse(eventData);

//must re-establish db connection otherwise a timeout occurs during ETL process
connection()

const importData =  async () => {
    try {
        const initialETL = await eventsModel.insertMany(events)
        console.log('Database has been loaded')
    }
    catch(error) {
        console.log('Database not Loaded', error)
    }
}

importData()
