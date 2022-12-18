import React from "react";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";

export const Info = () => {
    return (
        <>
            <i className={"pi pi-user"}></i>
            <Card title={"Motivation for this website"}>
                <Divider align="left" type="dashed">
                    <b>TL;DR</b>
                </Divider>
                This website was developed so that I can test how efficient setting up various wind turbines and power
                storage devices will be for setting up a smart garden in the Seventh College Community Garden.
                <Divider align="left" type="dashed">
                    <b>Smart Gardening</b>
                </Divider>
                Smart gardening has a massive potential to change the world. It can not only make gardening (which is a
                relatively tedious process by itself) much easier for anyone to do, but it can also grow the plants much
                more efficiently. If done correctly, a smart garden can manage resources much better than any human can,
                making gardening much faster, easier, and cheaper (in the long run). More information about the benefits
                of smart gardening can be found <a
                href={"https://www.happysprout.com/inspiration/what-is-smart-gardening/"}>here</a>.
                <Divider align="left" type="dashed">
                    <b>Setting up a Smart Garden</b>
                </Divider>
                There a lot of things to consider when setting up a smart farm, such as what things to automate and make
                "smart", and what things to be farmed traditionally. A lot of planning has to be made here, but the
                (arguably) interesting parts of such a project is what electronics to setup to ensure that the goals of
                the project are comfortably achieved. For example, if you want to setup an automated watering system for
                a planter box, you would need to have several soil sensors, a computer, and a water pump (along with the
                appropriate plumbing).
                <Divider align="left" type="dashed">
                    <b>The Long Term Synthesis Plan</b>
                </Divider>
                My long term plan from the Synthesis Program is to setup a smart garden in the UCSD Seventh College
                Community Garden. My current focus is sourcing power for the smart garden. While I could run an
                extension cord from a nearby dorm all the way to the community garden, I want the smart garden to be as
                green as possible, meaning that I want it to run on renewable resources as much as possible. One
                abundant resource that is easily noticed when walking in the Seventh Community Garden is the wind
                produced in the area. Because there is a (relatively) direct line of sight to the ocean, the consistent
                ocean breeze can be harnessed and converted to electrical energy we can use.
                <Divider align="left" type="dashed">
                    <b>So then what's the point of this website?</b>
                </Divider>
                This website is a quick way for me to poll an efficient setup for the project I have in mind. While
                admittedly the site isn't fully polished, it's capable of producing the required calculations that I
                need to consider whether or not a certain setup like this is worth setting up. A turbine itself costs
                $400, and a power storage device will cost in the ballpark of $1,000. This isn't cheap and I don't think
                it will be funded for by the school or the club unless there are serious proof points to consider.
            </Card>
            <Card title={"How this Website Works"}>
                This website leverages <a href={"https://www.tomorrow.io/"}>tomorrow.io</a>'s Weather API. Every 15
                minutes, a query is sent to grab the weather data from the area around Seventh College. Due to how
                the API works, the weather data returned likely isn't super specific to Seventh College, and might
                be the general weather for the La Jolla area. Because of this, data points might not be accurate enough,
                especially wind speed. But, this website was made to approximate data and if the approximation is good
                enough, it could provide valuable insight.
            </Card>
        </>
    )
}