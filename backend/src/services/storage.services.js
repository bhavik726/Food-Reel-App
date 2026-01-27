const imagekit = require('imagekit');

const imagekitInstance = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    const result  = await imagekit.uplaod({
        file:file,
        filename:fileName,
    })

    return result.url;
}
        