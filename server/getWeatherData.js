import {config} from "dotenv";
config({path: process.env.PWD+'/.env'})

import queryString from "query-string";
import fetch from "node-fetch";
import {Meteor} from "meteor/meteor";

export function getWeatherData(startTime, endTime) {
    // set the Timelines GET endpoint as the target URL
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

    // get your key from app.tomorrow.io/development/keys
    const apikey = process.env.WEATHER_API_KEY;

    // pick the location, as a latlong pair
    let location = '629185a86bde1900095face7';

    // list the fields
    const fields = [
        "precipitationIntensity",
        "precipitationType",
        "windSpeed",
        "windGust",
        "windDirection",
        "temperature",
        "temperatureApparent",
        "cloudCover",
        "cloudBase",
        "cloudCeiling",
        "weatherCode",
    ];

    // choose the unit system, either metric or imperial
    const units = "metric";

    // set the timesteps, like "current", "1h" and "1d"
    const timesteps = ["15m"];

    // specify the timezone, using standard IANA timezone format
    const timezone = "America/Los_Angeles";

    // request the timelines with all the query string parameters as options
    const getTimelineParameters = queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
    }, {arrayFormat: "comma"});

    return fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
        .then((result) => result.json())
        .catch((error) => {
            throw new Meteor.error("API Error: " + error)
        });
}

