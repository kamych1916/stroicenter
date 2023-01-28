let fs = require("fs");

function generateUUID() {
  var d = new Date().getTime();
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function editProduct(res) {
  try {
    const data = JSON.parse(
      await fs.readFileSync("./api/database.txt", "utf-8")
    );
    data.products.forEach((product) => {
      if (product.id == res.id) {
        fs.rename(
          `./static/home/${product.name}.png`,
          `./static/home/${res.name}.png`,
          (err) => {
            if (err) console.log("ERROR: " + err);
          }
        );
      }
    });
    data.products = data.products.filter((product) => product.id !== res.id);
    data.products.push(res);

    fs.writeFileSync("./api/database.txt", JSON.stringify(data), "utf-8");

    return data.products;
  } catch (err) {
    console.log(err);
  }
}

async function addProduct(res) {
  try {
    const data = JSON.parse(
      await fs.readFileSync("./api/database.txt", "utf-8")
    );
    res.id = generateUUID();
    data.products.push(res);
    fs.writeFileSync("./api/database.txt", JSON.stringify(data), "utf-8");
    return data.products;
  } catch (err) {
    console.log(err);
  }
}
async function removeProduct({ id, name }) {
  try {
    const data = JSON.parse(
      await fs.readFileSync("./api/database.txt", "utf-8")
    );
    data.products = data.products.filter((product) => product.id !== id);

    fs.writeFileSync("./api/database.txt", JSON.stringify(data), "utf-8");

    fs.unlink(`./static/home/${name}.png`, (err) => {
      console.log(err);
    });

    return "ok";
  } catch (err) {
    console.log(err);
  }
}

async function getProduct({ id }) {
  try {
    const data = JSON.parse(
      await fs.readFileSync("./api/database.txt", "utf-8")
    );
    let answer = null;
    data.products.forEach((product) => {
      if (product.id === id) {
        answer = product
      }
    });
    return answer;
  } catch (err) {
    console.log(err);
  }
}

async function getProducts() {
  try {
    const data = JSON.parse(
      await fs.readFileSync("./api/database.txt", "utf-8")
    );
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

export { editProduct, addProduct, removeProduct, getProducts, getProduct };
