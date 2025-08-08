<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import ChartInterface from './components/ChartInterface.vue';
import LandingPage from './components/LandingPage.vue';
import ArchivePage from './components/ArchivePage.vue';

onMounted(async () => {
  // Hide the praise of the machine god once the page fully loads
  let praiseElement = document.getElementById("praise");
  praiseElement ? praiseElement.hidden = true : false;
})

const tab: Ref<number, number> = ref(0);
const tabs: HTMLCollectionOf<Element> = document.getElementsByClassName("navTabs")

function switchTab(num: number) {
  tab.value = num;
  for (let index = 0; index < tabs.length; index++) {
    const tab = tabs[index];
    if (index == num) {
      tab.classList.add("pressed");
    } else {
      tab.classList.remove("pressed");
    }
  }
}
</script>

<template>
  <div id="content">
    <LandingPage v-if="tab == 0" />
    <ChartInterface v-else-if="tab == 1" />
    <ArchivePage v-else-if="tab == 2" />
  </div>

  <div id="navbar">
    <img src="/src/assets/Valentine Coat of Arms Logo.svg" />
    <div id="navTabHolder">
      <p class="navTabs" @click="switchTab(0)">Home</p>
      <p class="navTabs" @click="switchTab(1)">Charts</p>
      <p class="navTabs" @click="switchTab(2)">Archive</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Libertinus+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
#navbar {
  --navbar_color: #525148;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: var(--navbar_color);
  border: .4rem outset #68675c;
  border-bottom-style: none;
  width: calc(100% - .8rem);
  height: 4rem;

  & img {
    margin-right: auto;
    padding: .40rem;
  }
}
#navTabHolder {
  display: flex;
  justify-content: center;
  border: .2rem inset #68675c;
  margin: auto;
}
.navTabs {
  --tab_color: #aa9f73;
  --tab_border: #c4b16d;
  font-family: "Libertinus Serif", sans-serif;
  font-weight: 700;
  line-height: normal;
  color: #000000d0;
  background-color: var(--tab_color);
  border: .3rem outset var(--tab_border);
  margin: 0;
  padding: .5rem;
  cursor: pointer;
}
.navTabs:hover {
  background-color: lch(from var(--tab_color) calc(l + 10) c h);
  border-color: lch(from var(--tab_border) calc(l + 5) c h);
}
.navTabs:active {
  background-color: lch(from var(--tab_color) calc(l - 15) c h);
  border-color: lch(from var(--tab_border) calc(l - 20) c h);
}
.navTabs.pressed {
  background-color: lch(from var(--tab_color) calc(l - 10) c h);
  border-color: lch(from var(--tab_border) calc(l - 15) c h);
}
</style>