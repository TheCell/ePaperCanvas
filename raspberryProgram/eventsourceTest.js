let EventSource = require('eventsource');
let source;

if (EventSource)
{
	source = new EventSource('https://dev.thecell.eu/ePaperDisplay/serverStream.php');
	console.log(source);
}
else
{
	console.log("EventSource not installed");
}

source.addEventListener('message', function(e)
{
	console.log(e.data);
	console.log(e.origin);
}, false);

source.addEventListener('open', function(e)
{
	// console.log("Connection was opened.");
}, false);

source.addEventListener('error', function(e)
{
	if (e.readyState == EventSource.CLOSED)
	{
		console.log("connection closed");
	}
}, false);