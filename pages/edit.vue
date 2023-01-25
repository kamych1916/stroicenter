<template>
  <div class="section" style="margin-top: 10px">
    <button
      @click="kek()"
      style="background-color: rgb(59 143 31); color: #fff; cursor: pointer"
    >
      Добавить новый товар
    </button>
    <div class="edit">
      <div class="edit-table">
        <div class="edit-item" v-for="product in products" :key="product.id">
          <div class="edit-item__title">
            {{ product.id }}&nbsp;&nbsp;—&nbsp;&nbsp;{{ product.name }}
          </div>
          <div class="edit-item__btns">
            <button
              style="background-color: #1f6e8f"
              @click="
                product_modal = true;
                product_data = product;
                product_img = product.img
              "
            >
              изменить
            </button>
            <button style="background-color: #b21d1d">удалить</button>
          </div>
        </div>
      </div>
    </div>
    <Modal
      class="productModal"
      :value="product_modal"
      v-if="product_modal"
      @close="product_modal = false"
    >
      <div class="productModal-wrapper">
        <div style="margin-bottom: 10px; text-align: center">
          Изменение продукта
        </div>
        <form class="productModal-form">
          <span>Наименование</span>
          <input type="text" v-model="product_data.name" />
          <span>Описание</span>
          <textarea rows="2" v-model="product_data.description"></textarea>
          <span>Фасовка</span>
          <input type="text" v-model="product_data.packing" />
          <span>Списки</span>
          <div
            class="productModal-list"
            v-for="item in product_data.items"
            :key="item"
          >
            <input type="text" :value="item" />
            <button type="button">удалить</button>
          </div>
          <div class="productModal-list">
            <input type="text" v-model="new_item_list" />
            <button type="button">добавить</button>
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
          <input type="text" v-model="product_data.group" />

          <span>Изображение продукта</span>
          <button @click="$refs.fileInput.click()" type="button" style="cursor: pointer; border: 1px solid #ccc">Загрузить</button>
          <input
            type="file"
            accept=".png,image/png"
            aria-label="upload image button"
            @change="onFileSelected"
            style="display: none"
            ref="fileInput"
          />
          <img id="myimage"  :src="product_img" />
          <button type="button" @click="edit">edit</button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import db from "~/api/database.txt";
const DB = JSON.parse(db).products;

export default {
  data() {
    return {
      products: DB,

      product_modal: false,

      product_data: null,

      new_item_list: null,

      product_img: null
    };
  },
  methods: {
    async kek() {
      let lol = await this.$api("products", "read");
    },
    onFileSelected(e) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (onloadEvent) => {
        this.product_img = onloadEvent.target.result
      }
      this.upload_image = e.target.files[0]
    },
    async edit(){
      const url = "http://localhost:3000/api/upload";
      const formData = new FormData();
      formData.append("file", this.upload_image);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response = await this.$axios.$post(url, formData, config);
      console.log(response)
    }
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
