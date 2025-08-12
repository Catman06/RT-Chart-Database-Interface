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

	constructor(name?: string, info?: string) {
		this.name = name;
		this.info = info;
	}
}

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

	constructor(type?: string, isPlanet?: boolean, name?: string, info?: string) {
		this.type = type;
		this.name = name;
		this.info = info;
		isPlanet ? this.planet = new Planet : this.planet = undefined;
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

	constructor(type?: string, quantity?: number, exploited?: boolean, info?: string) {
		this.type = type;
		this.quantity = quantity;
		this.exploited = exploited;
		this.info = info;
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
}

export class Landmass {
	// TODO
}