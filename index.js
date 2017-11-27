const request = require("request").defaults({ encoding: null });
const sharp = require("sharp");

const config = require ("./config");
const imageRepository = require("./domain/imageRepository");

const batchTimer = 2000 + (config.batchSize * 400);

var total = 0;
var batchStart = 0;
var batchEnd = config.batchSize;

function saveMinimizedImage(imageId, minimizedImage) {
	return new Promise(function (resolve, reject) {
		imageRepository.updateMinimizedImage(imageId, minimizedImage, function(updatedImage) {
			return resolve(imageId);
		});
	});
};

function minimzeImage(imageUrl) {
	return new Promise(function (resolve, reject) {
		if (!imageUrl || imageUrl.length == 0) {
			return reject("No url provided");
		}

		request.get(imageUrl, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        sharp(body)
				  .resize(config.minimizedPixelSize)
				  .toBuffer()
				  .then( data => {
				  	var buffered = "data:" + response.headers["content-type"] + ";base64," + new Buffer(data).toString("base64");
				  	return resolve(buffered);
				  })
				  .catch( error => {
				  	return reject(JSON.stringify(error));
				  });
		    }
		    else {
		    	return  reject(JSON.stringify(error));
		    }
		});
	});
};

function minimizeImages(images) {
	return new Promise(function (resolve, reject) {
		var counter = 0;
		images.forEach((image) => {
			minimzeImage(image.imageUrl)
			.then((minimizedImage) => {
				return saveMinimizedImage(image.imageId, minimizedImage);
			})
			.then((imageId) => {
				counter++;
				if (counter == images.length) {
					return resolve();
				}
			})
			.catch((error) => {
				console.log("***Error***: " + error);

				counter++;
				if (counter == images.length) {
					return resolve();
				}
			});
		});
	});
};

function batchMinimizeImages(images) {
	if (images.length > config.batchSize) {
		console.log("Minimizing batch " + batchStart + " - " + batchEnd + " of " + total + "...");

		var batch = images.splice(0, config.batchSize);
		batchStart = batchStart + config.batchSize;
		batchEnd = batchEnd + config.batchSize;

		minimizeImages(batch);

		setTimeout(function() {
	      batchMinimizeImages(images);
	    }, batchTimer);
	}
	else {
		console.log("Minimizing batch " + batchStart + " - " + total + " of " + total + "...");
		minimizeImages(images)
		.then(() => {
			console.log("");
			console.log("Minimizing completed.");
		});
	}
};

function retrieveMinimizeAndSaveImages() {
	console.log("");
	console.log("Retrieving Images...");

	imageRepository.getImages(function (images) {
		if (!images || images.length == 0) {
			console.log("");
			console.log("No images to minize.");
			return;
		}
		
		console.log("");
		console.log("Done. Minimizing Images...");
		console.log("");

		total = images.length;

		batchMinimizeImages(images);
	});
};

retrieveMinimizeAndSaveImages();