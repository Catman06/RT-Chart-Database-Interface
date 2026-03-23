<script setup lang="ts">
import { ref } from 'vue';

// Character Variables
const wounds = ref(0);
const critical = ref(0);
const maxWounds = ref(0);
const tb = ref(0);
const armor = ref({ head: 0, arms: 0, body: 0, legs: 0 });

// Damage Variables
const damage = ref(0);
const penetration = ref(0);

function dealDamage(location: string) {
  // Get the armor at the location hit
  let localArmor = 0;
  switch (location) {
    case "head":
      localArmor = armor.value.head;
      break;
    case "arms":
      localArmor = armor.value.arms;
      break;
    case "body":
      localArmor = armor.value.body;
      break;
    case "legs":
      localArmor = armor.value.legs;
      break;
  }

  // Calculate armor after penetration is applied
  let appliedArmor = localArmor - penetration.value;
  appliedArmor = (appliedArmor < 0) ? 0 : appliedArmor;

  // Calculate final damage dealt
  let damageDealt = damage.value - tb.value - appliedArmor;
  damageDealt = (damageDealt < 0) ? 0 : appliedArmor;

  // Calculate new wounds
  wounds.value += damageDealt;

  // Calculate new critical
  if (wounds.value > maxWounds.value) {
    critical.value += wounds.value - maxWounds.value;
    wounds.value = maxWounds.value;
  }
}
</script>

<template>
  <div id="loginText">
    <p>// IDENTITY VERIFIED</p>
    <p>// DAMAGE CALCULATOR ACCESS GRANTED</p>
  </div>
  <form id="characterInput">
    <div class="numInput">
      <label for=wounds>Current Wounds</label>
      <input v-model="wounds" name="wounds" id="woundInput">
    </div>
    <div class="numInput">
      <label for=critical>Critical Damage</label>
      <input v-model="critical" name="critical" id="criticalInput">
    </div>
    <div class="numInput">
      <label for=maxWounds>Max Wounds</label>
      <input v-model="maxWounds" name="maxWounds" id="maxWoundInput">
    </div>
    <div class="numInput">
      <label for=tb>Toughness Bonus</label>
      <input v-model="tb" name="tb" id="tbInput">
    </div>
    <div class="armorInput">
      <label for=head>Head AP</label>
      <input v-model="armor.head" name="head" id="headAP">
      <label for=arms>Arms AP</label>
      <input v-model="armor.arms" name="arms" id="armsAP">
      <label for=body>Body AP</label>
      <input v-model="armor.body" name="body" id="bodyAP">
      <label for=legs>Legs AP</label>
      <input v-model="armor.legs" name="legs" id="legsAP">
    </div>
  </form>
  <form id="damageInput">
    <div class="numInput">
      <label for=damage>Damage Dealt</label>
      <input v-model="damage" name="damage" id="damageInput">
    </div>
    <div class="numInput">
      <label for=penetration>Current Wounds</label>
      <input v-model="penetration" name="penetration" id="penetrationInput">
    </div>
  </form>
  <button @click="dealDamage('head')">Damage Head</button>
  <button @click="dealDamage('arms')">Damage Arms</button>
  <button @click="dealDamage('body')">Damage Arms</button>
  <button @click="dealDamage('legs')">Damage Legs</button>
</template>

<style scoped>
form {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  margin-top: 4rem;
}
</style>
