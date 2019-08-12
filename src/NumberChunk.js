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

export const DefaultSpecifiers = Object.freeze({
    displayType: DisplayTypes.Decimal, // DisplayTypes enum
    unsigned: false,
    leftJustify: false,
    showSign: false, 
    showHexX: false,
    forceDecimalPoint: false,
    limitSize: false, // use shorter representation where possible (float vs. scientific notation)
    zeroPad: false, // pad with zeroes instead of spaces
    width: null, // horizontal width
    capitalize: false, // use capital hex digits, capital E for sci. notation
    precision: null,
    size: InternalSizes.int,
});

export class NumberChunk extends Chunk {
    constructor(props) {
        // number: NumberTypes enum
        // type: ReprTypes enum
        // specifiers: copy of specifiers object
        super(props);

        this.state = {

        }
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
        const display_type = this.props.specifiers.displayType;
        const internal_size = this.props.specifiers.size;

        let symbol = internal_size.c_printf + number_type.c_printf;

        return `%${symbol}`;
    }

    renderLogical() {
        if (!this.isValid()) return null;

        return 
    }

    renderCppStream() {
        return <p>Rendered CPP-style Stream</p>
    }

    render() {
        return <p>{this.renderCPrintf()}</p>
    }
}