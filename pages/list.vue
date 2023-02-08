<template>
    <div class="home">
      <div class="home-background" v-if="slider_list">
        <div class="home-welcome section">
          <div class="home-welcome__description">
            <h1>{{ slider.name }}</h1>
            <p v-html="slider.description"></p>
          </div>
          <div class="home-welcome__title">
            <img :src="slider.title.img" />
          <span>{{ slider.title.text }}</span>
        </div>
        </div>
        <img :src="slider.background_list" class="home-background__img" />
  
        <div class="home-slider">
          <div class="home-arrow--prev" @click="sliderEvent('prev')">
            <i class="bx bx-left-arrow-alt"></i>
          </div>
          <div
            :class="[
              'home-arrow',
              Number(item.id) === slider_number + 1 ? 'home-arrow--active' : null,
            ]"
            v-for="item in slider_list"
            :key="item.id"
            @click="sliderEvent(item.id)"
          ></div>
          <div class="home-arrow--next">
            <i class="bx bx-right-arrow-alt" @click="sliderEvent('next')"></i>
          </div>
        </div>
      </div>
  
      <div class="home-menu section">
        <div class="home-menu__wrapper">
          <span
            :class="active_group.includes(1) ? 'home-menu__active' : null"
            @click="change_list(1)"
          >
            Клеи для плитки
            <img src="/home/home_1.png" />
          </span>
          <span
            :class="active_group.includes(2) ? 'home-menu__active' : null"
            @click="change_list(2)"
          >
            Штукатурки
            <img src="/home/home_2.png" />
          </span>
          <span
            :class="active_group.includes(3) ? 'home-menu__active' : null"
            @click="change_list(3)"
          >
            Шпаклевки
            <img src="/home/home_3.png" />
          </span>
          <span
            :class="active_group.includes(4) ? 'home-menu__active' : null"
            @click="change_list(4)"
          >
            Полы
            <img src="/home/home_4.png" />
          </span>
          <span
            :class="active_group.includes(5) ? 'home-menu__active' : null"
            @click="change_list(5)"
          >
            Декор / Затирки
            <img src="/home/home_5.png" />
          </span>
          <span
            :class="active_group.includes(6) ? 'home-menu__active' : null"
            @click="change_list(6)"
          >
            Лако-красочные материалы
            <img src="/home/home_6.png" />
          </span>
        </div>
      </div>
  
      <div class="home-list section" ref="list">
        <div
          class="home-product"
          v-for="product in products"
          :key="product.id"
          @click="$router.push('/product/' + product.id)"
        >
          <span>{{ product.name }}</span>
          <p v-html="product.description"></p>
  
          <div class="home-product__hover">
            <ul>
              <li v-for="item in product.items" :key="item.label">
                {{ item.label }}
              </li>
            </ul>
          </div>
  
          <div class="home-product__img">
            <img :src="product.img" :alt="product.name" />
          </div>
  
          <div class="home-product__link">Подробнее</div>
  
          <div class="home-product__footer">
            <img src="/packing.svg" /> {{ product.packing }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: null,
        products_store: null,
        active_group: [],
  
        slider_list: null,
        slider_number: 0,
        slider: null,
      };
    },
  
    mounted() {
      this.$api("products", "getData").then((res) => {
        this.slider_list = res.banners;
        this.slider = this.slider_list[0];
  
        this.products_store = res.products;
        this.products = res.products;
  
        if (this.$route.query.group) {
          setTimeout(() => {
            this.change_list(Number(this.$route.query.group));
            this.sliderEvent(this.$route.query.group);
          }, 10);
        } else {
          window.scrollTo(0, 0);
        }
      });
    },
  
    methods: {
      change_list(group_number) {
        if (this.active_group.includes(group_number)) {
          this.active_group.splice(this.active_group.indexOf(group_number), 1);
        } else {
          this.active_group.push(group_number);
          window.scrollTo({
            top: this.$refs.list.offsetTop - 80,
            behavior: "smooth",
          });
        }
  
        if (this.active_group.length > 0) {
          let new_list = [];
          this.active_group.forEach((ag) => {
            this.products = this.products_store.filter((product) => {
              return product.group.value === ag;
            });
            new_list.push(...this.products);
          });
  
          this.products = new_list;
          this.products = this.products.filter((item, index) => {
            return this.products.indexOf(item) === index;
          });
        } else {
          this.products = this.products_store;
        }
      },

    },
  };
  </script>
  
  <style lang="scss" scoped>
  .home {
    &-background {
      background: linear-gradient(95.53deg, #0d83d9 19.45%, #5ec5ff 58.2%);
      padding: 30px 0;
      position: relative;
      display: flex;
      align-items: center;
    }
    &-background__img {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      @include less-than(laptop) {
        display: none;
      }
    }
  
    &-slider {
      position: absolute;
      bottom: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      z-index: 2;
      i {
        display: block;
        font-size: 26px;
        color: #fff;
        opacity: 0.4;
        transition: all ease 0.3s;
      }
    }
    &-arrow--prev,
    &-arrow--next {
      padding: 5px;
      margin: 0 20px;
      cursor: pointer;
      &:hover {
        i {
          opacity: 1;
        }
      }
    }
    &-arrow {
      padding: 3px;
      border-radius: 100%;
      margin: 0 5px;
      cursor: pointer;
      background-color: #fff;
      opacity: 0.4;
      transition: all ease 0.3s;
      &:hover {
        opacity: 1;
      }
    }
    &-arrow--active {
      opacity: 1;
    }
  
    &-welcome {
      position: relative;
      z-index: 1;
      min-height: 100%;
    }
    &-welcome__line {
      margin: 10px 0;
      height: 2px;
      width: 60px;
      background-color: #044e6e;
      @include less-than(tablet) {
        margin: 5px 0;
      }
    }
    &-welcome__description {
      width: 55%;
      min-height: 280px;
      color: #fff;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      @include less-than(laptop) {
        width: 100%;
      }
      h1 {
        text-transform: uppercase;
        font-family: "Gilroy-Bold";
        line-height: 58px;
        letter-spacing: 0.03em;
        font-size: 40px;
        @include less-than(tablet) {
          font-size: 28px;
        }
      }
      p {
        margin: auto 0;
        width: 100%;
        font-size: 16px;
        opacity: 0.9;
        line-height: 26px;
        @include less-than(tablet) {
          width: 100%;
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }
    &-welcome__title {
      margin-top: auto;
      margin-bottom: 20px;
      width: fit-content;
      background: linear-gradient(90deg, #31a3f5 0%, rgba(30, 152, 241, 0) 100%);
      padding: 20px 40px;
      display: flex;
      align-items: center;
      color: #fff;
      text-transform: uppercase;
      font-family: 'Gilroy-Bold';
      letter-spacing: 0.1em;
      @include less-than(tablet) {
        padding: 20px;
        font-size: 14px;
        margin-top: 20px;
        margin-bottom: 40px;
      }
      img{
        width: 16px;
        margin-right: 10px;
      }
      span{
        margin-top: 2px;
      }
    }
  
    &-menu {
      display: flex;
      justify-content: center;
      margin-top: 80px;
      padding: 20px inherit;
      background-color: #f8f8f8;
      z-index: 3;
      @include less-than(laptop) {
        margin-top: 20px;
      }
    }
    &-menu__wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      text-align: left;
      grid-gap: 20px;
      @include less-than(laptop) {
        grid-gap: 20px;
        grid-template-columns: 1fr;
      }
      span {
        display: block;
        position: relative;
        flex: 2;
        cursor: pointer;
        color: #2e3138;
        background-color: #fff;
        padding: 30px 20px;
        transition: all ease 0.3s;
        font-size: 15px;
        &:hover {
          transform: scale(1.02);
        }
        @include less-than(laptop) {
          font-size: 16px;
        }
        img {
          position: absolute;
          bottom: 0;
          right: 20px;
          width: 60px;
        }
      }
    }
    &-menu__active {
      background-color: #0c63e4 !important;
      color: #fff !important;
    }
  
    &-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
      margin-top: 80px;
      padding-bottom: 80px;
      transition: all ease 0.3s;
  
      @include less-than(laptop) {
        margin-top: 20px;
        grid-template-columns: 1fr;
      }
    }
  
    &-product {
      background-color: #fff;
      position: relative;
      transition: all ease 0.2s;
      cursor: pointer;
      min-height: 450px;
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
  
      &:hover {
        background-color: #0c63e4;
        * {
          color: #fff;
        }
        .home-product__hover {
          display: block;
          ul {
            position: absolute;
            z-index: 2;
            width: 100%;
            padding: 10px 40px;
            margin-top: 10px;
            line-height: 1.25;
            font-weight: 700;
          }
  
          li {
            font-size: 15px;
            padding-bottom: 20px;
            list-style: none;
            display: flex;
            align-items: center;
            position: relative;
            color: #fff;
            &::after {
              content: "";
              position: absolute;
              width: 11px;
              height: 8px;
              left: -20px;
              background: url(../static/home/list-type.png) no-repeat;
              background-size: cover;
            }
          }
        }
        .home-product__img {
          img {
            opacity: 0.2;
          }
        }
        .home-product__footer {
          opacity: 0;
        }
        .home-product__link {
          display: block;
          border: 1px solid #fff;
          padding: 10px 20px;
          font-size: 16px;
          width: 80%;
          margin: 0 auto;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all ease 0.3s;
          &:hover {
            background-color: #0c63e4;
          }
        }
      }
  
      span {
        display: block;
        margin-top: 20px;
        padding: 0 20px;
        font-weight: 700;
        font-size: 22px;
        font-family: "Gilroy-Semibold";
        color: #2e3138;
      }
      p {
        color: #8b929f;
        font-size: 15px;
        margin: 10px 0;
        padding: 0 20px;
      }
    }
    &-product__hover {
      display: none;
    }
    &-product__img {
      display: flex;
      justify-content: center;
      margin-top: auto;
      margin-bottom: 20px;
      width: 100%;
      img {
        height: 240px;
        background-size: contain;
        background-position: center;
      }
    }
    &-product__footer {
      padding: 10px 0;
      margin: 10px 20px;
      margin-bottom: 0;
      border-top: 1px solid #dbdfe6;
      font-size: 14px;
      color: #2e3138;
      font-family: "Gilroy-Medium";
      img {
        width: 10px;
        margin-right: 10px;
      }
    }
    &-product__link {
      display: none;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  ::-webkit-scrollbar {
    height: 4px;
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #597dfd24;
    border-radius: 10px;
  }
  </style>
  