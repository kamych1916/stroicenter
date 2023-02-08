<template>
  <div class="list" v-if="slider">
    <Transition name="slide_img" style="z-index: 1; width: 100%">
      <img
        v-if="slider_flag"
        :src="slider.background_main"
        class="list-background__img"
      />
    </Transition>
    <div class="list-background__layer"></div>

    <header class="list-header section">
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

    <div class="list-slide_container section">
      <Transition name="slide_container">
        <div class="list-container" v-if="slider_flag">
          <div class="list-welcome">
            <div class="list-welcome__title">
              <img :src="slider.title.img" />
              <span>{{ slider.title.text }}</span>
            </div>
            <div class="list-welcome__description">
              <h1>{{ slider.name }}</h1>
              <p v-html="slider.description"></p>
              <nuxt-link :to="`/list/?group=${slider.group}`"> Подробнее</nuxt-link>
            </div>
          </div>
        </div>
      </Transition>
      <nuxt-link :to="`/list/?group=${slider.group}`" class="list-mobile_btn">Подробнее</nuxt-link>
      <div class="list-slider">
        <div class="list-arrow--prev" @click="sliderEvent('prev')">
          <i class="bx bx-left-arrow-alt"></i>
        </div>
        <div
          :class="[
            'list-arrow',
            Number(item.id) === slider_number + 1 ? 'list-arrow--active' : null,
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
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      slider_list: null,
      slider_number: 0,
      slider: null,
      slider_flag: true,
    };
  },
  mounted() {
    this.$api("products", "getData").then((res) => {
      this.slider_list = res.banners;
      this.slider = this.slider_list[0];
      setInterval(() => {
        this.sliderEvent("next")
      }, 5000);
    });
  },
  methods: {
    sliderEvent(val) {
      this.slider_flag = !this.slider_flag;
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
      setTimeout(() => {
        this.slider_flag = !this.slider_flag;
      }, 300);
    },
  },
};
</script>

<style lang="scss">
.list {
  height: 100%;
  position: relative;

  &-background__layer {
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: stretch;
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.45);
    z-index: 2;
  }
  &-background__img {
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: stretch;
    position: absolute;
    z-index: 1;
    @include less-than(tablet) {
      object-fit: cover;
    }
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
      padding-bottom: 20px;
    }

    &-logo {
      font-family: "Gilroy-Bold";
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      background: #0c63e4;
      transition: all ease 0.3s;
      padding: 10px 20px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      @include less-than(tablet) {
        font-size: 18px;
      }
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

  &-slide_container {
    z-index: 3;
    max-height: 100%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    position: relative;
  }
  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    @include less-than(tablet) {
      display: flex;
      margin-bottom: 0px;
    }
  }
  &-welcome {
    width: 100%;
    position: relative;
    z-index: 3;
    margin-top: 90px;
  }
  &-welcome__title {
    margin-top: auto;
    margin-bottom: 40px;
    width: fit-content;
    background: linear-gradient(90deg, #31a3f5 0%, rgba(30, 152, 241, 0) 100%);
    padding: 16px 34px;
    display: flex;
    align-items: center;
    color: #fff;
    text-transform: uppercase;
    font-family: "Gilroy-Bold";
    letter-spacing: 0.1em;
    @include less-than(tablet) {
      padding: 18px;
      font-size: 12px;
      margin-top: 10px;
      margin-bottom: 0px;
    }
    img {
      width: 16px;
      margin-right: 10px;
    }
    span {
      margin-top: 2px;
    }
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
      font-size: 76px;
      margin-top: 20px;
      @include less-than(tablet) {
        margin-top: 10px;
        font-size: 32px;
      }
    }
    p {
      margin: auto 0;
      width: 100%;
      font-size: 20px;
      opacity: 0.9;
      line-height: 32px;
      padding-top: 40px;
      padding-bottom: 60px;
      @include less-than(tablet) {
        width: 100%;
        line-height: 26px;
        font-size: 14px;
        margin-top: 00px;
        padding-bottom: 20px;
        padding-top: 0px;
      }
    }
    a {
      text-decoration: none;
      padding: 20px 126px;
      width: fit-content;
      background: #0c63e4;
      border-radius: 0;
      color: #fff;
      letter-spacing: 0.03em;
      font-size: 18px;
      font-family: "Gilroy-Medium";
      letter-spacing: 0.08em;
      @include less-than(tablet) {
        display: none;
      }
    }
  }
  &-mobile_btn {
    display: none;

    @include less-than(tablet) {
      margin-top: auto;
      z-index: 3;
      padding: 14px;
      width: 100%;
      background: #0c63e4;
      border-radius: 0;
      color: #fff;
      letter-spacing: 0.03em;
      font-size: 14px;
      font-family: "Gilroy-Medium";
      letter-spacing: 0.08em;
      display: block;
      text-align: center;
      text-decoration: none;
    }
  }

  &-slider {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
      padding: 20px 0;
    @include less-than(tablet) {
      width: 100%;
    }
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

.slide_img-enter-active,
.slide_img-leave-active {
  transition: opacity 0.5s;
}
.slide_img-enter, .slide_img-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide_container-enter-active {
  transition: all 0.3s ease;
}
.slide_container-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide_container-enter, .slide_container-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
