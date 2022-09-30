<template>
  <v-card class="menu d-flex align-center">
    <v-card-text>
      <p class="text-h5 text--primary mb-3">
        D-{{ day }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import dayjs from 'dayjs';

@Options({
})
export default class Clock extends Vue {
  public day = 0;

  mounted() {
    const date1 = dayjs('2023-08-06')
    this.day = date1.diff(dayjs(), 'day', true)
  }
}
</script>

<style scoped>
</style>
