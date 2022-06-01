import React, {useEffect, useState} from 'react';
import {Chart} from 'primereact/chart';
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {WeatherCollection} from "../db/WeatherCollection.js";
import moment from "moment";
import {Card} from "primereact/card";
import {ProgressSpinner} from "primereact/progressspinner";

export const WindGraph = ({averagePeriod, setAverageWindSpeed}) => {
    const [windSpeedData, setWindSpeedData] = useState({});

    const {dataPoints, isLoading} = useTracker(() => {
        const handler = Meteor.subscribe("wind.speed");

        const noDataAvailable = {tasks: []};
        if (!handler.ready()) return {...noDataAvailable, isLoading: true};

        const windSpeed = WeatherCollection.find({}, {sort: {recordedTime: 1}}).fetch();

        const dataPoints = windSpeed.map(({recordedTime, values}) => ({
            x: moment(recordedTime),
            y: values["windSpeed"]
        }));

        return {dataPoints};
    });

    useEffect(() => {
        if (isLoading) return null;
        setWindSpeedData({
            datasets: [{
                data: dataPoints.map(({x, y}) => ({x: x.format("MM-DD-YY HH:mm"), y: y})),
                borderColor: "#ed9b00",
                tension: 0.2,
                fill: false,
                label: "Wind Speed"
            }],
        });

        const threshold = dataPoints.at(-1).x.subtract(averagePeriod, "minutes");
        const filteredData = dataPoints.filter(({x}) => x.isSameOrAfter(threshold));
        const windSpeeds = filteredData.map(({y}) => y);
        const averageWindSpeed = windSpeeds.reduce((s1, s2) => s1 + s2, 0) / windSpeeds.length

        setAverageWindSpeed(averageWindSpeed);
    }, [averagePeriod, isLoading])

    const basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                },
                title: {
                    display: true,
                    text: 'Date & Time'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                },
                title: {
                    display: true,
                    text: 'Wind Speed (m/s)'
                }
            }
        }
    };

    return (
        <Card title={"Wind Speed Chart"}>
            {isLoading ? (
                <ProgressSpinner/>
            ) : (
                <>
                    <Chart type="line" data={windSpeedData} options={basicOptions}/>
                </>
            )}
        </Card>
    )
}
                 