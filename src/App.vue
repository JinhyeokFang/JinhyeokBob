<template>
  <v-app>
    <v-app-bar
      app
      :style="{ background: '#b2af3d' }" 
    >
      <div class="d-flex align-center ml-6">
        <h1
      :style="{ color: '#fff' }" >이 달의 급식</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main
      id="content"
      class="d-flex flex-column justify-center align-center mt-8"
      :style="{ background: '#eee' }" 
    >
      <v-spacer>
      </v-spacer>
      <Clock />
      <Menu class="mt-4" v-for="menu in menus" :key="menu.day" :year="menu.year" :month="menu.month" :day="menu.day" :breakfast="menu.breakfast" :lunch="menu.lunch" :dinner="menu.dinner" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Menu from './components/Menu.vue'
import Clock from './components/Clock.vue'
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
    Menu,
    Clock
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
    const menus = this.menus;
    for (let d = currentDay; d <= lastDayOfMonth; d++) {
      const cache = window.localStorage.getItem(`${currentYear}-${currentMonth}-${d}`);
      if (cache != undefined) {
        const menu = JSON.parse(cache) as unknown;
        menus.push(menu as DayMenu);
        continue;
      }
      MealApi.getMenu(currentYear, currentMonth, d).then(function(result) {
        const data = result.data.menus;
        menus.push({
          year: currentYear,
          month: currentMonth,
          day: d,
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner
        });
        window.localStorage.setItem(`${currentYear}-${currentMonth}-${d}`,JSON.stringify(menus[menus.length - 1]));
        menus.sort((a, b) => a.day - b.day);
      });
    }

    let letters = ['*', '*', '*', '*', '*', '급', '식', ' ', '메', '뉴', '*', '*', '*', '*', '*'];
    setInterval(() => {
      window.document.title = letters.join('');
      letters.push(letters.splice(0, 1)[0]);
    }, 1000);
  }
}
</script>

<style>
  #content {
    background: '#aaa';
  }
</style>
