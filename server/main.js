import { Meteor } from 'meteor/meteor';
import {WeatherCollection} from "../imports/api/WeatherCollection.js";

Meteor.startup(() => {
  if (WeatherCollection.find().count() === 0) {

  }
});
