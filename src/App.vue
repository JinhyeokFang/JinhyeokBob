<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <div class="d-flex align-center ml-6">
        <h1>밥</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main
      id="content"
      class="d-flex flex-column align-center mt-8"
    >
      <v-spacer>
      </v-spacer>
      <Menu v-for="(menu, index) in menus" :key="index" :year="menu.year" :month="menu.month" :day="menu.day" :breakfast="menu.breakfast" :lunch="menu.lunch" :dinner="menu.dinner" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Menu from './components/Menu.vue'
import MealApi from './api/meal'
import dayjs from 'dayjs'

interface DayMenu {
  year: number;
  month: number;
  day: number;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

@Options({
  components: {
    Menu
  }
})
export default class App extends Vue {
  private menus: DayMenu[] = [];

  async mounted() {
    // const request = await MealApi.getMenu(2022, 9, 18)
    // console.dir(request.data.breakfast)
    const currentYear = dayjs().get('year')
    const currentMonth = dayjs().get('month') + 1
    const currentDay = dayjs().get('date')
    const lastDayOfMonth = dayjs().endOf('month').get('date')
    console.log(currentYear, currentMonth, currentDay, lastDayOfMonth)
    for (let d = currentDay; d <= lastDayOfMonth; d++) {
      const request = await MealApi.getMenu(currentYear, currentMonth, d)
      this.menus.push({
        year: currentYear,
        month: currentMonth,
        day: d,
        breakfast: request.data.breakfast,
        lunch: request.data.lunch,
        dinner: request.data.dinner
      })
    }
  }
}
</script>

<style>
</style>
