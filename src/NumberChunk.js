import React from 'react';
import Chunk from './Chunk';

export class Number {
    constructor(c_printf) {
        this.c_printf = c_printf;
    }
}

export const NumberTypes = Object.freeze({
    Integer: new Number("d"),
    FloatingPoint: new Number("f")
});

export const ReprTypes = Object.freeze({
    Logical: 0,
    CPrintf: 1,
    CppSStream: 2
});

export const DisplayTypes = Object.freeze({
    Decimal: 1,
    Octal: 2,
    Hex: 3,
    Binary: 4
});

export class InternalSize {
    constructor(c_printf) {
        this.c_printf = c_printf;
    }
}

export const InternalSizes = Object.freeze({
    char: new InternalSize("hh"),
    short: new InternalSize("h"),
    int: new InternalSize(""),
    long: new InternalSize("l"),
    longlong: new InternalSize("ll"),
    max_t: new InternalSize("j"),
    size_t: new InternalSize("z"),
    ptrdiff_t: new InternalSize("t")
});

export function specsDiff(oldSpecs, newSpecs) {
    //if (!oldSpecs) return newSpecs;

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
    })

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

export const DefaultNumberSpecifiers = Object.freeze({
    displayType: new Spec(DisplayTypes.Decimal), // DisplayTypes enum
    unsigned: new Spec(false),
    leftJustify: new Spec(false),
    showSign: new Spec(false), 
    showHexX: new Spec(false),
    forceDecimalPoint: new Spec(false),
    limitSize: new Spec(false), // use shorter representation where possible (float vs. scientific notation)
    padChar: new Spec(' '), // pad with zeroes instead of spaces
    width: new Spec(0), // horizontal width
    capitalize: new Spec(false), // use capital hex digits, capital E for sci. notation
    precision: new Spec(null),
    size: new Spec(InternalSizes.int),
});

export function getCppSStreamModifiers(specs) {
    let modifiers = [];

    const width = specs.width;
    const padChar = specs.padChar;

    if (width.isSet) {
        modifiers.push(`std::setw(${width.setting})`);
    }

    if (padChar.isSet) {
        modifiers.push(`std::setfill('${padChar.setting}')`);
    }

    return modifiers;
}

export class NumberChunk extends Chunk {
    constructor(props) {
        // number: NumberTypes enum
        // type: ReprTypes enum
        // specifiers: copy of specifiers object
        super(props);

        this.state = {

        }
    }

    setPrevious(specs) {
        this.previous = specs;
    }

    isValid() {
        if (!("number" in this.props)) return false;
        if (!("type" in this.props)) return false;
        if (!("specifiers" in this.props)) return false;
        
        return true;
    }

    renderCPrintf() {
        if (!this.isValid()) return null;

        const number_type = this.props.number;
        const internal_size = this.props.specifiers.size.setting;

        let symbol = internal_size.c_printf + number_type.c_printf;

        const width = this.props.specifiers.width;
        const padChar = this.props.specifiers.padChar;

        let padClause = "";

        if (width.isSet) {
            if (padChar.isSet && padChar.setting === "0") {
                padClause = "0";
            }

            padClause += width.setting.toString(10);
        }

        const result = `%${padClause}${symbol}`;

        return result;
    }

    renderLogical() {
        if (!this.isValid()) return null;

        return "LOGICAL";
    }

    renderCppSStream() {
        let specs = this.props.specifiers;
        if (this.previous) {
            specs = specsDiff(this.previous, this.props.specifiers);
        }

        const modifiers = getCppSStreamModifiers(specs);

        let result = "";
        modifiers.map((part) => {
            result += "<< " + part + " ";
        });

        result += `<< ${this.props.name}`;

        return result;
    }

    toStr() {
        if (this.props.type == ReprTypes.CPrintf) {
            return this.renderCPrintf();
        }
        else if (this.props.type == ReprTypes.CppSStream) {
            return this.renderCppSStream();
        }
        else return this.renderLogical();
    }

    render() {
        return <p>{this.toStr()}</p>;
    }
}