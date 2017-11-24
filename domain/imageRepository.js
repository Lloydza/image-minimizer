var postrgres = require('./data_store/postgres');

var imageRepository = {};

imageRepository.getImages = function (callback) {
		postrgres.connect('SELECT * FROM "image" WHERE "minimizedImage" IS NULL', [], callback);
};

imageRepository.updateMinimizedImage = function (imageId, minimizedImage, callback) {
    var updateQuery = 'UPDATE "image" \
                        SET "minimizedImage"=($2) \
                        WHERE "imageId"=($1)';
                        
    postrgres.connect(updateQuery, [imageId, minimizedImage], function(updatedImage) {
    	callback(updatedImage);
    });
};

module.exports = imageRepository;