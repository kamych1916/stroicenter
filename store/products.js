export const state = () => ({
  glues: [
    {
      id: 1,
      name: "НОВИНКА! MAXIFLEX",
      link: "new_maxiflex",
      group: [1, 3],
      description:
        "Клей эластичный с армирующими волокнами для тяжелых плит любого формата",
      img: "/home/product-1.png",
      product_img: "/product/product-1.png",
      packing: "Фасовка: Мешок 5, 20 и 25 кг",
      items: [
        "С армирующими волокнами",
        "Для внутренних и наружных работ",
        "Идеален для новостроек: выдерживает деформации и&nbsp;нагрузки",
        "Морозостойкость 150 циклов",
      ],
    },
    {
      id: 2,
      name: "KLEBEN BLOCK",
      link: "kleben_block",
      group: [2],
      description: "Клей для укладки ячеистых блоков",
      img: "/home/product-2.png",
      product_img: "/product/product-1.png",
      packing: "Фасовка: Мешок 5, 20 и 25 кг",
      items: [
        "Высокая прочность кладки",
        "Пластичность",
        "Для внутренних и наружных работ",
        "Возможность кладки с толщиной шва 2-3 мм",
      ],
    },
    {
      id: 3,
      name: "ISOFIX",
      link: "kleben_block",
      group: [1],
      description: "Клей для пенополистирола, минваты и&nbsp;нанесения армирующего слоя",
      img: "/home/product-3.png",
      product_img: "/product/product-3.png",
      packing: "Фасовка: Мешок 5, 20 и 25 кг",
      items: [
        "Для систем утепления фасадов",
        "Два в одном: клей и состав армирующий",
        "Ударопрочный и паропроницаемый",
        "Морозо- и атмосферостойкий",
      ],
    },
    {
      id: 4,
      group: [4],
      name: "DEKO FIXER",
      link: "deko_fixer",
      description:
        "Клей эластичный с армирующими волокнами для тяжелых плит любого формата",
      img: "/home/product-4.png",
      product_img: "/product/product-4.png",
      packing: "Фасовка: Ведро: 10, 3 кг",
      items: [
        "Для всех типов нетканых и виниловых обоев",
        "Без капель, пятен и брызг",
        "Высокая клеящая способность",
      ],
    },
    {
      id: 5,
      name: "BODEN FIXER",
      link: "boden_fixer",
      group: [2, 4],
      description: "Клей для напольных покрытий профессиональный",
      img: "/home/product-5.png",
      product_img: "/product/product-5.png",
      packing: "Фасовка: Ведро: 10, 5 кг",
      items: [
        "Влагостойкий",
        "Экологически безопасен",
        "Прочное сцепление",
      ],
    },
  ],
});

export const getters = {
  getCounter(state) {
    return state.counter;
  },
};
