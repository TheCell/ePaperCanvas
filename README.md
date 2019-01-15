# ePaperCanvas

This is a Repo to send Images from a Browser to an e Paper display.
I added a mysql database inbetween to have some level of abstraction and persistent data.

# detailed installation
for a detailed installation see the blog post https://blog.thecell.eu/blog/2018/09/27/epaper-canvas/
You can run the arduino test to see if the ePaper display works correctly and switch to raspberry after. The arduino has not enough ram to fill a full frame though.

![alt text](https://raw.githubusercontent.com/TheCell/ePaperCanvas/master/media/IMG_20180925_190854.jpg)
![alt text](https://raw.githubusercontent.com/TheCell/ePaperCanvas/master/media/IMG_20180927_111210.jpg)
![alt text](https://raw.githubusercontent.com/TheCell/ePaperCanvas/master/media/vlcsnap-error630.png)

# installation on the Raspberry
1. install bcm2835
2. install wiringpi
3. setup sci on raspi
4. install node.js
5. install npm
6. change the directory to the raspberryProgram directory
7. npm i python-shell
8. npm i xhr2
9. npm i pngjs

then run node main.js

# installation on the website
1. setup a database where you can save base64 string (yes there are better ways (see binary if interested) but I don't care for this project :))
2. upload the folder webinterface and edit the dbauth.php
everything should work now

# restart service on raspi restart
[Hackernoon on how to autostart a node.js server](https://hackernoon.com/making-node-js-service-always-alive-on-ubuntu-server-e20c9c0808e4)