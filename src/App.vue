<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import ChartInterface from './components/ChartInterface.vue';
import LandingPage from './components/LandingPage.vue';

onMounted(async () => {
  // Hide the praise of the machine god once the page fully loads
  let praiseElement = document.getElementById("praise");
  praiseElement ? praiseElement.hidden = true : false;
})

const tab: Ref<number, number> = ref(0);

function switchTab(num: number) {
  tab.value = num;
}
</script>

<template>
  <div id="content">
    <LandingPage v-if="tab == 0" />
    <ChartInterface v-else-if="tab == 1" />
  </div>

  <div id="navbar">
    <p class="navTabs" @click="switchTab(0)">Home</p>
    <p class="navTabs" @click="switchTab(1)">Charts</p>
  </div>
</template>

<style lang="css" scoped>
#navbar {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  background-color: var(--frame_color);
  width: 50vw;
  list-style-type: none;
  border-radius: 1rem 1rem 0rem 0rem;
}
.navTabs {
  background-color: var(--light_background);
  padding: .5rem;
}
.navTabs:hover {
  background-color: var(--lighter_background);
}
</style>