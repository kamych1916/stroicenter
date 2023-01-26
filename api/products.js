var fs = require("fs");
var path = require("path");

async function removeImage({ img_name }) {
  await fs.unlink(`./static/home/${img_name}`, (err) => {
    console.log(err);
  });

  // try {
  //   const data = await fs.readFileSync(path.join(__dirname, '/') + 'database.txt', 'utf-8');
  //   return data
  // } catch (err) {
  //   console.log(err);
  //   throw err
  // }
}
async function editProduct({product}) {
  console.log('lol')
}

async function addProduct(res) {
  console.log(res)
}
// function readWriteSync() {
//   var data = fs.readFileSync('filelist.txt', 'utf-8');

//   var newValue = data.replace(/^\./gim, 'myString');

//   fs.writeFileSync('filelistSync.txt', newValue, 'utf-8');

//   console.log('readFileSync complete');
// }

// readWriteAsync();
// readWriteSync();

export { removeImage, editProduct, addProduct  };
