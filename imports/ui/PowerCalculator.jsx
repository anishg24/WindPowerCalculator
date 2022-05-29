import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {SelectButton} from "primereact/selectbutton";
import {Divider} from "primereact/divider";
import {InputNumber} from "primereact/inputnumber";

export const PowerCalculator = ({setAveragePeriod, averagePeriod, averageWindSpeed}) => {
    const [turbinePowerGen, setTurbinePowerGen] = useState(400);
    const [loadAmount, setLoadAmount] = useState(50);

    useEffect(() => {
        return null
    }, [averageWindSpeed])

    const periodOptions = [
        {name: "15 Minutes", value: 15},
        {name: "1 Hour", value: 60},
        {name: "12 Hours", value: 720},
    ];

    return (
        <Card title={"Power Calculator"} className={"text-center"}>
            <Divider align={"center"}>
                <SelectButton value={averagePeriod}
                              options={periodOptions}
                              onChange={(e) => setAveragePeriod(e.value)}
                              optionLabel="name"/>
            </Divider>
            <h3 style={{textDecoration: "underline"}}>Average Wind Speed:</h3>
            <h2>~{averageWindSpeed.toFixed(3)} m/s</h2>
            <h3 style={{textDecoration: "underline"}}>Power Output of Wind Turbine:</h3>
            <InputNumber value={turbinePowerGen}
                         onValueChange={(e) => setTurbinePowerGen(e.value)}
                         suffix=" Ws/m"/>
            <h3 style={{textDecoration: "underline"}}>Power Generated:</h3>
            <h2>~{(averageWindSpeed * turbinePowerGen).toFixed(3)} W</h2>
            <h3 style={{textDecoration: "underline"}}>Power Consumption of the Load:</h3>
            <InputNumber value={loadAmount}
                         onValueChange={(e) => setLoadAmount(e.value)}
                         suffix=" W"/>
            <h2 style={{textDecoration: "underline"}}>Total Power Gain:</h2>
            <h1>~{(averageWindSpeed * turbinePowerGen - loadAmount).toFixed(3)} W</h1>
        </Card>
    )
}