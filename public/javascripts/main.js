(function () {
  const socket = io();

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
          // setInterval(function () {
          //   var x = (new Date()).getTime(), // current time
          //     y = Math.round(Math.random() * 100);
          //   series.addPoint([x, y], true, true);
          //   console.log(x)
          // }, 1000);
          socket.on('measurement', (measurement) => {
            var x = (new Date()).getTime()
            console.log(x)
            console.log(Number(measurement.split(';')[0]) * 1000)
              var y = Math.round(Math.random() * 100);
              series.addPoint([x, y], true, true)
          })
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
      text: 'Real power'
    },

    exporting: {
      enabled: false
    },

    series: [{
      name: 'Real power',
      data: (function () {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;
        
        for (i = -100; i <= 0; i += 1) {
          data.push([
            time + i * 1000,
            Math.round(Math.random() * 100)
          ]);
        }
        return data;
      }())
    }]
  });

        socket.on('measurement', (zoneMeasurement) => {
          console.log(zoneMeasurement)
          let splitMeasurement = zoneMeasurement[1].split(',');
          let timeStamp = Number(splitMeasurement[0]);
          let realPower = Number(splitMeasurement[1]);
          let apparentPower = Number(splitMeasurement[2]);
          let fuelRate = Number(splitMeasurement[3]);
        })


})();