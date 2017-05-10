(function () {
  const socket = io();

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  let data = [];
// Create the chart
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: function () {
          var series = this.series[0];

          socket.on('measurement', (zoneMeasurement) => {
            console.log('hey');
            let splitMeasurement = zoneMeasurement[1].split(';');
            let timeStamp = Number(splitMeasurement[0]);
            let realPower = Number(splitMeasurement[1].replace(',', '.'));
            let apparentPower = Number(splitMeasurement[2]);
            let fuelRate = Number(splitMeasurement[3]);
            data.push([
              timeStamp * 1000,
              realPower
            ]);
            series.addPoint([timeStamp, realPower], true, true)
          });


          // // set up the updating of the chart each second
          // var series = this.series[0];
          // setInterval(function () {
          //   var x = (new Date()).getTime(), // current time
          //     y = Math.round(Math.random() * 100);
          //   series.addPoint([x, y], true, true);
          // }, 1000);
          // https://www.highcharts.com/stock/demo/dynamic-update/
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
      data: data
    }]
  });
})();