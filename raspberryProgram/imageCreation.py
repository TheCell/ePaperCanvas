from PIL import Image
from io import BytesIO
import base64
import re

def main():
    fileObj = open("base64bwExample.txt", mode="r", encoding="utf-8")
    imgAsString = fileObj.read()
    imgAsString = re.sub('^data:image/.+;base64,', '', imgAsString)
    imgdata = BytesIO(base64.b64decode(imgAsString))
    img = Image.open(imgdata)
    img.save("imageForEPaper.bmp", "BMP")
    # now send to epaper

if __name__ == '__main__':
    main()
