<template>
  <div v-if="product">
    <div class="product-background">
      <div class="section">
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
    </div>
    <div class="product-menu">
      <div class="section product-menu__wrapper">
        <div class="product-menu__item">Применение</div>
        <div class="product-menu__item product-menu__item--active">
          Характеристики
        </div>
        <div class="product-menu__item">Инструкция</div>
      </div>
      <!-- {{ product.packing }} -->
    </div>
    <div class="section">
      <div class="product-characteristics">
        <div class="product-info">
          <h2>Характеристики</h2>
          <div class="product-info__card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            nostrum laboriosam velit commodi esse? Repudiandae ex ullam quaerat
            ducimus cum accusamus exercitationem iste laudantium, est quis illum
            expedita in, alias tempore maxime beatae vel, vitae adipisci? Totam
            incidunt reprehenderit vero laboriosam quasi error quam, temporibus
            recusandae ullam tenetur eveniet aut ipsum eligendi aspernatur sit
            facilis perspiciatis in rem iste quae quisquam? Doloremque molestiae
            totam, non itaque autem, assumenda quas maxime aperiam quia aliquam
            in porro quidem, consectetur necessitatibus? Sed voluptatum odio
            fuga tenetur modi voluptas quis placeat rem? Quae quisquam commodi
            praesentium beatae delectus recusandae ex ut, sunt aliquid, deserunt
            aut dolorem laudantium necessitatibus assumenda modi, rerum nobis
            officiis rem. Aspernatur dolorum soluta laudantium maiores nulla
            distinctio! Expedita labore ullam amet earum velit, suscipit maiores
            harum cum et, possimus temporibus nam ex laudantium in cumque
            corrupti voluptatem molestiae aliquam, eligendi blanditiis. Incidunt
            exercitationem esse saepe quaerat labore omnis eligendi dolorem.
          </div>
        </div>
        <div class="product-files">
          <div class="product-files__sticky">
            <div class="product-file">
              <div>{{ product.name }}</div>
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
  </div>
  <div v-else></div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
    };
  },

  // fetchOnServer: false,
  async fetch() {
    let response = await this.$api("products", "getProduct", {
      id: this.$route.params.id,
    });
    console.log(response)
    this.product = response;
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.product {
  &-background {
    width: 100%;
    height: 100%;
    background: #1f6e8f url(~/static/shipment_background.png) left 0% top
      no-repeat;
  }
  &-welcome {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 100px 0;
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
    }
  }
  &-about {
    flex: 100%;
    color: #fff;
    h1 {
      font-size: 60px;
      letter-spacing: 2px;
      margin-bottom: 35px;
      text-transform: uppercase;
      @include less-than(laptop) {
        text-align: center;
        font-size: 40px;
        margin-bottom: 25px;
        margin-top: 25px;
      }
    }
    p {
      font-size: 20px;
      width: 100%;
      line-height: 20px;
      color: #eaf1f5;
    }

    ul {
      width: 100%;
      margin-left: 40px;
      margin-top: 40px;
      line-height: 1.25;
      font-weight: 700;
      @include less-than(laptop) {
        margin-left: 0px;
        margin-top: 40px;
        padding-left: 45px;
      }
    }

    li {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      list-style: none;
      display: flex;
      align-items: center;
      position: relative;
      color: #fff;
      &::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 12px;
        left: -40px;
        background: url(../../static/home/list-type.png) no-repeat;
        background-size: cover;
      }
      @include less-than(laptop) {
        font-size: 20px;
      }
    }
  }

  &-menu {
    width: 100%;
    height: 100%;
    // padding: 20px 0;
    background-color: #02405b;
    color: #fff;
  }
  &-menu__wrapper {
    display: flex;
    justify-content: space-between;
    @include less-than(laptop) {
      flex-direction: column;
      padding: 0;
    }
  }
  &-menu__item {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  &-menu__item--active {
    border-bottom: 3px solid #179dff;
    color: #fff;
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
    padding-right: 40px;
    @include less-than(laptop) {
      padding-right: 0px;
    }
    h2 {
      font-weight: 800;
      color: #044e6e;
    }
  }
  &-info__card {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    height: 800px;
    box-shadow: 1px 1.732px 10px 0px rgb(0 0 0 / 5%);
    background: white;
  }

  &-files {
    flex: 50%;
    @include less-than(laptop) {
      flex: 100%;
      margin-top: 40px;
      margin-bottom: 20px;
    }
  }
  &-files__sticky {
    position: sticky;
    top: 70px;
  }
  &-file {
    padding: 16px 0px;
    color: #02405b;
    font-weight: 800;
    * {
      margin-bottom: 10px;
    }
    ul {
      margin-top: 20px;
    }
    li {
      margin-bottom: 0px;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      list-style: none;
    }
  }
}
</style>
