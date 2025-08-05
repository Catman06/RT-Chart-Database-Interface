<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartDisplay from './components/ChartDisplay.vue';

const locations = ref();
const options = ref();
const charts = ref();

let form;
let startField: HTMLInputElement | null;
let endField: HTMLInputElement | null;

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
    if (endField ? endField.value : "" != "") {
      options.value = await getStarts(endField?.value ? endField.value : "");
    } else {
      options.value = locations.value;
    }
  })

  // When endInput is focused, get the possible connections to display
  endField?.addEventListener('focus', async function(_event) {
    // If the field has a value, get and show the possible connections for it
    // If the field is empty, show all locations as suggestions
    if (startField ? startField.value : "" != "") {
      options.value = await getEndpoints(startField?.value ? startField.value : "");
    } else {
      options.value = locations.value;
    }
  })

  // When the 'Get Chart' button is pressed, try to get the requested chart
  form?.addEventListener('submit', async function(event) {
    event.preventDefault();

    charts.value = await getChart(startField?.value ? startField.value : "", endField?.value ? endField.value : "");
  })
})
</script>

<template>
    <form>
      <label for=start>Starting Location</label>
      <input list="starts" name="start" id="startInput" autocomplete="off">
      <datalist id="starts">
        <option v-for="place in options" :value="place" />
      </datalist>

      <label for=start>Ending Location</label>
      <input list="ends" name="end" id="endInput" autocomplete="off">
      <datalist id="ends">
        <option v-for="place in options" :value="place" />
      </datalist>

      <input type="submit" value="Get Chart"></input>
    </form>

    <ChartDisplay v-for="chart in charts" :chartIn="chart" :list="options" />
</template>

<style scoped>

</style>
