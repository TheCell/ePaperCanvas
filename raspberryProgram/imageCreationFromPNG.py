# convert a .png image file to a .bmp image file using PIL
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

    fileIn = "fromServer.png"
    img = Image.open(fileIn)

    img.save("imageForEPaper.bmp", "BMP")
    epd.display_frame(epd.get_frame_buffer(img))
    epd.sleep();

if __name__ == '__main__':
    main()
