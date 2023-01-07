<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <span> {{ selectedDate.format("MMMM") }}, </span>
      <span>
        {{ selectedDate.add(1, "month").format("MMMM") }}
      </span>
    </div>

    <M-CalendarWeekdays />

    <ol class="days-grid">
      <li
        v-for="day in days"
        :key="day.date"
        class="calendar-day"
        :class="{
          'calendar-day--not-current': !day.isCurrentMonth,
          'calendar-day--today': day.date === today,
          'calendar-day--selected': day.selected,
        }"
        @click="selectDay(day)"
      >
        <span>{{ getDayLabel(day) }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";

import ru from "dayjs/locale/ru";
dayjs.locale({ ...ru, weekStart: 7 });

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  props: {
    value: {
      default: Array,
    },
  },
  data() {
    return {
      selectedDate: dayjs(),
      days: [],
      selectedDays: this.value,
    };
  },

  computed: {
    today() {
      // return dayjs("2022-12-06").format("YYYY-MM-DD");
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      let today = parseInt(dayjs().format("D"));
      return [...Array(this.numberOfDaysInMonth)]
        .map((_, index) => {
          if (index > today - 2) {
            return {
              date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
                "YYYY-MM-DD"
              ),
              isCurrentMonth: true,
              selected: false,
            };
          }
        })
        .filter((notUndefined) => notUndefined !== undefined);
    },

    nextMonthDays() {
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");

      const visibleNumberOfDaysFromNextMonth =
        dayjs(nextMonth).daysInMonth() - this.currentMonthDays.length;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: true,
          selected: false,
        };
      });
    },

    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );

      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        "month"
      );
      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false,
            selected: false,
          };
        }
      );
    },
  },

  mounted() {
    this.days = [
      ...this.previousMonthDays,
      ...this.currentMonthDays,
      ...this.nextMonthDays,
    ];
    
    this.days.forEach((inner_el) => {
      this.value.forEach((outter_el) => {
        if (inner_el.date === outter_el) {
          inner_el.selected = !inner_el.selected;
        }
      });
    });
  },

  methods: {
    getDayLabel(day) {
      return dayjs(day.date).format("D");
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDay(day) {
      if (day.isCurrentMonth) {
        let isSelected = true;

        this.days.forEach((el) => {
          if (el.date === day.date) {
            this.value.forEach((outter_el) => {
              if (day.date === outter_el) {
                el.selected = false;
                isSelected = false;
              } else {
                el.selected = !day.selected;
              }
            });
          }
        });

        if (isSelected) {
          this.selectedDays.push(day.date);
        } else {
          this.selectedDays = this.selectedDays.filter((el) => {
            return day.date !== el;
          });
        }

        this.$emit("input", this.selectedDays);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.calendar-month {
  position: relative;
}

.calendar-month-header {
  display: flex;
  background-color: #fff;
  padding: 5px 10px;
  text-transform: capitalize;
  span {
    color: var(--grey-800);
    padding-right: 10px;
  }
}
.calendar-month-header--selected {
  color: var(--grey-800) !important;
  text-decoration-line: underline;
  text-underline-offset: 3px;
}

.day-of-week {
  color: var(--grey-800);
  background-color: #fff;
  padding-bottom: 5px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.days-grid {
  height: 100%;
  position: relative;
}

.calendar-day {
  position: relative;
  background-color: #fff;
  color: var(--grey-800);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  &:hover {
    span {
      background-color: #5b7fff;
      color: #fff;
    }
  }
  &:active {
    span {
      transform: scale(0.8);
    }
  }
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 100%;
  padding-top: 3px;
  width: 24px;
  height: 24px;
  transition: all ease 0.3s;
  cursor: pointer;
}

.calendar-day--not-current {
  color: #ccc;
  cursor: not-allowed !important;
  span {
    cursor: not-allowed !important;
  }
  &:hover {
    span {
      background-color: #fff;
      color: #ccc;
    }
  }
  &:active {
    span {
      transform: scale(1);
    }
  }
}

.calendar-day--today {
}

.calendar-day--today > span {
  color: #000;
  border: 1px solid #5b7fff;
  border-radius: 100%;
}
.calendar-day--selected {
  span {
    background-color: #5b7fff;
    color: #fff;
  }
}
</style>
