import {Meteor} from 'meteor/meteor';
import {WeatherCollection} from "../imports/db/WeatherCollection.js";
import moment from "moment-timezone";
import {getWeatherData} from "./getWeatherData.js";
import "../imports/api/weatherPublications.js"

const insertWeatherPoint = (point) => {
    WeatherCollection.upsert({recordedTime: {$eq: new Date(point.recordedTime)}},
        {
            recordedTime: new Date(point.startTime),
            values: point.values,
            createdAt: new Date()
        },
    )
};

const lastQuarterHourFromNow = () => {
    const start = moment(moment.now());
    const remainder = start.minute() % 15;

    return moment(start)
        .subtract(remainder, "minutes")
        .startOf("minute")
        .tz("America/Los_Angeles")
        .toISOString();
}
Meteor.startup(() => {
    if (WeatherCollection.find().count() === 0) {
        const lastQuarterHour = lastQuarterHourFromNow();
        const startTime = moment.utc(lastQuarterHour).subtract(5, "hours").tz("America/Los_Angeles").toISOString();
        const endTime = moment.utc(lastQuarterHour).add(0, "minutes").tz("America/Los_Angeles").toISOString();
        getWeatherData(startTime, endTime)
            .then(({data}) => data["timelines"][0]["intervals"].forEach(e => insertWeatherPoint(e)))
            .catch(err => console.log(err));
    }

    // setInterval(async function() {
    //     console.log(new Date(lastQuarterHourFromNow()))
    //     console.log(await WeatherCollection.findOne({recordedTime: {$eq: new Date(lastQuarterHourFromNow())}}));
    // }, 5 * 1000)

    setInterval(function () {
        const startTime = lastQuarterHourFromNow();
        const endTime = moment.utc(startTime).add(1, "hours").tz("America/Los_Angeles").toISOString();
        getWeatherData(startTime, endTime)
            .then(({data}) => data["timelines"][0]["intervals"].forEach(e => insertWeatherPoint(e)))
            .catch(err => console.log(err));
        console.log("Queried more data from API");
    }, 15 * 60 * 1000)
});
