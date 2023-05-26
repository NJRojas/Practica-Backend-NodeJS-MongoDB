const { Requester } = require('cote');
const path = require('node:path');

const requester = new Requester({ name: 'NodeApp-Thumbnail-Converter' });

module.exports = async function (imageName, size) {
  const imageURL = 'http://localhost:3000/ads/images/' + imageName;
  const destinationPath = path.join(
    __dirname,
    '..',
    'public',
    'ads',
    'thumbnails'
  );
  const thumbnailConfig = {
    type: 'create-thumbnail',
    imagePath: imageURL,
    fileName: imageName,
    destination: destinationPath,
    size: size,
  };

  requester.send(thumbnailConfig, result => {
    console.log(result);
  });
};
