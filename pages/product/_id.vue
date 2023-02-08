<template>
  <div v-if="product">
    <div class="section">
      <div class="product-breadcrumbs">
        <nuxt-link to="/">Главная</nuxt-link>
        <i class="bx bx-chevron-right"></i>
        <nuxt-link :to="`/list/?group=${product.group.value}`">{{
          product.group.label
        }}</nuxt-link>
        <i class="bx bx-chevron-right"></i>
        <span>{{ product.name }}</span>
      </div>

      <div class="product-welcome">
        <div class="product-img">
          <img :src="product.img" />
        </div>

        <div class="product-about">
          <h1>{{ product.name }}</h1>

          <p v-html="product.description"></p>

          <ul>
            <li
              v-for="item in product.items"
              :key="item.label"
              v-html="item.label"
            ></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="product-characteristics">
        <div class="product-info">
          <div class="product-menu">
            <div class="product-menu__wrapper">
              <div
                class="product-menu__item"
                :class="[
                  item_value === 1 ? 'product-menu__item--active' : null,
                ]"
                @click="changeItems(1)"
              >
                Применение
              </div>
              <div
                class="product-menu__item"
                :class="[
                  item_value === 2 ? 'product-menu__item--active' : null,
                ]"
                @click="changeItems(2)"
              >
                Характеристики
              </div>
              <div
                class="product-menu__item"
                :class="[
                  item_value === 3 ? 'product-menu__item--active' : null,
                ]"
                @click="changeItems(3)"
              >
                Инструкция
              </div>
            </div>
          </div>
          <div class="product-info__card" v-html="itemText(product)"></div>
        </div>
        <div class="product-files">
          <div class="product-file">
            <div class="product-file__img">
              <img :src="product.img" />
            </div>
            <span>{{ product.name }}</span>
            <p v-html="product.description"></p>
            <ul>
              <li
                v-for="item in product.items"
                :key="item.label"
                v-html="item.label"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      item_value: 1,
    };
  },
  computed: {
    itemName() {
      return (value) => {
        let name = null;
        if (value === 1) {
          name = "Применение";
        } else if (value === 2) {
          name = "Характеристики";
        } else {
          name = "Инструкции";
        }
        return name;
      };
    },
    itemText() {
      return (value) => {
        let text = null;
        if (this.item_value === 1) {
          text = value.use;
        } else if (this.item_value === 2) {
          text = value.characteristics;
        } else {
          text = value.instructions;
        }
        return text;
      };
    },
  },
  async fetch() {
    let response = await this.$api("products", "getProduct", {
      id: this.$route.params.id,
    });
    this.product = response;
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    changeItems(item) {
      this.item_value = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  &-breadcrumbs {
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    * {
      margin-top: 5px;
    }
    a {
      color: #8b929f;
      text-decoration: none;
      transition: all ease 0.3s;
      &:hover {
        color: inherit;
      }
    }
    i {
      padding: 0 10px;
      color: #8b929f;
    }
  }

  &-welcome {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: row;
    @include less-than(laptop) {
      flex-direction: column;
      padding: 30px 0;
    }
  }
  &-img {
    flex: auto;
    display: flex;
    justify-content: center;
    margin-right: 100px;
    @include less-than(laptop) {
      margin-right: 20px;
      img {
        width: 70%;
      }
    }
  }
  &-about {
    flex: 100%;
    color: #2e3138;
    h1 {
      font-size: 45px;
      letter-spacing: 2px;
      margin-bottom: 15px;
      text-transform: uppercase;
      font-family: "Gilroy-Bold";
      @include less-than(laptop) {
        text-align: center;
        font-size: 25px;
        margin-bottom: 10px;
        margin-top: 25px;
      }
    }

    p {
      font-size: 20px;
      width: 100%;
      line-height: 20px;
      color: #2e3138;
      font-family: "Gilroy-Medium";
      @include less-than(laptop) {
        font-size: 16px;
        text-align: center;
      }
    }

    ul {
      width: 100%;
      margin-left: 40px;
      margin-top: 40px;
      line-height: 1.25;
      font-weight: 700;
      @include less-than(laptop) {
        margin-left: 0px;
        margin-top: 25px;
        padding-left: 45px;
      }
    }

    li {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      list-style: none;
      display: flex;
      align-items: center;
      position: relative;
      color: #8b929f;
      &::after {
        content: "";
        position: absolute;
        width: 14px;
        height: 10px;
        left: -38px;
        background: url(../../static/home/list-type-color.png) no-repeat;
        background-size: cover;
      }
      @include less-than(laptop) {
        font-size: 18px;
      }
    }
  }

  &-menu {
    width: 100%;
  }
  &-menu__wrapper {
    display: flex;
    justify-content: space-between;
    color: #8b929f;
    @include less-than(laptop) {
      flex-direction: column;
      padding: 0;
    }
  }
  &-menu__item {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 20px;
    cursor: pointer;
    border-bottom: 1px solid #dbdfe6;
    transition: all ease 0.3s;
    @include less-than(laptop) {
      padding-top: 20px;
    }
  }
  &-menu__item--active {
    border-bottom: 3px solid #179dff;
    color: #2e3138;
  }

  &-characteristics {
    padding: 40px 0;
    display: flex;
    @include less-than(laptop) {
      flex-direction: column;
    }
  }

  &-info {
    flex: 100%;
    margin-right: 40px;
    box-shadow: 1px 1.732px 10px 0px rgb(0 0 0 / 5%);
    background-color: #fff;
    padding: 20px 30px;
    @include less-than(laptop) {
      margin-right: 0px;
      padding: 20px;
      padding-top: 10px;
    }
    h2 {
      font-weight: 800;
      color: #044e6e;
    }
  }
  &-info__card {
    width: 100%;
    height: 800px;
    margin-top: 40px;
  }

  &-files {
    flex: 50%;
    height: fit-content;
    top: 90px;
    position: sticky;
    background-color: #fff;
    box-shadow: 1px 1.732px 10px 0px rgb(0 0 0 / 5%);
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    @include less-than(laptop) {
      flex: 100%;
      margin-top: 40px;
      margin-bottom: 20px;
    }
  }

  &-file {
    padding: 16px 20px;
    color: #02405b;
    font-weight: 800;
    * {
      margin-bottom: 10px;
    }
    span {
      font-family: "Gilroy-Bold";
      font-size: 20px;
      color: #2e3138;
    }
    p {
      margin-top: 10px;
      font-family: "Gilroy-Medium";
      color: #555e70;
      font-size: 16px;
    }
    ul {
      margin-top: 20px;
    }
    li {
      margin-bottom: 0px;
      padding: 10px 0;
      list-style: none;
      font-size: 16px;
      color: #555e70;
      margin-left: 40px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 14px;
        height: 10px;
        left: -38px;
        background: url(../../static/home/list-type-color.png) no-repeat;
        background-size: cover;
      }
    }
  }
  &-file__img {
    display: flex;
    justify-content: center;
    img {
      width: 35%;
    }
  }
}
</style>
