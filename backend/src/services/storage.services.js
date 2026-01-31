const ImageKit = require('imagekit');

const imagekitInstance = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(fileBuffer, fileName) {
    try {
        const result = await imagekitInstance.upload({
            file: fileBuffer,
            fileName: fileName,
        });

        return result.url;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadFile
};
        