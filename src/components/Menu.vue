<template>
  <v-card class="menu d-flex-column align-center" @click="toggle">
    <v-card-text>
      <p class="text-h5 text--primary mb-3">
        {{ year }}년 {{ month }}월 {{ day }}일 메뉴
      </p>
    </v-card-text>
    <v-card-text v-if="show">
      <p class="text-h6 text--primary">
        아침
      </p>
      <v-list :items="breakfast" class="mb-2"></v-list>
      <p class="text-h6 text--primary">
        점심
      </p>
      <v-list :items="lunch" class="mb-2"></v-list>
      <p class="text-h6 text--primary">
        저녁
      </p>
      <v-list :items="dinner" class="mb-2"></v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    year: Number,
    month: Number,
    day: Number,
    breakfast: Array,
    lunch: Array,
    dinner: Array
  }
})
export default class Menu extends Vue {
  year!: number;
  month!: number;
  day!: number;

  breakfast!: string[];
  lunch!: string[];
  dinner!: string[];

  show = true;

  toggle() {
    this.show = !this.show;
  }
}
</script>

<style scoped>
</style>
