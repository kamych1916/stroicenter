<template>
  <div class="m-navbar">
    <div class="m-navbar__wrapper">
      <nuxt-link to="/" class="m-navbar__link">
        <i class="bx bx-home"></i>
      </nuxt-link>
      <slot></slot>
      <!-- <div class="m-navbar__link">
        <i class="bx bx-globe"></i>
      </div> -->
      <a href="tel:+992918622774" class="m-navbar__link">
        <i class="bx bx-phone"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.m-navbar {
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  @include more-than(tablet){
    display: none;
  }

  &__wrapper {
    width: fit-content;
    min-width: 40%;
    max-width: 80%;
    background: #fff;
    box-shadow: 0px -5px 56px 1px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    padding: 12px 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    font-size: 22px;
    position: relative;
    &::after{
      content: " ";
      width: 100vw;
      height: 90px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 70%);
      opacity: 0.3;
      position: absolute;
      bottom: -20px;
      z-index: -1;
    }

    a.nuxt-link-exact-active {
      color: #0c63e4;
    }
  }

  &__link {
    padding: 0 25px;
    // color: #d8d8d8;
    color: #0c62e4de;
  }
}
</style>
