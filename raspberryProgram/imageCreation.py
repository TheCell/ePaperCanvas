from PIL import Image
from io import BytesIO
import base64
import re
import epd7in5

EPD_WIDTH = 640
EPD_HEIGHT = 384

def main():
    epd = epd7in5.EPD()
    epd.init()
    
    fileObj = open("base64bwExample.txt", mode="r", encoding="utf-8")
    imgAsString = fileObj.read()
    imgAsString = re.sub('^data:image/.+;base64,', '', imgAsString)
    #missing_padding = len(imgAsString) % 4
    #if missing_padding != 0:
    #    imgAsString += '=' * (4 - missing_padding)

    imgdata = BytesIO(base64.b64decode(imgAsString))
    img = Image.open(imgdata)
    img.save("imageForEPaper.bmp", "BMP")
    epd.display_frame(epd.get_frame_buffer(img))

if __name__ == '__main__':
    main()
