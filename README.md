## Setup

The first step is to run `npm i` to install the required dependencies.

A handful of scripts are provided:

`npm run build` will build the application

`npm run start` will start the application

`npm run test` will run the tests.

`npm run generateData` should be executed in order to populate a json file at `data/data.json` into the MongoDB database. This is required
because it is necessary to set dates for events to be in the near future.

`create config.js file in src folder`. It should contain the following: const geoCodeKey and const weatherKey . Make sure to export both of these. The geoCodeKey is for Google Geocode API, and the weatherKey is for openWeatherMap API

## Technologies

### TypeScript
### React
### React-calendar
### Node.js
### Express
### MongoDB
### Mongoose
### Axios
### Google GeoCode API
### OpenWeatherMap API

