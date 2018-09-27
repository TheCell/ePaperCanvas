
let {PythonShell} = require('python-shell');
let XMLHttpRequest = require('xhr2');
let fs = require('fs');
let timeSinceLastPaperUpdate = new Date();
let dateOfEpaperImage = new Date();
let xhr = new XMLHttpRequest();
let dataFetchingInProgress = false;

let interval = setInterval(checkForEntry, 1000);

function checkForEntry()
{
	getnewestEntryDate();
}

function getnewestEntryDate()
{
	if (dataFetchingInProgress)
	{
		console.log("fetching in progress, skipping new check");
		return;
	}

	console.log("checking Entry Date");
	xhr.open('GET', 'https://dev.thecell.eu/ePaperDisplay/newestEntry.php?newestEntryTime=1', true);
	dataFetchingInProgress = true;
	xhr.send();

	xhr.onload = function ()
	{
		console.log("entries loaded, processing");
		let response = JSON.parse(this.responseText);
		let responseDate = new Date(response.uploadTime);

		if (responseDate.getTime() != dateOfEpaperImage.getTime())
		{
			getNewestDataAndPaint();
		}
		else
		{
			dataFetchingInProgress = false;
		}
	};

	xhr.onerror = function ()
	{
		dataFetchingInProgress = false;
		console.warn("error: ", xhr.response);
	}
}

function getNewestDataAndPaint()
{
	console.log("new entrie found, processing");
	xhr.open('GET', 'https://dev.thecell.eu/ePaperDisplay/newestEntry.php?newestEntry=1', true);
	xhr.send();
	xhr.onload = function ()
	{
		let response = JSON.parse(this.responseText);
		updateEpaper(response);
	}

	xhr.onerror = function ()
	{
		dataFetchingInProgress = false;
		console.warn("error: ", xhr.response);
	}
}

function updateEpaper(dataObj)
{
	let currentTime = new Date();
	if (currentTime.getTime() > (timeSinceLastPaperUpdate.getTime() + 5000))
	{
		console.log("painting now");
		writeImageToFile("base64bwExample.txt", dataObj.imageData);
		runPython();
		//todo dataObj.imageData
		dateOfEpaperImage = new Date(dataObj.uploadTime);
		timeSinceLastPaperUpdate = currentTime;
	}
	dataFetchingInProgress = false;
}

function writeImageToFile(filename, message)
{
	fs.writeFile(filename, message, handleError);

	function handleError(err)
	{
		if (err)
		{
			return console.log(err);
		}
	}

	console.log("file saved");
}

function runPython()
{
	let options = {};

	PythonShell.run('imageCreation.py', options, pythonCallback);

	function pythonCallback(err, results)
	{
		if (err) throw err;
		// results is an array consisting of messages collected during execution
		console.log('results: %j', results);
	}
}
