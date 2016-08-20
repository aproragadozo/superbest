self.postMessage('READY');

sleep(2000);

self.postMessage('COMPLETED');

function sleep(milliseconds) {
    var startingTime = new Date().getTime(),
    	stopTime = startingTime + milliseconds;
    
    while (stopTime >= new Date().getTime()) {}
}
