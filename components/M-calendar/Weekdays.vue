<template>
  <ol class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ol>
</template>

<script>
export default {
  name: "CalendarWeekdays",

  computed: {
    weekdays() {
        let localeName = "ru"; let weekday = "short"
        const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
        return [...Array(7).keys()].map((day) =>
          format(new Date(Date.UTC(2021, 5, day)))
        );
    },
  },
};
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: center;
  /* padding-right: 5px; */
}
</style>
