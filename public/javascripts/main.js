(function () {
    let chartCollection = {
        'linechart-va-data': {
            labels: [],
            datasets: [{
                label: "Volt-Ampere, generator 1",
                backgroundColor: "rgba(241, 196, 15,.3)",
                borderColor: "rgba(241, 196, 15,1.0)",
                pointBorderColor: "rgba(255,255,255,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-temp-data': {
            labels: [],
            datasets: [{
                label: "Temperture, generator 1",
                backgroundColor: "rgba(231, 76, 60,.3)",
                borderColor: "rgba(231, 76, 60,1.0)",
                pointBorderColor: "rgba(255,255,255,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-fuel-data': {
            labels: [],
            datasets: [{
                label: "Fuel, generator 1",
                backgroundColor: "rgba(44, 36, 22, .3)",
                borderColor: "rgba(44, 36, 22,1)",
                pointBorderColor: "rgba(255,255,255,1)",
                pointBackgroundColor: "#fff",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]

        },
        'lineOptions': { // Styling for charts
            legend: {
                labels: {
                    // fontColor: "white",
                    fontSize: 12
                }
            },
            scales: {
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        display: true, //Show gridlines
                        // color: "rgba(255,255,255,.5)" //color gridlines
                    },
                    ticks: {
                        fontSize: 15,
                        // fontColor: "rgba(255,255,255,1)"
                    }
                }],
                xAxes: [{
                    // gridLines: {
                    //     display: true
                    // },
                    ticks: {
                        fontSize: 15,
                        // fontColor: "rgba(255,255,255,1)"
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

var graphButtons = document.querySelectorAll(".graphButtons > button");
var charts = document.querySelectorAll("canvas");
var generatorSelection = document.getElementById("selectGenerator")


generatorSelection.addEventListener("change", function(graphs){
        charts.forEach(function(element) {
            element.style.visibility = "hidden";
            setTimeout(function(){
                console.log("Show now")
                element.style.visibility = "visible";
            }, 300);
        });
});

hideCharts("linechart-va");
graphButtons.forEach(function(element) {
    element.addEventListener("click", function(activeID){
        activeID = element
        graphButtons.forEach(function(graphButtonsElement) {
            graphButtonsElement.classList.remove("active");
            activeID.classList.add("active");
        })
        hideCharts(activeID.id.slice(7, activeID.id.length));
    });
});

function hideCharts(activeID){
    charts.forEach(function(chartElement) {
        if (activeID == chartElement.id){
            chartElement.style.display = "block";
        }
        else {
            chartElement.style.display = "none";
        }
    });
}
})();




Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

// Create the chart
Highcharts.stockChart('container', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.round(Math.random() * 100);
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Live random data'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }())
    }]
});
