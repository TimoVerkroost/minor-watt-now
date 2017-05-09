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
        var lr = new LineByLineReader(this.filePath);
        lr.on('line', (line) => {
            lr.pause();
            setTimeout(() => {
                this.socket.emit('measurement', line)
                lr.resume();
            }, 6000);
        });
    }
}