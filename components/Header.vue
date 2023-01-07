<template>
  <div class="header section">
    <div class="header-wrapper">
      <nuxt-link to="/" class="header-logo">Стройцентр</nuxt-link>
      <div class="header-menu">
        <i class="bx bx-globe"></i>
        <i class="bx bx-phone"></i>
      </div>
    </div>
  </div>
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
    padding: 10px 0;
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
    font-size: 28px;
    color: #044e6e;
    i {
      transition: all ease 0.3s;
      cursor: pointer;
      &:hover {
        text-shadow: 0px 4px 10px rgb(194, 194, 194);
        transform: scale(1.03);
      }
      &:nth-last-child(1){
        margin-left: 20px;
      }
    }
  }
  &-globe {
    cursor: pointer;
    margin-right: 20px;
  }
}
</style>
