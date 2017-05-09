/**
 * Created by Timo on 08/05/2017.
 */
(function() {
    const socket = io();
    socket.on('measurement', (line) => {
        console.log(line)
    })
})();