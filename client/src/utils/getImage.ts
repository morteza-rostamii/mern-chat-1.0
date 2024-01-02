
const getRandomImage = () => {
  const width = 400; // Specify the width of the image
  const height = 300; // Specify the height of the image
  const randomSeed = Math.floor(Math.random() * 1000); // Generate a random number for uniqueness

  const imageUrl = `https://picsum.photos/${width}/${height}?random=${randomSeed}`;

  // Use 'imageUrl' to display the random image or perform any action you need
  //console.log(imageUrl); // Log the generated image URL (you can use it to display the image in an <img> tag, for example)
  return imageUrl;
};

function getOneImage(color: string = ''): string {
  if (color) {
    return getRandomImage();
  }
  return getRandomImage();
}

export default getOneImage