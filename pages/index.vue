<template>
  <div class="section">
    <div class="home-welcome">
      <div class="home-welcome__img">
        <img src="/home/building.svg" alt="" />
      </div>
      <div class="home-welcome__description">
        <h1>Клей для плитки</h1>
        <div class="home-welcome__line"></div>
        <span>Уверенность в результате</span>
        <p>
          Плиточный клей используется для проведения работ по&nbsp;монтажу
          керамической плитки, керамогранита, <br />
          камня и&nbsp;иных материалов.
        </p>
      </div>
    </div>
    <div class="home-menu">
      <div class="home-menu__wrapper">
        <span :class="active_group.includes(1) ? 'home-menu__active' : null" @click="change_list(1)">Клеи для плитки</span>
        <span :class="active_group.includes(2) ? 'home-menu__active' : null" @click="change_list(2)">Клеи для систем утепления фасадов</span>
        <span :class="active_group.includes(3) ? 'home-menu__active' : null" @click="change_list(3)">Клеи для ячеистых блоков</span>
        <span :class="active_group.includes(4) ? 'home-menu__active' : null" @click="change_list(4)">Клеи для обоев и напольных покрытий</span>
      </div>
    </div>

    <div class="home-list">
      <div class="home-product" v-for="glue in glues" :key="glue.id">
        <span>{{ glue.name }}</span>
        <p>{{ glue.description }}</p>

        <div class="home-product__hover">
          <ul class="block3_promo_features">
            <li
              v-for="characteristic in glue.characteristics"
              :key="characteristic"
            >
              {{ characteristic }}
            </li>

            <div class="home-product__link">Подробнее</div>
          </ul>
        </div>
        <div class="home-product__img">
          <img :src="glue.img" :alt="glue.name" />
        </div>
        <div class="home-product__footer">
          {{ glue.packing }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const GLUES = [
  {
    id: 1,
    name: "НОВИНКА! MAXIFLEX",
    group: [1, 3],
    description:
      "Клей эластичный с армирующими волокнами для тяжелых плит любого формата",
    img: "/home/product-1.png",
    packing: "Фасовка: Мешок 5, 20 и 25 кг",
    characteristics: [
      "С армирующими волокнами",
      "Для внутренних и наружных работ",
      "Идеален для новостроек: выдерживает деформации и нагрузки",
      "Морозостойкость 150 циклов",
    ],
  },
  {
    id: 2,
    name: "MAXIFLEX",
    group: [2],
    description:
      "Клей эластичный с армирующими волокнами для тяжелых плит любого формата",
    img: "/home/product-2.png",
    packing: "Фасовка: Мешок 5, 20 и 25 кг",
    characteristics: [
      "С армирующими волокнами",
      "Для внутренних и наружных работ",
      "Идеален для новостроек: выдерживает деформации и нагрузки",
      "Морозостойкость 150 циклов",
    ],
  },
  {
    id: 3,
    name: "KLEBEN BLOCK",
    group: [1],
    description: "Клей для укладки ячеистых блоков",
    img: "/home/product-3.png",
    packing: "Фасовка: Мешок 5, 20 и 25 кг",
    characteristics: [
      "Высокая прочность кладки",
      "Пластичность",
      "Для внутренних и наружных работ",
      "Возможность кладки с толщиной шва 2-3 мм",
    ],
  },
  {
    id: 4,
    group: [4],
    name: "DEKO FIXER",
    description:
      "Клей эластичный с армирующими волокнами для тяжелых плит любого формата",
    img: "/home/product-4.png",
    packing: "Фасовка: Ведро: 10, 3 кг",
    characteristics: [
      "Для всех типов нетканых и виниловых обоев",
      "Без капель, пятен и брызг",
      "Высокая клеящая способность",
    ],
  },
  {
    id: 5,
    name: "BODEN FIXER",
    group: [2, 4],
    link: "/",
    description: "Клей для напольных покрытий профессиональный",
    img: "/home/product-5.png",
    packing: "Фасовка: Ведро: 10, 3 кг",
    characteristics: [
      "Влагостойкий",
      "Экологически безопасен",
      "Прочное сцепление",
    ],
  },
];
export default {
  data() {
    return {
      glues: GLUES,
      glues_store: GLUES,
      active_group: [],
    };
  },

  fetchOnServer: false,
  fetch() {},

  methods: {
    change_list(group_number) {
      if (this.active_group.includes(group_number)) {
        this.active_group.splice(this.active_group.indexOf(group_number), 1);
      } else {
        this.active_group.push(group_number);
      }
      if (this.active_group.length > 0) {
        let new_list = [];
        this.active_group.forEach((ag) => {
          this.glues = this.glues_store.filter((glue) => {
            return glue.group.includes(ag);
          });
          new_list.push(...this.glues);
        });

        this.glues = new_list;
        this.glues = this.glues.filter((item, index) => {
          return this.glues.indexOf(item) === index;
        });
      } else {
        this.glues = this.glues_store;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  &-welcome {
    margin-top: 20px;
    min-height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    @include less-than(laptop) {
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
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
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    h1 {
      @include less-than(tablet) {
        font-size: 28px;
      }
    }
    span {
      font-size: 30px;
      color: #044e6e;
      font-weight: 700;
      @include less-than(tablet) {
        font-size: 24px;
      }
    }
    p {
      margin-top: 20px;
      width: 90%;
      font-size: 18px;
      @include less-than(tablet) {
        width: 100%;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
  &-welcome__img {
    flex: 1;
    @include less-than(laptop) {
      width: 70%;
    }
  }

  &-menu {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 50px;
    z-index: 3;
    background-color: #fff;
  }
  &-menu__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    grid-gap: 20px;
    @include less-than(laptop) {
      grid-template-columns: 1fr;
    }
    span {
      transition: all ease 0.3s;
      flex: 2;
      cursor: pointer;
      color: #044e6e;
      padding: 5px 20px;
      border: 2px solid #044e6e;
      // margin: 10px;
    }
  }
  &-menu__active{
    background-color: #044e6e;
    color: #fff !important;
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top: 40px;
    padding-bottom: 80px;
    transition: all ease 0.3s;

    @include less-than(laptop) {
      grid-template-columns: 1fr;
    }
  }
  &-product {
    background-color: #f5f7fa;
    position: relative;
    transition: all ease 0.2s;
    cursor: pointer;
    min-height: 450px;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;

    &:hover {
      background-color: #044e6e;
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
          margin-top: 20px;
          line-height: 1.25;
          font-weight: 700;
        }

        li {
          margin-bottom: 10px;
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
        margin-top: 40px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    span {
      display: block;
      margin-top: 20px;
      padding: 0 20px;
      font-weight: 700;
      font-size: 22px;
      color: #044e6e;
    }
    p {
      color: #646464;
      font-size: 16px;
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
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    font-size: 16px;
    color: #646464;
    // margin-top: auto;
  }
  &-product__link {
    display: none;
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
