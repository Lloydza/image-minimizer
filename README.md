# image-minimizer
A Node project which reads in image urls from a postgres database, and saves a tiny copy (as base64) for each to the same table. This tiny copy can be used to create a blurred effect while the actual (bigger, higher resolution) loads. See [example.html](https://github.com/Lloydza/image-minimizer/example.html) for how you could implement the blurred effect.
Required: A postgres database to read image URLs from, and write a blurred version to.

## SETUP:
You will need to link the code to your desired database (see [config.js](https://github.com/Lloydza/image-minimizer/config.js)), and customize the table/columns you want to read/write to (see [imageRepository.js](https://github.com/Lloydza/image-minimizer/domain/imageRepository.js))

### TO RUN:
1. "npm install"
2. "npm start"