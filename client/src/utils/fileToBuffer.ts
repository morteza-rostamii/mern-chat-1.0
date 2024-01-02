async function fileToBuffer(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const arrayBuffer = event.target.result;
      const buffer = Buffer.from(arrayBuffer);
      resolve(buffer);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export default fileToBuffer