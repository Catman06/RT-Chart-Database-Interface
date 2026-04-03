<script setup lang="ts">
import { ref } from "vue";

// Character Variables
const wounds = ref(0);
const critical = ref(0);
const maxWounds = ref(0);
const tb = ref(0);
const armor = ref({ head: 0, larm: 0, rarm: 0, body: 0, lleg: 0, rleg: 0 });

// Damage Variables
const damage = ref(0);
const penetration = ref(0);

function dealDamage(location: string) {
	event?.preventDefault();
	// Get the armor at the location hit
	let localArmor = 0;
	switch (location) {
		case "head":
			localArmor = armor.value.head;
			break;
		case "larm":
			localArmor = armor.value.larm;
			break;
		case "rarm":
			localArmor = armor.value.rarm;
			break;
		case "body":
			localArmor = armor.value.body;
			break;
		case "lleg":
			localArmor = armor.value.lleg;
			break;
		case "rleg":
			localArmor = armor.value.rleg;
			break;
	}

	// Calculate armor after penetration is applied
	let appliedArmor = localArmor - penetration.value;
	appliedArmor = (appliedArmor < 0) ? 0 : appliedArmor;
	console.log("appliedArmor: " + appliedArmor);

	// Calculate final damage dealt
	let damageDealt = damage.value - tb.value - appliedArmor;
	damageDealt = (damageDealt < 0) ? 0 : damageDealt;
	console.log("damage: " + damage.value);
	console.log("damageDealt: " + damageDealt);

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
			<label for="wounds">Current Wounds</label>
			<input type="number" v-model="wounds" name="wounds" id="woundInput" />
		</div>
		<div class="numInput">
			<label for="critical">Critical Damage</label>
			<input type="number" v-model="critical" name="critical" id="criticalInput" />
		</div>
		<div class="numInput">
			<label for="maxWounds">Max Wounds</label>
			<input type="number" v-model="maxWounds" name="maxWounds" id="maxWoundInput" />
		</div>
		<div class="numInput">
			<label for="tb">Toughness Bonus</label>
			<input type="number" v-model="tb" name="tb" id="tbInput" />
		</div>
		<table id="armorInput" class="bodyTable">
			<tbody>
				<tr>
					<td></td>
					<td>
						<label for="head">Head AP</label>
						<input type="number" v-model="armor.head" name="head" id="headAP" />
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<label for="arms">Left Arm AP</label>
						<input type="number" v-model="armor.larm" name="arms" id="armsAP" />
					</td>
					<td></td>
					<td>
						<label for="arms">Right Arm AP</label>
						<input type="number" v-model="armor.rarm" name="arms" id="armsAP" />
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<label for="body">Body AP</label>
						<input type="number" v-model="armor.body" name="body" id="bodyAP" />
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<label for="legs">Left Leg AP</label>
						<input type="number" v-model="armor.lleg" name="legs" id="legsAP" />
					</td>
					<td></td>
					<td>
						<label for="legs">Right Leg AP</label>
						<input type="number" v-model="armor.rleg" name="legs" id="legsAP" />
					</td>
				</tr>
			</tbody>
		</table>
	</form>
	<form id="damageInput">
		<div class="numInput">
			<label for="damage">Damage Dealt</label>
			<input type="number" v-model="damage" name="damage" id="damageInput" />
		</div>
		<div class="numInput">
			<label for="penetration">Penetration</label>
			<input type="number" v-model="penetration" name="penetration" id="penetrationInput" />
		</div>
		<table id="damageButtons" class="bodyTable">
			<tbody>
				<tr>
					<th></th>
					<th>Deal Damage</th>
					<th></th>
				</tr>
				<tr>
					<td></td>
					<td>
						<button id="damageButtonHead" @click="dealDamage('head')">
							Head
						</button>
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<button id="damageButtonLArm" @click="dealDamage('larm')">
							Left Arm
						</button>
					</td>
					<td></td>
					<td>
						<button id="damageButtonRArm" @click="dealDamage('rarm')">
							Right Arm
						</button>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<button id="damageButtonBody" @click="dealDamage('body')">
							Body
						</button>
					</td>
					<td></td>
				</tr>
				<tr>
					<td>
						<button id="damageButtonLLeg" @click="dealDamage('lleg')">
							Left Leg
						</button>
					</td>
					<td></td>
					<td>
						<button id="damageButtonRLeg" @click="dealDamage('rleg')">
							Right Leg
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</template>

<style scoped>
.bodyTable {
	display: block;
	/*background-color: #ff000060;*/
}
form {
	display: flex;
	justify-content: space-around;
	align-items: center;
	>* {
		margin: 10px;
	}
}
</style>
