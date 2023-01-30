<template>
  <div>
    <div v-if="access" class="section" style="margin-top: 10px">
      <button
        @click="openModal()"
        style="background-color: rgb(59 143 31); color: #fff; cursor: pointer"
      >
        Добавить новый товар
      </button>
      <div class="edit">
        <div class="edit-table">
          <div class="edit-item" v-for="product in products" :key="product.id">
            <div class="edit-item__title">
              {{ product.name }}
            </div>
            <div class="edit-item__btns">
              <button
                style="background-color: #1f6e8f"
                type="button"
                @click="
                  command = 'edit';
                  product_modal = true;
                  product_data = product;
                  product_img = product.img;
                "
              >
                изменить
              </button>
              <button
                style="background-color: #b21d1d"
                type="button"
                @click="removeProduct(product.id, product.name)"
              >
                удалить
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        class="productModal"
        :value="product_modal"
        v-if="product_modal"
        @close="closeModal()"
      >
        <div class="productModal-wrapper">
          <div style="margin-bottom: 10px; text-align: center">
            Изменение продукта
          </div>
          <form @submit.prevent="productEvent()" class="productModal-form">
            <span>Наименование</span>
            <input type="text" required v-model="product_data.name" />
            <span>Описание</span>
            <textarea
              rows="2"
              required
              v-model="product_data.description"
            ></textarea>
            <span>Фасовка</span>
            <input type="text" required v-model="product_data.packing" />
            <span>Списки</span>
            <div
              class="productModal-list"
              v-for="item in product_data.items"
              :key="item.label"
            >
              <input
                type="text"
                required
                :v-model="item.label"
                :value="item.label"
              />
              <button type="button" @click="removeItem(item.label)">
                удалить
              </button>
            </div>
            <div class="productModal-list" v-if="product_data.items.length < 6">
              <input type="text" v-model="new_item_list" />
              <button type="button" @click="addItem">добавить</button>
            </div>

            <span>К какой группе относиться</span>
            <div>
              <small>( 1 ) - Клеи для плитки, </small>
              <small>( 2 ) - Штукатурки, </small> <br />
              <small>( 3 ) - Шпаклевки, </small>
              <small>( 4 ) - Полы, </small> <br />
              <small>( 5 ) - Декор / Затирки, </small>
              <small>( 6 ) - Лако-красочные материалы</small>
            </div>
            <input type="text" required v-model="product_data.group" />

            <span>Характеристики</span>
            <client-only>
              <VueEditor v-model="product_data.characteristics" />
            </client-only>

            <span>Применение</span>
            <client-only>
              <VueEditor v-model="product_data.use" />
            </client-only>

            <span>Инструкции</span>
            <client-only>
              <VueEditor v-model="product_data.instructions" />
            </client-only>

            <span>Изображение продукта</span>
            <button
              @click="$refs.fileInput.click()"
              type="button"
              style="cursor: pointer; border: 1px solid #ccc"
            >
              Загрузить
            </button>
            <input
              type="file"
              accept=".png,image/png"
              aria-label="upload image button"
              @change="onFileSelected"
              style="display: none"
              ref="fileInput"
            />
            <img
              id="myimage"
              style="width: 300px !important"
              :src="product_img"
            />

            <button type="submit">
              <span>{{ command_name(command) }} продукт</span>
            </button>
          </form>
        </div>
      </Modal>
    </div>
    <div v-else class="section" style="margin: 200px 0">
      <input
        type="password"
        v-model="password"
        style="border: 1px solid #ccc"
        v-on:keyup.enter="signIn()"
      />
      <button @click="signIn()">войти</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: "withoutFooter",

  data() {
    return {
      password: null,
      access: false,

      products: null,

      product_modal: false,

      product_data: {
        id: null,
        name: null,
        description: null,
        packing: null,
        items: [],
        group: null,
        img: null,
        characteristics: null,
        use: null,
        instructions: null,
      },

      new_item_list: null,

      product_img: null,

      command: null,
    };
  },

  computed: {
    command_name() {
      return (value) => {
        let command = null;
        if (value === "add") {
          command = "Добавить";
        } else if (value === "edit") {
          command = "Изменить";
        }
        return command;
      };
    },
  },

  async fetch() {
    let response = await this.$api("products", "getProducts");
    this.products = response;
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  methods: {
    async productEvent() {
      if (!this.product_img) {
        alert("Пожалуйста, загрузите изображение");
        return;
      }
      if (!this.product_data.items.length) {
        alert("Введите списки для продукта пожалуйста");
        return;
      }

      let image_name = `/home/${this.product_data.name}.png`;
      this.product_data.img = image_name;

      this.$api(
        "products",
        this.command === "add" ? "addProduct" : "editProduct",
        this.product_data
      )
        .then((res) => {
          if (this.upload_image) {
            this.addImage(image_name);
          }
          this.products = res;
          this.product_modal = false;
        })
        .catch((err) => {
          alert("что то не так");
          console.log(err);
        });
    },

    async removeProduct(id, name) {
      if (confirm("Вы уверены что хотите удалить?")) {
        let response = await this.$api("products", "removeProduct", {
          id: id,
          name: name,
        });
        if (response === "ok") {
          this.products = this.products.filter((product) => product.id !== id);
        }
      }
    },

    addItem() {
      if (this.product_data.items.length < 6 && this.new_item_list) {
        this.product_data.items.push({
          label: this.new_item_list,
        });
        this.new_item_list = null;
      }
    },

    removeItem(label) {
      this.product_data.items = this.product_data.items.filter(
        (el) => el.label !== label
      );
    },

    async addImage(name) {
      const url = "http://stroicenter.mirllex.com/api/upload";
      // const url = "http://localhost:3000/api/upload";
      const formData = new FormData();
      formData.append("file", this.upload_image, name);
      try {
        await this.$axios.$post(url, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    onFileSelected(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (onloadEvent) => {
        this.product_img = onloadEvent.target.result;
      };
      this.upload_image = e.target.files[0];
    },

    openModal() {
      this.command = "add";
      this.product_img = null;
      this.product_data = {
        id: null,
        name: null,
        description: null,
        packing: null,
        items: [],
        group: null,
        img: null,
      };
      this.product_modal = true;
    },

    closeModal() {
      this.command = null;
      this.product_img = null;
      this.product_data = {
        name: null,
        description: null,
        packing: null,
        items: [],
        group: null,
        img: null,
      };
      this.product_modal = false;
    },

    signIn() {
      if (this.password === "19692002") {
        this.access = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  margin-bottom: 40px;
  margin-top: 20px;
  background-color: #fff;

  &-table {
    display: flex;
    flex-direction: column;
  }

  &-item {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    @include less-than(laptop) {
      flex-direction: column;
    }
  }

  &-item__title {
    padding: 0 10px;
  }
  &-item__btns {
    padding: 0 10px;
    @include less-than(laptop) {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    button {
      color: #fff;
      cursor: pointer;
      margin: 0 10px;
    }
  }
}
.productModal {
  &-wrapper {
    width: 100%;
    padding: 20px;
  }

  &-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      margin-top: 10px;
      margin-bottom: 0;
      font-size: 16px;
      color: #044e6e;
    }
    * {
      width: 100%;
      margin: 10px 0;
    }
  }
  &-list {
    display: flex;
    * {
      display: block;
      margin-bottom: 0px;
      margin-top: 5px;
    }
    input {
      flex: auto;
      margin-right: 20px;
    }
    button {
      flex: 1;
      background-color: rgb(33 34 36 / 5%);
    }
  }
}
</style>
