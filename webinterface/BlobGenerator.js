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

	displayImgString()
	{
		//console.log(this.imgAsByteArray);
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

	bitSet(num, bit)
	{
		return num | 1<<bit;
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
		})

		return uintArray;
	}

	/*
	bit_test(num, bit)
	{
		return ((num>>bit) % 2 != 0)
	}

	bit_clear(num, bit)
	{
		return num & ~(1<<bit);
	}

	bit_toggle(num, bit)
	{
		return bit_test(num, bit) ? bit_clear(num, bit) : bit_set(num, bit);
	}
	*/
}