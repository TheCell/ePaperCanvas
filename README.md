# ePaperCanvas

This is a Repo to send Images from a Browser to an e Paper display.
I added a mysql database inbetween to have some level of abstraction and persistent data.

# detailed installation
for a detailed installation see the blog post https://blog.thecell.eu/
You can run the arduino test to see if the ePaper display works correctly and switch to raspberry after. The arduino has not enough ram to fill a full frame though.

# installation on the Raspberry
install bcm2835
install wiringpi
setup sci on raspi
install node.js
install npm
npm i python-shell
npm i xhr2

then run node main.js

# installation on the website
setup a database where you can save base64 string (yes there are better ways (see binary if interested) but I don't care for this project :))
upload the folder webinterface and edit the dbauth.php
everything should work now
