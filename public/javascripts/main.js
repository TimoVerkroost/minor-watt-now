(function () {
    let chartCollection = {
        'linechart-va-data': {
            labels: [],
            datasets: [{
                label: "Real Power, generator 1",
                backgroundColor: "rgba(241, 196, 15,.3)",
                borderColor: "rgba(241, 196, 15,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }, {
                label: "Apparant Power, generator 1",
                backgroundColor: "rgba(52, 152, 219,.3)",
                borderColor: "rgba(52, 152, 219,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-phase-data': {
            labels: [],
            datasets: [{
                label: "Real Power phase 1, generator 1",
                backgroundColor: "rgba(196,77,88,.2)",
                borderColor: "rgba(196,77,88,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }, {
                label: "Real Power phase 2, generator 1",
                backgroundColor: "rgba(52, 152, 219,.2)",
                borderColor: "rgba(52, 152, 219,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }, {
                label: "Real Power phase 3, generator 1",
                backgroundColor: "rgba(78,205,196,.2)",
                borderColor: "rgba(78,205,196,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }, {
                label: "Real Power total, generator 1",
                backgroundColor: "rgba(199,244,100,.2)",
                borderColor: "rgba(199,244,100,1.0)",
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]
        },
        'linechart-fuel-data': {
            labels: [],
            datasets: [{
                label: "Fuel, generator 1",
                backgroundColor: "rgba(119,79,56, .3)",
                borderColor: "rgba(119,79,56,1)",
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
                        autoSkip: true,
                        maxTicksLimit: 20,
                    }
                }]
            }
        },
        render: function () {
            const charts = Array.from(document.getElementsByTagName('canvas'));
            charts.map((chart) => {
                chartCollection[chart.id] = Chart.Line(document.getElementById(chart.id).getContext('2d'), {
                    data: chartCollection[`${chart.id}-data`],
                    options: chartCollection.lineOptions
                })
            })
        },
        updateData: function (dataLine) {
            let measurementArray = dataLine.split(';')
            let date = new Date(Number(measurementArray[0]) * 1000);
            let time = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
            chartCollection['linechart-va'].data.datasets[0].data.push(Number(measurementArray[1]))
            chartCollection['linechart-va'].data.datasets[1].data.push(Number(measurementArray[2]))
            chartCollection['linechart-va'].data.labels.push(time);
            
            chartCollection['linechart-fuel'].data.datasets[0].data.push(Number(measurementArray[3]))
            // chartCollection['linechart-fuel'].data.labels.push(time);

            chartCollection['linechart-va'].update();
            chartCollection['linechart-fuel'].update();
        }
    };
    chartCollection.render();

    // GRAPH DISPLAY AND BUTTONS
    var graphButtons = document.querySelectorAll(".graphButtons > button");
    var charts = document.querySelectorAll("canvas");
    var generatorSelection = document.getElementById("selectGenerator")

    generatorSelection.addEventListener("change", function (graphs) { // Add eventListener to select, to make it blink once.
        charts.forEach(function (element) {
            element.style.visibility = "hidden";
            setTimeout(function () {
                console.log("Show now")
                element.style.visibility = "visible";
            }, 300);
        });
    });

    hideCharts("linechart-va");
    graphButtons.forEach(function (element) { // Add eventlisteners, to buttons, to keep track of the active button.
        element.addEventListener("click", function (activeID) {
            activeID = element;
            graphButtons.forEach(function (graphButtonsElement) {
                graphButtonsElement.classList.remove("active");
                activeID.classList.add("active");
            });
            hideCharts(activeID.id.slice(7, activeID.id.length));
        });
    });

    function hideCharts(activeID) { // Depending on the active button, show the corresponding chart.
        charts.forEach(function (chartElement) {
            if (activeID === chartElement.id) {
                chartElement.style.display = "block";
            } else {
                chartElement.style.display = "none";
            }
        });
    }
    if (document.getElementById('socketScript')) {
        const socket = io();
        socket.on('backupdata', (dataArrays) => {
            let timeArray = dataArrays[0].reduce((array, unixTime) => {
                let date = new Date(Number(unixTime) * 1000);
                let time = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
                array.push(time);
                return array;
            }, [])
            chartCollection['linechart-va'].data.datasets[0].data = dataArrays[1];
            chartCollection['linechart-va'].data.datasets[1].data = dataArrays[2];
            chartCollection['linechart-va'].data.labels = timeArray;
            chartCollection['linechart-fuel'].data.datasets[0].data = dataArrays[3]
            chartCollection['linechart-fuel'].data.labels = timeArray;
        })
        
        socket.on('measurement', (dataLine) => {
            chartCollection.updateData(dataLine)
        });
                
        socket.on('addPhase1', (dataLine) => {
            let measurementArray = dataLine.split(',')
            let date = new Date(Math.round(Number(measurementArray[0])) * 1000);
            let time = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`
            console.log(measurementArray[0])
            chartCollection['linechart-phase'].data.datasets[0].data.push(Number(measurementArray[1]))
            chartCollection['linechart-phase'].data.labels.push(time);
        });
                
        socket.on('addPhase2', (dataLine) => {
            let measurementArray = dataLine.split(',')
            chartCollection['linechart-phase'].data.datasets[1].data.push(Number(measurementArray[1]))
        });
                
        socket.on('addPhase3', (dataLine) => {
            let measurementArray = dataLine.split(',')
            chartCollection['linechart-phase'].data.datasets[2].data.push(Number(measurementArray[1]))        });
                
        socket.on('addPhase4', (dataLine) => {
            let measurementArray = dataLine.split(',')
            chartCollection['linechart-phase'].data.datasets[3].data.push(Number(measurementArray[1]))
            chartCollection['linechart-phase'].update();
        });


      // BEGIN OF STATUS UPDATES EMITS
        /*
        Parameter description:
        gen   = generator name
        msg   = status update description
        prio  = priority of message can be (2, 1, 0, -1, -2) where 2 is the highest priority.
        */
      // peak
        socket.on('peak', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // overheating
        socket.on('overheating', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // efficientLow
        socket.on('efficientLow', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // broadbandLow
        socket.on('broadbandLow', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // additionalGenerator
        socket.on('additionalGenerator', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // lostConnection
        socket.on('lostConnection', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // fuelLow
        socket.on('fuelLow', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        });
      // unknownError
        socket.on('unknownError', (gen, msg, prio) => {
        console.log(gen + ' ' + msg + ' ' + prio);
        })
      // END OF STATUS UPDATES EMITS
    }
})();