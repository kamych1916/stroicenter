// // we can get data from any DB
// async function getDataFromDB() {
//   return (await require("axios").get(`https://reqres.in/api/users?page=1`))
//     .data;
// }

// async function index() {
//   let res = await getDataFromDB();

//   // some business logic
//   let ret = res.data.map((el) => {
//     return {
//       id: el.id,
//       full_name: el.first_name + " " + el.last_name,
//       highlight: el.first_name.charAt(0) === "J",
//     };
//   });
//   ret = ret.sort(() => 0.5 - Math.random());

//   return ret;
// }

// async function show({ id }) {
//   let res = await getDataFromDB();

//   return res.data.filter((el) => el.id == id)[0];
// }

// export { index, show };



var fs = require('fs');
var path = require('path');

async function read() {
  try {
    const data = await fs.readFileSync(path.join(__dirname, '/') + 'database.txt', 'utf-8');
    return data
  } catch (err) {
    console.log(err);
    throw err
  }
}

// function readWriteSync() {
//   var data = fs.readFileSync('filelist.txt', 'utf-8');

//   var newValue = data.replace(/^\./gim, 'myString');

//   fs.writeFileSync('filelistSync.txt', newValue, 'utf-8');

//   console.log('readFileSync complete');
// }

// readWriteAsync();
// readWriteSync();


export { read };