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

	validate(): boolean | string[] {
		let errors: string[] = [];
		let path: string = this.name ? this.name : "System";

		if (!this.name) {
			errors.push("System(Name)");
		}

		this.stars.forEach(star => {
			let valid = star.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});
		this.elements.forEach(element => {
			let valid = element.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});

		return errors.length ? errors : true;
	}
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

	validate(path: string): boolean | string[] {
		path = path + '/' + (this.name ? this.name : "Star");
		let errors: string[] = [];

		if (!this.name) {
			errors.push(path + "(Name)");
		}
		if (!this.type) {
			errors.push(path + "(Type)");
		}

		return errors.length ? errors : true;
	}
}

// Holds the data for a system element, like a planet or derelict station
export class SystemElement {
	// The name of the element (if applicable)
	name?: string;
	// The type of element this is
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

	validate(path: string): boolean | string[] {
		path = path + '/' + (this.name ? this.name : this.type ? this.type : "System_Element");
		let errors: string[] = [];

		if (!this.type) {
			errors.push(path + "(Type)");
		}
		if (!this.zone) {
			errors.push(path + "(Zone)");
		}

		this.resources.forEach(resource => {
			let valid = resource.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});
		if (this.planet) {
			let valid = this.planet.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		}

		return errors.length ? errors : true;
	}
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

	validate(path: string): boolean | string[] {
		path = path + '/' + (this.type ? this.type : "Resource");
		let errors: string[] = [];

		if (!this.type) {
			errors.push(path + "(Type)");
		}
		if (!this.quantity) {
			errors.push(path + "(Quantity)");
		}

		return errors.length ? errors : true;
	}
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

	validate(path: string): boolean | string[] {
		path = path + '/' + ("Planet");
		let errors: string[] = [];

		if (!this.body) {
			errors.push(path + "(Body)");
		}
		if (!this.gravity) {
			errors.push(path + "(Gravity)");
		}

		this.orbitalFeatures.forEach(feature => {
			let valid = feature.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});
		this.landmasses.forEach(landmass => {
			let valid = landmass.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});

		return errors.length ? errors : true;
	}
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

	validate(path: string): boolean | string[] {
		path = path + '/' + (this.name ? this.name : "Landmass");
		let errors: string[] = [];


		this.territories.forEach(territory => {
			let valid = territory.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});

		return errors.length ? errors : true;
	}
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

	validate(path: string): boolean | string[] {
		path = path + '/' + (this.name ? this.name : "Territory");
		let errors: string[] = [];

		if (!this.terrain) {
			errors.push(path + "(Terrain)");
		}

		this.traits.forEach(trait => {
			let valid = trait.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});
		this.landmarks.forEach(landmarks => {
			let valid = landmarks.validate(path);
			if (typeof valid != "boolean") {
				errors = errors.concat(valid);
			}
		});

		return errors.length ? errors : true;
	}
}

export class Trait {
	type?: string;
	info?: string;
	constructor() {}
	validate(path: string): boolean | string[] {
		path = path + '/' + (this.type ? this.type : "Trait");
		let errors: string[] = [];

		if (!this.type) {
			errors.push(path + "(Trait)");
		}
		if (!this.info) {
			errors.push(path + "(Info)");
		}

		return errors.length ? errors : true;
	}
}
export class Landmark {
	type?: string;
	info?: string;
	constructor() {}
	validate(path: string): boolean | string[] {
		path = path + '/' + (this.type ? this.type : "Landmark");
		let errors: string[] = [];

		if (!this.type) {
			errors.push(path + "(Landmark)");
		}
		if (!this.info) {
			errors.push(path + "(Info)");
		}

		return errors.length ? errors : true;
	}
}