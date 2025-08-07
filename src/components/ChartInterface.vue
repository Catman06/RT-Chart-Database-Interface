<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartDisplay from '../components/ChartDisplay.vue';
import NewChart from '../components/NewChart.vue';

const locations = ref();
const options = ref();
const charts = ref();
const showNew = ref(false);

let form;
let startField: HTMLInputElement | null;
let endField: HTMLInputElement | null;

let showNewButton: boolean = false;

async function getLocations() {
  return (await fetch("https://zipperserver.duckdns.org/php/chartGetLocations.php")).json();
}
async function getStarts(end: string) {
  return (await fetch(`https://zipperserver.duckdns.org/php/chartGetPossibleConnections.php?dir=to&location=${end}`)).json();
}
async function getEndpoints(start: string) {
  return (await fetch(`https://zipperserver.duckdns.org/php/chartGetPossibleConnections.php?dir=from&location=${start}`)).json();
}
async function getChart(start: string, end: string) {
  return (await fetch(`https://zipperserver.duckdns.org/php/chartGetChart.php?start=${start}&endpoint=${end}`)).json();
}

onMounted(async () => {
  let response = await getLocations();
  locations.value = response;

  form = document.querySelector('form');
  startField = document.querySelector("#startInput");
  endField = document.querySelector("#endInput");
  
  // When startInput is focused, get the possible connections to display
  startField?.addEventListener('focus', async function(_event) {
    // If the field has a value, get and show the possible connections for it
    // If the field is empty, show all locations as suggestions
    if (endField ? endField.value : false) {
      options.value = await getStarts(endField?.value ? endField.value : "");
    } else {
      options.value = locations.value;
    }
  })

  // When endInput is focused, get the possible connections to display
  endField?.addEventListener('focus', async function(_event) {
    // If the field has a value, get and show the possible connections for it
    // If the field is empty, show all locations as suggestions
    if (startField ? startField.value : false) {
      options.value = await getEndpoints(startField?.value ? startField.value : "");
    } else {
      options.value = locations.value;
    }
  })

  // When the 'Get Chart' button is pressed, try to get the requested chart(s)
  form?.addEventListener('submit', async function(event) {
    event.preventDefault();

    charts.value = await getChart(startField?.value ? startField.value : "", endField?.value ? endField.value : "");

    // If an empty array is returned, then no charts were found
    // if both a start and endpoint were provided, but no charts were found, show the button to make a new chart
    if ((startField ? startField.value : false) && (endField ? endField.value : false) && (charts.value.length == 0)) {
      showNewButton = true;
    } else {
      showNewButton = false;
    }
  })
})

</script>

<template>
  <form id="locationInput">
    <div class="locationInput">
      <label for=start>Starting Location</label>
      <input list="starts" name="start" id="startInput" autocomplete="off">
      <datalist id="starts">
        <option v-for="place in options" :value="place" />
      </datalist>
    </div>
    <div class="locationInput">
      <label for=start>Ending Location</label>
      <input list="ends" name="end" id="endInput" autocomplete="off">
      <datalist id="ends">
        <option v-for="place in options" :value="place" />
      </datalist>
    </div>
  </form>
  <button type="submit" form="locationInput">Get Charts</button>
  <button type="button" v-if="showNewButton" @click="showNew = true">Make New Chart</button>

  <NewChart v-if="showNew" :start="startField?.value" :end="endField?.value" @closeModal="showNew = false; showNewButton = false"/>
  <ChartDisplay v-for="chart in charts" :chartIn="chart" />
</template>

<style scoped>
  form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 3rem;
  }

  .locationInput {
    margin: 0rem 2rem 0rem 2rem;
  }
</style>
