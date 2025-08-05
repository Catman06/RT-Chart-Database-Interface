<script setup lang="ts">
import { onMounted, ref } from 'vue';

const locations = ref();
const startOptions = ref();
const endOptions = ref();

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
  console.log(response);
  locations.value = response;

  form = document.querySelector('form');
  startField = document.querySelector("#startInput");
  endField = document.querySelector("#endInput");
  
  console.log(document.querySelector("form"));
  startField?.addEventListener('focus', async function(_event) {
    // If the field has a value, get and show the possible connections for it
    // If the field is empty, show all locations as suggestions
    if (endField ? endField.value : "" != "") {
      startOptions.value = await getStarts(endField?.value ? endField.value : "");
    } else {
      startOptions.value = locations.value;
    }
  })
  endField?.addEventListener('focus', async function(_event) {
    // If the field has a value, get and show the possible connections for it
    // If the field is empty, show all locations as suggestions
    if (startField ? startField.value : "" != "") {
      endOptions.value = await getEndpoints(startField?.value ? startField.value : "");
    } else {
      endOptions.value = locations.value;
    }
  })
  
  form?.addEventListener('submit', function(event) {
    event.preventDefault();
  })
})
</script>

<template>
  <div>
    <form>
      <label for=start>Starting Location</label>
      <input list="starts" name="start" id="startInput" autocomplete="off">
      <datalist id="starts">
        <option v-for="place in startOptions" :value="place" />
      </datalist>

      <label for=start>Ending Location</label>
      <input list="ends" name="end" id="endInput" autocomplete="off">
      <datalist id="ends">
        <option v-for="place in endOptions" :value="place" />
      </datalist>

      <input type="submit" value="Get Chart"></input>
    </form>
  </div>
</template>

<style scoped>

</style>
