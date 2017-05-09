(function () {
    let chartCollection = {
        'linechart-va-data': {
            labels: [],
            datasets: [{
                label: "VA, generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-temp-data': {
            labels: [],
            datasets: [{
                label: "Temperture, generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-fuel-data': {
            labels: [],
            datasets: [{
                label: "Fuel, generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            }]

        },
        'lineOptions': { // Styling for charts
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 12
                }
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true, //Show gridlines
                        color: "rgba(255,255,255,.5)" //color gridlines
                    },
                    ticks: {
                        fontSize: 15,
                        fontColor: "rgba(255,255,255,1)"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontSize: 15,
                        fontColor: "rgba(255,255,255,1)"
                    }
                }]
            }
        },
        render: function () {
            const charts = Array.from(document.getElementsByTagName('canvas'));
            charts.map((chart) => {
                console.log(chart.id)
                chartCollection[chart.id] = Chart.Line(document.getElementById(chart.id).getContext('2d'), {
                    data: chartCollection[`${chart.id}-data`],
                    // options: chartCollection.lineOptions
                })
            })
        },
        updateData: function (zone, measurement) {
            let measurementArray = measurement.split(',')
            let date = new Date(Number(measurementArray[0]) * 1000);
            let time = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
            console.log(chartCollection['linechart-va'])
            chartCollection['linechart-va'].data.datasets[zone - 1].data.push(measurementArray[1])
            chartCollection['linechart-va'].data.labels.push(time);
            chartCollection['linechart-temp'].data.datasets[zone - 1].data.push(measurementArray[2])
            chartCollection['linechart-temp'].data.labels.push(time);
            chartCollection['linechart-fuel'].data.datasets[zone - 1].data.push(measurementArray[3])
            chartCollection['linechart-fuel'].data.labels.push(time);
            chartCollection['linechart-va'].update();
            chartCollection['linechart-temp'].update();
            chartCollection['linechart-fuel'].update();
        }
    }
    chartCollection.render();

    if (document.getElementById('socketScript')) {
        const socket = io();
        // console.log(socket);
        socket.on('measurement', (zoneMeasurement) => {
            chartCollection.updateData(zoneMeasurement[0], zoneMeasurement[1])
        })
    }
})();