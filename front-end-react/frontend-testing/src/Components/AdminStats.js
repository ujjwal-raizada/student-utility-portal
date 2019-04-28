import React, { Component } from "react";
import axios from "axios";
import config from "react-global-configuration";
import { Tabs, Tab } from "react-bootstrap";
import Chart from "react-google-charts";

class AdminStats extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-2" />
                    <div className="col col-lg-4 text-center">
                        <div className="card my-4">
                            <div className="card-header">Tag hits</div>
                            <div className="card-body">
                                <div>
                                    <Chart
                                        width={400}
                                        height={400}
                                        chartType="ColumnChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ["Tag", "Hits"],
                                            ["Mess", 100],
                                            ["crux", 63],
                                            ["csa", 47]
                                        ]}
                                        options={{
                                            chartArea: { width: "60%" },
                                            hAxis: {
                                                title: "Tags",
                                                minValue: 0
                                            },
                                            vAxis: {
                                                title: "Hits"
                                            },
                                            legend: "none"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-4 text-center">
                        <div className="card my-4">
                            <div className="card-header">Post Percentage</div>
                            <div className="card-body">
                                <div>
                                    <Chart
                                        width={400}
                                        height={400}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ["Tag", "Hits"],
                                            ["crux", 5],
                                            ["swd", 17],
                                            ["csa", 4],
                                            ["embryo", 3],
                                            ["RAF", 5]
                                        ]}
                                        options={{
                                            chartArea: { width: "70%" },
                                            hAxis: {
                                                title: "Tags",
                                                minValue: 0
                                            },
                                            vAxis: {
                                                title: "Hits"
                                            },
                                            animation: {
                                                startup: true,
                                                easing: "linear",
                                                duration: 500
                                            }
                                        }}
                                        legendToggle
                                        chartEvents={[
                                            {
                                                eventName: "animationfinish",
                                                callback: () => {
                                                    console.log(
                                                        "Animation Finished"
                                                    );
                                                }
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-2" />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-2" />
                    <div className="col col-lg-4 text-center">
                        <div className="card my-4">
                            <div className="card-header">No. of Posts</div>
                            <div className="card-body">
                                <div>
                                    <Chart
                                        width={400}
                                        height={400}
                                        chartType="BarChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ["Source", "Posts"],
                                            ["Swd", 10],
                                            ["crux", 6],
                                            ["csa", 7],
                                            ["embryo", 5],
                                            ["faculty", 2]
                                        ]}
                                        options={{
                                            chartArea: { width: "60%" },
                                            hAxis: {
                                                title: "Posts",
                                                minValue: 0
                                            },
                                            vAxis: {
                                                title: "Source"
                                            },
                                            legend: "none"
                                        }}
                                        legendToggle
                                        chartEvents={[
                                            {
                                                eventName: "animationfinish",
                                                callback: () => {
                                                    console.log(
                                                        "Animation Finished"
                                                    );
                                                }
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-4 text-center">
                        <div className="card my-4">
                            <div className="card-header">Traffic</div>
                            <div className="card-body">
                                <div>
                                    <Chart
                                        width={400}
                                        height={400}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ["Time", "traffic"],
                                            ["8:00", 10],
                                            ["12:00", 5],
                                            ["16:00", 10],
                                            ["20:00", 12],
                                            ["00:00", 8]
                                        ]}
                                        options={{
                                            chartArea: { width: "60%" },
                                            hAxis: {
                                                title: "time",
                                                minValue: 0
                                            },
                                            vAxis: {
                                                title: "traffic"
                                            }
                                        }}
                                        chartEvents={[
                                            {
                                                eventName: "animationfinish",
                                                callback: () => {
                                                    console.log(
                                                        "Animation Finished"
                                                    );
                                                }
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-2" />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminStats;
