import React, {useState} from 'react';
import {WindGraph} from "./WindGraph.jsx";
import {Card} from "primereact/card";
import {PowerCalculator} from "./PowerCalculator.jsx";
import {Info} from "./Info.jsx";

export const App = () => {
    const [averageWindSpeed, setAverageWindSpeed] = useState(0);
    const [averagePeriod, setAveragePeriod] = useState(15);


    return (
        <Card title={"SYN 1 Wind Speed Power Calculator"}>
            <div className="grid">
                <div className="col-8">
                    <WindGraph
                        averagePeriod={averagePeriod}
                        setAverageWindSpeed={setAverageWindSpeed}
                    />
                </div>
                <div className="col">
                    <PowerCalculator
                        averagePeriod={averagePeriod}
                        averageWindSpeed={averageWindSpeed}
                        setAveragePeriod={setAveragePeriod}
                    />
                </div>
            </div>
            <div className="grid">
                <Info/>
            </div>
        </Card>
    );
};
