'use strict';

const { Responder } = require('cote');
const Jimp = require('jimp');

main().catch(err => console.log('There was an error', err));

async function main() {
  const responder = new Responder({ name: 'Microservice - Thumbnail' });
  responder.on('create-thumbnail', async (req, done) => {
    try {
      console.log('procesando imagen');
      const { imagePath, fileName, destination, size } = req;

      const image = await Jimp.read(imagePath);
      image.resize(size, size);

      const imageFile = destination + '/' + Date.now() + '-' + fileName;
      const result = await image.writeAsync(imageFile);
      done(result);
    } catch (err) {
      done({ message: err.message });
    }
  });
}
