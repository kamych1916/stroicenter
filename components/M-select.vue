<template>
  <div class="tselect" v-click-outside="focusOutDropDown">
    <div @click="focusSelect()" class="tselect-wrapper">
      <div v-if="multiple" class="tselect-wrapper__multiple">
        <span v-if="inner_value.length"> +{{ inner_value.length }} </span>
        <input
          type="text"
          ref="selectInput"
          v-model="searchValue"
          :placeholder="placeholder"
          @input="handleSearch()"
        />
      </div>

      <div
        v-if="single && select_value(inner_value)"
        class="tselect-wrapper__single"
      >
        {{ select_value(inner_value) }}
      </div>
      <div
        v-else-if="single && !select_value(inner_value)"
        class="tselect-wrapper__single--placeholder"
      >
        {{ placeholder }}
      </div>

      <div v-else-if="calendar" class="tselect-wrapper__calendar">
        <span v-if="inner_value.length"> +{{ inner_value.length }} </span>
        <div class="tselect-wrapper__calendar-placeholder">
          Дата консультации
        </div>
      </div>

      <i
        v-if="(multiple || calendar) && (searchValue || inner_value.length)"
        @click.stop="handleClear()"
        class="bx bx-x"
      ></i>
      <i
        :class="[
          isDropDown ? 'tselect-wrapper__arrow-rotate' : null,
          'bx',
          'bx-chevron-down',
        ]"
      ></i>
    </div>
    <transition name="fade">
      <div v-if="isDropDown" class="tselect-dropdown">
        <div v-if="inner_data.length">
          <div
            v-if="multiple"
            v-for="response in inner_data"
            class="tselect-dropdown__radio"
          >
            <input
              type="checkbox"
              :value="response.value"
              v-model="inner_value"
              :id="response.value"
            />
            <label :for="response.value">{{ response.label }}</label>
          </div>
          <div
            v-if="single"
            v-for="response in inner_data"
            @click="inner_value = response.value"
            class="tselect-dropdown__radio"
          >
            <span>{{ response.label }}</span>
          </div>
        </div>
        <div v-else-if="calendar">
          <M-calendar v-model="inner_value" />
        </div>
        <div v-else style="padding: 10px; text-align: center">
          <small> Ничего не найдено </small>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    single: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    calendar: {
      type: Boolean,
      default: false,
    },
    value: {
      default: "",
    },
    data: {
      type: Array,
      default: Array,
    },
  },
  data() {
    return {
      searchValue: null,

      isDropDown: false,

      inner_value: this.value,
      inner_data: this.data,
      store_data: this.data,
    };
  },
  computed: {
    select_value() {
      // Выбираем какой label выводить взависимости от value
      return (value) => {
        let select = null;
        this.store_data.forEach((el) => {
          if (el.value === value) {
            select = el.label;
          }
        });
        return select;
      };
    },
  },
  watch: {
    inner_value() {
      setTimeout(() => {
        this.isDropDown = false;
      }, 100);
      this.$emit("input", this.inner_value);
    },
    value() {
      this.inner_value = this.value;
    },
  },
  methods: {
    handleSearch() {
      this.isDropDown = true;
      if (this.searchValue.length > 0) {
        this.inner_data = this.store_data.filter((value) => {
          return value.label
            .toLowerCase()
            .includes(this.searchValue.toLowerCase());
        });
      } else {
        this.inner_data = this.store_data;
      }
    },
    focusSelect() {
      if (this.multiple) {
        this.$refs.selectInput.focus();
      }
      this.isDropDown = !this.isDropDown;
    },
    focusOutDropDown() {
      this.isDropDown = false;
    },
    handleClear() {
      this.isDropDown = false;
      this.searchValue = null;
      this.inner_data = this.store_data;
      if (this.multiple) {
        this.inner_value = [];
      }
      if (this.single) {
        this.inner_value = "";
      }
      if (this.calendar) {
        this.inner_value = [];
      }
      this.$emit("input", this.inner_value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tselect {
  position: relative;
  transition: all ease 0.6s;

  &-wrapper {
    transition: all ease 0.6s;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 12px;
    position: relative;
    height: 100%;
    z-index: 5;
    background: rgb(244, 247, 248);
    font-size: 0.84rem;
    i {
      cursor: pointer;
      padding: 5px;
      transition: all ease 0.3s;
    }
    span {
      height: auto;
      z-index: 6;
      background: #fff;
      border-radius: 10px;
      padding: 0px 6px;
      margin: 2px auto;
      margin-right: 0;
      margin-left: 5px;
      font-size: 0.84rem;
      border: 2px solid rgba(244, 247, 248, 1);
    }
  }
  &-wrapper__multiple {
    display: flex;
    align-items: center;
    width: 100%;

    input {
      color: #5b7fff;
      width: 100%;
      padding: 10px;
      background: rgb(244, 247, 248);
      border: 0px solid transparent;
      border-bottom-left-radius: 12px;
      border-top-left-radius: 12px;
      transition: all ease 0.6s;
    }
  }
  &-wrapper__single,
  &-wrapper__single--placeholder {
    color: #5b7fff;
    display: block;
    padding: 10px;
    width: 100%;
  }
  &-wrapper__single--placeholder {
    color: rgb(117 117 118);
  }
  &-wrapper__calendar {
    display: flex;
    align-items: center;
    width: 100%;
    color: rgb(117 117 118);
  }
  &-wrapper__calendar-placeholder {
    padding: 10px;
  }
  &-wrapper__arrow-rotate {
    transform: rotate(180deg);
  }

  &-dropdown {
    position: absolute;
    z-index: 999;
    overflow: auto;
    overflow-x: hidden;
    width: 100%;
    height: fit-content;
    max-height: 200px;
    box-shadow: 0 5px 15px rgba(204, 204, 204, 0.447);
    background: #fff;
    border-radius: 12px;
    margin-top: 5px;
    font-size: 0.84rem;
  }
  &-dropdown__radio {
    cursor: pointer;
    width: 100%;
    padding: 0 10px;
    transition: all ease 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      color: #5b7fff;
    }

    label {
      padding: 10px 0;
      width: 100%;
      display: block;
      cursor: pointer;
      margin-left: 10px;
    }

    span {
      padding: 10px 0;
      width: 100%;
      display: block;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .fade-enter-active {
    animation: fade 0.2s;
  }
  .fade-leave-active {
    animation: fade 0.2s reverse;
  }

  @keyframes fade {
    0% {
      opacity: 0;
      transform: translate3d(0, -5%, 0);
    }

    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
