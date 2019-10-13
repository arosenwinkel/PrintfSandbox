import React from 'react';
import Chunk from './Chunk';
import {Spec, specsDiff} from './Spec';
import {ReprTypes} from './NumberModifiers';

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

        // %[flags][width][.precision][length]specifier

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