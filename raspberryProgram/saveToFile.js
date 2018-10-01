let XMLHttpRequest = require('xhr2');
let fs = require('fs');

let xhr = new XMLHttpRequest();

getNewestDataAndSaveToFile();

function getNewestDataAndSaveToFile()
{
	console.log("new entrie found, processing");
	xhr.open('GET', 'https://dev.thecell.eu/ePaperDisplay/newestEntry.php?newestEntry=1', true);
	xhr.send();
	xhr.onload = function ()
	{
		let response = JSON.parse(this.responseText);
		saveBase64AsImage(response.imageData);
	}

	xhr.onerror = function ()
	{
		dataFetchingInProgress = false;
		console.warn("error: ", xhr.response);
	}
}

function saveBase64AsImage(base64String)
{
	base64String = base64String.replace(/^data:image\/png;base64,/,"");
	binaryData = new Buffer(base64String, 'base64').toString('binary');

	require("fs").writeFile("fromServer.png", binaryData, "binary", function(err)
	{
		console.log(err); // writes out file without error, but it's not a valid image
	});
}