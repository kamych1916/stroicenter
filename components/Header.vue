<template>
  <header class="header section">
    <div class="header-wrapper">
      <nuxt-link to="/" class="header-logo">Строй Центр</nuxt-link>
      <a href="tel:+992918622774" class="header-menu">
        <img src="/phone.svg" alt=""> 918-62-27-74
      </a>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 101;
  @include less-than(tablet) {
    display: none;
  }
  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }

  &-logo {
    font-size: 24px;
    font-weight: 600;
    color: #000;
    text-decoration: none;
    transition: all ease 0.3s;
    &:hover {
      box-shadow: 0px 4px 10px rgba(204, 204, 204, 0.154);
      transform: scale(1.03);
    }
  }
  &-menu {
    display: flex;
    color: #2B3347;
    justify-content: center;
    align-items: center;
    font-family: "Gilroy-Medium";
    font-size: 15px;
    text-decoration: none;
    img{
      width: 30px;
      margin-right: 10px;
    }
  }
  &-globe {
    cursor: pointer;
    margin-right: 20px;
  }
}
</style>
