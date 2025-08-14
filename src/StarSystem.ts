// Holds the data for an entire system
export class StarSystem {
	// The name of the system
	name?: string;
	// An array for the star(s) of the system.
	stars: Star[] = [];
	// An array of the system's elements
	elements: SystemElement[] = [];
	// Any info about the system as a whole
	info?: string;

	constructor() {}
}

// Holds the data for a star
export class Star {
	// The star's name
	name?: string;
	// The type of star
	type?: string;
	// Further info about the star
	info?: string;

	constructor () {}
}

// Holds the data for a system element, like a planet or derelict station
export class SystemElement {
	// The name of the element (if applicable)
	name?: string;
	// The type of element resource is
	type?: string;
	// The zone (Inner Cauldron|Primary Biosphere|Outer Reaches) of this element
	zone?: string;
	// The resources that can be exploited on this element
	resources: Resource[] = [];
	// General info for this element, such as rules or notes that don't fit elsewhere
	info?: string;
	// If applicable, a Planet object that holds more specific info on a planet/moon
	planet?: Planet;

	constructor() {}
}

// Holds info on a specific instance of a resource
export class Resource {
	// The type of resource
	type?: string;
	// The amount of the resource that is available
	quantity?: number;
	// Whether this resource is being exploited or not
	exploited?: boolean;
	// Further info about the resource and its exploitation
	info?: string;

	constructor() {}
}

// Holds data for a planet
export class Planet {
	// The body of the planet
	body?: string;
	// The gravity of the planet
	gravity?: string;
	// An array of any orbital features
	orbitalFeatures: SystemElement[] = [];
	// The atmospheric presence of the planet
	atmosphere?: string;
	// The atmospheric composition of the planet
	atmosphereComposition?: string;
	// The climate of the planet
	climate?: string;
	// The habitability of the planet
	habitability?: string;
	// Any landmasses the planet has
	landmasses: Landmass[] = [];

	constructor() {}
}

// Holds data for a landmass
export class Landmass {
	// Name of the landmass
	name?: string;
	// Any additional info on the landmass itself
	info?: string;
	// Array on territories on the landmass
	territories: Territory[] = [];
	
	constructor() {}
}

// Holds data for a territory
export class Territory {
	// Name of the territory
	name?: string;
	// Base terrain of the territory
	terrain?: string;
	// Traits of the territory
	traits: Trait[] = [];
	// Landmarks of the territory
	landmarks: Landmark[] = [];
	// Any additional info on the territory
	info?: string;

	constructor() {}
}

export class Trait {
	type?: string;
	info?: string;
	constructor() {}
}
export class Landmark {
	type?: string;
	info?: string;
	constructor() {}
}

export function validate(system: StarSystem): boolean | string[] {
	let errors: string[] = [];
	let path: string = system.name ? system.name : "System";

	if (!system.name) {
		errors.push("System(Name)");
	}

	system.stars.forEach(star => {
		let valid = validateStar(star, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});
	system.elements.forEach(element => {
		let valid = validateElement(element, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});

	return errors.length ? errors : true;
}

function validateStar(star: Star, path: string): boolean | string[] {
	path = path + '/' + (star.name ? star.name : "Star");
	let errors: string[] = [];

	if (!star.name) {
		errors.push(path + "(Name)");
	}
	if (!star.type) {
		errors.push(path + "(Type)");
	}

	return errors.length ? errors : true;
}
function validateElement(element: SystemElement, path: string): boolean | string[] {
	path = path + '/' + (element.name ? element.name : element.type ? element.type : "System_Element");
	let errors: string[] = [];

	if (!element.type) {
		errors.push(path + "(Type)");
	}
	if (!element.zone) {
		errors.push(path + "(Zone)");
	}

	element.resources.forEach(resource => {
		let valid = validateResource(resource, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});
	if (element.planet) {
		let valid = validatePlanet(element.planet, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	}

	return errors.length ? errors : true;
}

function validateResource(resource: Resource, path: string): boolean | string[] {
	path = path + '/' + (resource.type ? resource.type : "Resource");
	let errors: string[] = [];

	if (!resource.type) {
		errors.push(path + "(Type)");
	}
	if (!resource.quantity) {
		errors.push(path + "(Quantity)");
	}

	return errors.length ? errors : true;
}

function validatePlanet(planet: Planet, path: string): boolean | string[] {
	path = path + '/' + ("Planet");
	let errors: string[] = [];

	if (!planet.body) {
		errors.push(path + "(Body)");
	}
	if (!planet.gravity) {
		errors.push(path + "(Gravity)");
	}

	planet.orbitalFeatures.forEach(feature => {
		let valid = validateElement(feature, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});
	planet.landmasses.forEach(landmass => {
		let valid = validateLandmass(landmass, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});

	return errors.length ? errors : true;
}

function validateLandmass(landmass: Landmass, path: string): boolean | string[] {
	path = path + '/' + (landmass.name ? landmass.name : "Landmass");
	let errors: string[] = [];


	landmass.territories.forEach(territory => {
		let valid = validateTerritory(territory, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});

	return errors.length ? errors : true;
}

function validateTerritory(territory: Territory, path: string): boolean | string[] {
	path = path + '/' + (territory.name ? territory.name : "Territory");
	let errors: string[] = [];

	if (!territory.terrain) {
		errors.push(path + "(Terrain)");
	}

	territory.traits.forEach(trait => {
		let valid = validateTrait(trait, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});
	territory.landmarks.forEach(landmark => {
		let valid = validateLandmark(landmark, path);
		if (typeof valid != "boolean") {
			errors = errors.concat(valid);
		}
	});

	return errors.length ? errors : true;
}

function validateTrait(trait: Trait, path: string): boolean | string[] {
	path = path + '/' + (trait.type ? trait.type : "Trait");
	let errors: string[] = [];

	if (!trait.type) {
		errors.push(path + "(Trait)");
	}
	if (!trait.info) {
		errors.push(path + "(Info)");
	}

	return errors.length ? errors : true;
}

function validateLandmark(landmark: Landmark, path: string): boolean | string[] {
	path = path + '/' + (landmark.type ? landmark.type : "Landmark");
	let errors: string[] = [];

	if (!landmark.type) {
		errors.push(path + "(Landmark)");
	}
	if (!landmark.info) {
		errors.push(path + "(Info)");
	}

	return errors.length ? errors : true;
}