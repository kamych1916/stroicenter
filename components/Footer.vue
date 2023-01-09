<template>
  <footer class="footer-background">
    <div class="section footer-wrapper">
      <div class="footer-logo">
        <span> Стройцентр </span>
        <p>Производство и продажа сухих строительных смесей</p>
      </div>
      <div class="footer-info">
        <span>Появились вопросы? Звоните! </span>
        <a href="tel:+992918622774"> <i class="bx bx-phone"></i> 918-62-27-74</a>
        <span><i class='bx bx-time'></i> Ежедневно с 8:00 до 20:00</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  &-background {
    width: 100%;
    height: 100%;
    padding: 30px 0;
    background-color: #1f6e8f;
    color: #fff;
    @include less-than(laptop) {
      margin-bottom: 50px;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: space-between;
    @include less-than(laptop) {
      flex-direction: column;
    }
  }
  &-logo {
    span {
      display: block;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
  &-info {
    @include less-than(laptop) {
     margin-top: 40px;
    }
    > *{
        display: block;
        text-decoration: none;
        color: #fff;
        margin-bottom: 10px;
    }
  }
}
</style>
