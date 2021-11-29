const fs = require("fs");

class Contenedor {
  constructor(url) {
    this.url = url;
  }

  async save(newProduct) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.url}`,
        "utf-8"
      );
      let productos = [];
      if (contenido === "") {
        newProduct.id = 1;
        productos.push(newProduct);
      } else {
        const listaDeProductos = JSON.parse(contenido);
        newProduct.id = listaDeProductos[listaDeProductos.length - 1].id + 1;
        listaDeProductos.push(newProduct);
        productos = listaDeProductos;
      }
      const productoString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.url}`, productoString);
      console.log("Se guardó de forma correcta el producto");
      return newProduct.id;
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getById(number) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.url}`,
        "utf-8"
      );
      const listaDeProductos = JSON.parse(contenido);
      const resultadoId = listaDeProductos.find(
        (numero) => numero.id === number
      );
      if (resultadoId === undefined) {
        return null;
      } else {
        return resultadoId;
      }
    } catch (error) {
      console.error("Error de lectura", error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.url}`,
        "utf-8"
      );
      const listaDeProductos = JSON.parse(contenido);
      console.log("Todos los productos disponibles: ", listaDeProductos);
      return listaDeProductos;
    } catch (error) {
      console.error("Error de lectura", error);
    }
  }

  async deleteById(numero) {
    try {
      const contenido = await fs.promises.readFile(
        `./${this.url}`,
        "utf-8"
      );
      const listaDeProductos = JSON.parse(contenido);

      const resultadoId = listaDeProductos.find(
        (number) => number.id === numero
      );
      if (!resultadoId) {
        return null;
      } else {
        const index = listaDeProductos.indexOf(resultadoId);
        listaDeProductos.splice(index, 1);
        const listaNew = JSON.stringify(listaDeProductos);

        await fs.promises.writeFile(`./${this.url}`, listaNew);
        console.log("El producto seleccionado se eliminó de forma correcta");
      }
    } catch (error) {
      console.error("Error de lectura", error);
    }
  }

  async deleteAll() {
    try {
      const contenido = await fs.promises.writeFile(
        `./${this.url}`,
        ""
      );
      console.log("Se eliminaron todos los productos de forma correcta");
    } catch (error) {
      console.error("Error de lectura", error);
    }
  }

  async update(id, producto) {
    try {
      const list = await this.getAll();
      const productoSaved = list.find((item) => item.id === parseInt(id));
      const indexProductoSaved = list.findIndex(
        (item) => item.id === parseInt(id)
      );

      if (!productoSaved) {
        console.log(`Error con el Id: ${id} no fue encontrado`);
        return null;
      }

      const productoUpdate = {
        ...productoSaved,
        ...producto,
      };
      list[indexProductoSaved] = productoUpdate;

      console.log(list[indexProductoSaved]);

      const elementString = JSON.stringify(list, null, 2);
      await fs.promises.writeFile(`./${this.url}`, elementString);

      return productoUpdate;
    } catch (error) {
      console.error("Error de lectura", error);
    }
  }
}

module.exports = Contenedor;
