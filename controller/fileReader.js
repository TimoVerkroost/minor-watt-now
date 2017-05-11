const LineByLineReader = require('line-by-line');

// Get push messages function
const messages = require('../messages');
const pushMessages = require('../push-messages');

module.exports = class File {
    constructor(filePath, socket) {
        this.filePath = filePath;
        this.socket = socket;
        this.lastLabels = [];
        this.lastRealPowerData = [];
        this.lastApparentPowerData = [];
        this.lastFuelData = [];
        this.lastRealPowerValue = 0;
        this.lastApparentPowerValue = 0;
        this.lastFuelRateValue = 0;
    }

    putDataInArrays(dataLine) {
        let dataArray = dataLine.split(';');
        this.lastLabels.push(dataArray[0]);
        this.lastRealPowerData.push(Number(dataArray[1]));
        this.lastApparentPowerData.push(Number(dataArray[2]));
        this.lastFuelData.push(Number(dataArray[3]));
        // RealPower log
        let realPower = Number(dataArray[1]);
        if(realPower >= 70000 && realPower !== this.lastRealPowerValue) {
          this.lastRealPowerValue = realPower;
          this.socket.emit('peak', 'Generator', messages.peak.message, messages.peak.priority);
          pushMessages('Generator', messages.peak.message, messages.peak.priority);
        }
        // ApparentPower log
        let apparentPower = Number(dataArray[2]);
        if(apparentPower <= 5000 && apparentPower !== this.lastApparentPowerValue) {
          this.lastApparentPowerValue = apparentPower;
          this.socket.emit('efficientLow', 'Generator', messages.efficientLow.message, messages.efficientLow.priority);
          pushMessages('Generator', messages.efficientLow.message, messages.efficientLow.priority);
        }
        // Fuel log
        let fuel = Number(dataArray[3]);
        if(fuel <= 20 && fuel !== this.lastFuelRateValue) {
          this.lastFuelRateValue = fuel;
          this.socket.emit('fuelLow', 'Generator', messages.fuelLow.message, messages.fuelLow.priority);
          pushMessages('Generator', messages.fuelLow.message, messages.fuelLow.priority);
        }
    }

    getBackUp() {
        return [this.lastLabels,
                this.lastRealPowerData,
                this.lastApparentPowerData,
                this.lastFuelData];
    }

    setFile(path) {
        this.file = require('readline').createInterface({
            input: require('fs').createReadStream(path)
        });
    }

    emitLines() {
        const lr = new LineByLineReader(this.filePath);
        let zone = 1;
        lr.on('line', (line) => {
            line = line.replace(/,/g, '.');
            this.putDataInArrays(line);
            lr.pause();
            setTimeout(() => {
                this.socket.emit('measurement', line)
                lr.resume();
            }, 1000);
        });
    }
}