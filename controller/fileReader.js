var LineByLineReader = require('line-by-line');

module.exports = class File {
    constructor(filePath, socket) {
        this.filePath = filePath;
        this.socket = socket;
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
            lr.pause();
            setTimeout(() => {
                this.socket.emit('measurement', [zone, line])
                lr.resume();
            }, 1000);
        });
    }
}