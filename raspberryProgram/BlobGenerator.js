let PNG = require('pngjs').PNG;
let fs = require('fs');

// 8 bytes compress to 8 bit.
// We only need black or white so 1 bit can represent this.
// the first pixel is the lowest bit in an Uint8.
class BlobGenerator
{
	constructor(width, height, asObject)
	{
		if (typeof(asObject) == "object")
		{
			this.width = asObject.width;
			this.height = asObject.height;
			let size = this.width * this.height / 8;
			this.imgAsByteArray = this.byteArrayFromString(size, asObject.data);
		}
		else
		{
			this.width = width;
			this.height = height;
			this.imgAsByteArray = new Uint8Array(this.width * this.height / 8);
		}
	}

	imgObjectToBit(img)
	{
		this.imgAsByteArray = new Uint8Array(this.width * this.height / 8);
		let byteCounter = 0;
		let arrayIndex = 0;
		let byte = 0;

		for (let i = 0; i < 4 * (img.width * img.height); i +=4)
		{
			if (byteCounter > 7)
			{
				this.imgAsByteArray[arrayIndex] = byte;
				byteCounter = 0;
				byte = 0;
				arrayIndex ++;
			}

			if (this.bitFromInt(img.data[i]))
			{
				byte = this.bitSet(byte, byteCounter);
			}

			byteCounter ++;
		}
	}

	bitToUint8Array()
	{
		//let imgObject = new Image(this.width, this.height);
		let fullImgArray = new Uint8Array(this.width * this.height * 4);
		let classRef = this;

		//imageData.data = new Uint8Array(this.width * this.height * 8);
		this.imgAsByteArray.forEach(function decodeBits(value, index)
		{
			// 1 integer gets split up into 8 bits,
			// each bit is the R value of the pixel which then needs to be set for RGB
			// and skip the A (so its 4 integers per Pixel)
			let integersPerPixel = 4;
			let pixelPerByte = 8;
			let decodedIndexLength = pixelPerByte * integersPerPixel;
			let arrayOffset = index * decodedIndexLength;
			// set rgba
			for(let bitPosition = 0; bitPosition < 8; bitPosition++)
			{
				let bitOffset = bitPosition * 4;
				let byte = classRef.intFromBit(classRef.bitTest(value, bitPosition));

				fullImgArray[arrayOffset + bitOffset] = byte;
				fullImgArray[arrayOffset + bitOffset + 1] = byte;
				fullImgArray[arrayOffset + bitOffset + 2] = byte;
				fullImgArray[arrayOffset + bitOffset + 3] = 255;
			}
		});

		return fullImgArray;
	}

	saveImage(imgname)
	{
		let png = new PNG(
		{
			width: 640,
			height: 384,
			filterType: -1
		});

		png.data = this.bitToUint8Array();
		png.pack().pipe(fs.createWriteStream(imgname));
	}

	bitFromInt(byte)
	{
		if (byte > 127)
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}

	intFromBit(bit)
	{
		if (bit == 1)
		{
			return 255;
		}
		else
		{
			return 0;
		}
	}

	toObject()
	{
		return {
			width: this.width,
			height: this.height,
			data: this.imgAsByteArray.toString()
		}
	}

	byteArrayFromString(size, byteArrString)
	{
		//let stringArray = window.blobGen.toObject().data.split(",");
		let stringArray = byteArrString.split(",");
		let uintArray = new Uint8Array(stringArray.length);
		stringArray.forEach(function (stringVal, index)
		{
			uintArray[index] = parseInt(stringVal);
		});

		return uintArray;
	}

	bitSet(num, bit)
	{
		return num | 1<<bit;
	}

	bitTest(num, bit)
	{
		return ((num>>bit) % 2 != 0)
	}

	/*

	bit_clear(num, bit)
	{
		return num & ~(1<<bit);
	}

	bit_toggle(num, bit)
	{
		return bit_test(num, bit) ? bit_clear(num, bit) : bit_set(num, bit);
	}
	*/
};

module.exports = BlobGenerator;