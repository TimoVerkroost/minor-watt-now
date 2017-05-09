(function () {
    let chartCollection = {
        lineDataVA: {
            labels: [],
            datasets: [{
                label: "VA generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            },
            {
                label: "Temperture generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            },
            {
                label: "Fuel amount generator 1",
                backgroundColor: "rgba(135, 211, 124, .3)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 3,
                pointHitRadius: 10,
                data: []
            }]
        },
        lineOptions: { // Styling for charts
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
                chartCollection.lineChart = Chart.Line(document.getElementById(chart.id).getContext('2d'), {
                    data: chartCollection.lineData,
                    // options: chartCollection.lineOptions
                })
            })
        },
        updateData: function (zone, measurement) {
            let measurementArray = measurement.split(',')
            let date = new Date(Number(measurementArray[0])*1000);
            let time = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
            chartCollection.lineChart.data.datasets[zone-1].data.push(measurementArray[2])
            chartCollection.lineChart.data.labels.push(time);
            chartCollection.lineChart.update();
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