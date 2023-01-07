<template>
  <div class="t-input">
    <input :placeholder="placeholder" v-model="inner_value" />
    <i v-if="inner_value.length" @click="handleClear()" class="bx bx-x"></i>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: "",
    },
    placeholder: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      inner_value: this.value,
    };
  },
  watch: {
    inner_value() {
      this.$emit("input", this.inner_value);
    },
    value() {
      this.inner_value = this.value;
    },
  },
  methods: {
    handleClear() {
      this.inner_value = "";
      this.$emit("input", this.inner_value);
    },
  },
};
</script>

<style lang="scss" scoped>
.t-input {
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(107, 119, 154, 0.05);
  border-radius: 12px;
  font-size: 0.84rem;
  input {
    color: #5b7fff;
    width: 100%;
    background: rgb(244, 247, 248);
  }
  i {
    cursor: pointer;
    padding: 5px;
    transition: all ease 0.3s;
  }
}
</style>
