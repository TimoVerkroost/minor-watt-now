module.exports = class File {
    constructor(filePath) {
        this.setFile(filePath)
    }

    setFile(path) {
        this.file = require('readline').createInterface({
            input: require('fs').createReadStream(path)
        });
    }

    getLine() {
        this.file.on('line', function (line) {
                console.log('Line from file:', line);
            }
        )
    }
}