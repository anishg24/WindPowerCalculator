import {Meteor} from "meteor/meteor";
import {WeatherCollection} from "../db/WeatherCollection.js";

Meteor.publish('wind.speed', function publishWindSpeed() {
    return WeatherCollection.find({}, {
        fields: {
            'recordedTime': 1,
            'values.windSpeed': 1,
            'values.windDirection': 1,
        },
        limit: 50,
        sort: {
            'reportedTime': 1
        }
    });
})