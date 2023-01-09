<template>
  <div v-if="product">
    <div class="product-background">
      <div class="section">
        <div class="product-welcome">
          <div class="product-img">
            <img :src="product.product_img" />
          </div>

          <div class="product-about">
            <h1>{{ product.name }}</h1>

            <p v-html="product.description"></p>

            <ul>
              <li v-for="item in product.items" :key="item" v-html="item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="product-packing">
      {{ product.packing }}
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
              <i class="bx bx-download"></i> скачать карточку товара
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

  fetchOnServer: false,
  fetch() {
    this.$store.state.products.glues.forEach((glue) => {
      if (glue.link == this.$route.params.id) {
        this.product = glue;
      }
    });
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.product {
  &-background {
    width: 100%;
    height: 100%;
    background-color: #1f6e8f;
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
    img {
      width: 80%;
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

  &-packing {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #02405b;
    color: #fff;
    text-align: center;
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
    flex: 25%;
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
    border-bottom: 1px solid #ccc;
    color: #02405b;
    font-weight: 800;
    display: flex;
    align-items: center;
    @include less-than(laptop) {
      text-align: center;
      justify-content: center;
    }
    i {
      color: #64b3f9;
      font-size: 20px;
      line-height: 16px;
      padding-right: 5px;
      @include less-than(laptop) {
        padding-right: 10px;
      }
    }
  }
}
</style>
