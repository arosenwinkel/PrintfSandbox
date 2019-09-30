export function specsDiff(oldSpecs, newSpecs) {
    let result = {};

    const keySet = Array.from(new Set(Object.keys(oldSpecs).concat(Object.keys(newSpecs))));

    keySet.map((key) => {
        const oldSpec = oldSpecs[key];
        const newSpec = newSpecs[key];

        if (typeof oldSpec === 'undefined') {
            result[key] = newSpec;
        }
        else if (typeof newSpec === 'undefined' || (oldSpec.isSet && !newSpec.isSet)) {
            result[key] = new Spec(oldSpec.default, oldSpec.default);
        }
        else if (oldSpec.setting !== newSpec.setting) {
            result[key] = newSpec;
        }
        else if (oldSpec.setting === newSpec.setting) {
            result[key] = new Spec(oldSpec.default);
        }
        else {
            console.log("shouldn't get here");
        }
    });

    return result;
}

export class Spec {
    constructor(def, setting) {
        this.default = def;
        this.setting = def;
        this.isSet = false;

        if (typeof setting !== 'undefined') {
            this.set(setting);
        }
    }

    set(setting) {
        this.setting = setting;
        this.isSet = true;
    }
}