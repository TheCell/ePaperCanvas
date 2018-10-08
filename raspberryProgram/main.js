let {PythonShell} = require('python-shell');
let XMLHttpRequest = require('xhr2');
let fs = require('fs');
const BlobGenerator = require('./BlobGenerator.js');

let xhr = new XMLHttpRequest();
let timeSinceLastPaperUpdate = new Date();
let dateOfEpaperImage = new Date();
let dataFetchingInProgress = false;
let interval = setInterval(checkForEntry, 1000); // start the fun

function saveBlobGenObjAsPNG(blobGenObj)
{
	let blobGen = new BlobGenerator(0,0, blobGenObj);
	blobGen.saveImage("fromServer.png");
}

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

	//console.log("checking Entry Date");
	xhr.open('GET', 'https://dev.thecell.eu/ePaperDisplay/newestEntry.php?newestEntryTime=1', true);
	dataFetchingInProgress = true;
	xhr.send();

	xhr.onload = function ()
	{
		console.log("entries loaded, processing");
		let response;
		let responseDate;

		try
		{
			response = JSON.parse(this.responseText);
			responseDate = new Date(response.uploadTime);
		}
		catch (e)
		{
			console.error(e);
			dataFetchingInProgress = false;
			return;
		}

		if (responseDate.getTime() != dateOfEpaperImage.getTime())
		{
			getNewestDataAndPaint(responseDate);
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

function getNewestDataAndPaint(uploadTime)
{
	console.log("new entrie found, processing");
	xhr.open('GET', 'https://dev.thecell.eu/ePaperDisplay/newestEntry.php?newestEntryData=1', true);
	xhr.send();
	xhr.onload = function ()
	{
		let response = this.responseText;
		let blobObj = JSON.parse(response);
		updateEpaper(blobObj, uploadTime);
	}

	xhr.onerror = function ()
	{
		dataFetchingInProgress = false;
		console.warn("error: ", xhr.response);
	}
}

function updateEpaper(dataObj, uploadTime)
{
	let currentTime = new Date();
	if (currentTime.getTime() > (timeSinceLastPaperUpdate.getTime() + 5000))
	{
		console.log("painting now");
		let blobObj = dataObj;
		saveBlobGenObjAsPNG(blobObj);

		runPython();
		dateOfEpaperImage = uploadTime;
		timeSinceLastPaperUpdate = currentTime;
		dataFetchingInProgress = false;
	}
	else
	{
		console.log("entry was not older then 5 seconds");
		dataFetchingInProgress = false;
	}
}

function runPython()
{
	let options = {};

	PythonShell.run('imageCreationFromPNG.py', options, pythonCallback);

	function pythonCallback(err, results)
	{
		dataFetchingInProgress = false;
		if (err)
		{
			console.error(err);
		}
		// results is an array consisting of messages collected during execution
		console.log('results: %j', results);
	}
}