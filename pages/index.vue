<template>
  <div>
    <div class="list-background section" v-if="slider_list">
      <img :src="slider.background_main" class="list-background__img" />
      <div class="list-background__layer"></div>

      <header class="list-header">
        <div class="list-header-wrapper">
          <nuxt-link to="/" class="list-header-logo">
            Строй <br />
            Центр
          </nuxt-link>
          <a href="tel:+992918622774" class="list-header-menu">
            <img src="/phone_main.svg" alt="" /> 918-62-27-74
          </a>
        </div>
      </header>

      <div class="list-container">
        <div class="list-welcome">
          <div class="list-welcome__title">
            <img :src="slider.title.img" />
            <span>{{ slider.title.text }}</span>
          </div>
          <div class="list-welcome__description">
            <h1>{{ slider.name }}</h1>
            <p v-html="slider.description"></p>
            <button>Подробнее</button>
          </div>
          <div class="list-slider">
            <div class="list-arrow--prev" @click="sliderEvent('prev')">
              <i class="bx bx-left-arrow-alt"></i>
            </div>
            <div
              :class="[
                'list-arrow',
                Number(item.id) === slider_number + 1
                  ? 'list-arrow--active'
                  : null,
              ]"
              v-for="item in slider_list"
              :key="item.id"
              @click="sliderEvent(item.id)"
            ></div>
            <div class="list-arrow--next">
              <i class="bx bx-right-arrow-alt" @click="sliderEvent('next')"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      slider_list: null,
      slider_number: 0,
      slider: null,
    };
  },
  mounted() {
    this.$api("products", "getData").then((res) => {
      this.slider_list = res.banners;
      this.slider = this.slider_list[0];
    });
  },
  methods: {
    sliderEvent(val) {
      if (val === "next") {
        if (this.slider_number === 4) {
          this.slider_number = 0;
        } else {
          this.slider_number += 1;
        }
        this.slider = this.slider_list[this.slider_number];
      } else if (val === "prev") {
        if (this.slider_number === 0) {
          this.slider_number = 4;
        } else {
          this.slider_number -= 1;
        }
        this.slider = this.slider_list[this.slider_number];
      } else {
        this.slider_number = Number(val) - 1;
        this.slider = this.slider_list[this.slider_number];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  &-background {
    height: 100vh;
    display: flex;
    align-items: center;
  }
  &-background__layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.25);
    z-index: 2;
  }
  &-background__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
  &-header {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // padding: 20px 0;
      padding-bottom: 20px;
    }

    &-logo {
      font-family: "Gilroy-Bold";
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      background: #0c63e4;
      transition: all ease 0.3s;
      padding: 10px 20px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      &:hover {
        box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.154);
        transform: scale(1.03);
      }
    }
    &-menu {
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      font-family: "Gilroy-Medium";
      font-size: 15px;
      text-decoration: none;
      img {
        width: 30px;
        margin-right: 10px;
      }
    }
    &-globe {
      cursor: pointer;
      margin-right: 20px;
    }
  }

  &-container {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &-welcome {
    width: 100%;
    position: relative;
    z-index: 3;
  }
  &-welcome__description {
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
      font-size: 86px;
      margin-top: 20px;
      @include less-than(tablet) {
        font-size: 28px;
      }
    }
    p {
      margin: auto 0;
      width: 100%;
      font-size: 22px;
      opacity: 0.9;
      line-height: 32px;
      padding-top: 40px;
      padding-bottom: 60px;
      @include less-than(tablet) {
        width: 100%;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    button {
      padding: 20px 126px;
      width: fit-content;
      background: #0c63e4;
      border-radius: 0;
      color: #fff;
      letter-spacing: 0.03em;
      font-size: 18px;
      font-family: "Gilroy-Medium";
      letter-spacing: 0.08em;
    }
  }

  &-welcome__title {
    margin-top: auto;
    margin-bottom: 40px;
    width: fit-content;
    background: linear-gradient(90deg, #31a3f5 0%, rgba(30, 152, 241, 0) 100%);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    color: #fff;
    text-transform: uppercase;
    font-family: "Gilroy-Bold";
    letter-spacing: 0.1em;
    @include less-than(tablet) {
      padding: 20px;
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 40px;
    }
    img {
      width: 16px;
      margin-right: 10px;
    }
    span {
      margin-top: 2px;
    }
  }

  &-slider {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    padding: 3px 20px;
    margin: 0 5px;
    cursor: pointer;
    background-color: #cccccc;
    transition: all ease 0.3s;
    &:hover {
      opacity: 1;
    }
  }
  &-arrow--active {
    background-color: #0c63e4;
  }
}
</style>
