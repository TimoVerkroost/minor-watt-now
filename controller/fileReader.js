var LineByLineReader = require('line-by-line');

module.exports = class File {
    constructor(filePath, socket) {
        this.filePath = filePath;
        this.socket = socket;
        this.lastLabels = [];
        this.lastRealPowerData = [];
        this.lastApparentPowerData = [];
        this.lastFuelData = [];
    }

    putDataInArrays(dataLine) {
        let dataArray = dataLine.split(';');
        this.lastLabels.push(dataArray[0]);
        this.lastRealPowerData.push(Number(dataArray[1]));
        this.lastApparentPowerData.push(Number(dataArray[2]));
        this.lastFuelData.push(Number(dataArray[3]));
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