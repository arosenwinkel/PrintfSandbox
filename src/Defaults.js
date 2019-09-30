import {NumberTypes, ReprTypes, DisplayTypes, InternalSizes} from './NumberModifiers';
import {NumberChunk} from './NumberChunk';
import {Spec} from './Spec';

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

export function getNumberChunkProps(name, number, type, specs) {
    if (number === null) number = NumberTypes.Integer;
    if (type === null) type = ReprTypes.CPrintf;

    let specifiers = {};
    Object.assign(specifiers, DefaultNumberSpecifiers);

    if (specs) {
        Object.keys(specs).map((key) => {
            if (!specifiers.hasOwnProperty(key)) return;
            specifiers[key] = new Spec(specifiers[key].default, specs[key]);
        });
    }

    return {
        name: name,
        number: number,
        type: type,
        specifiers: specifiers
    };
}

export function makeNumberChunk(name, number, type, specs) {
    const props = getNumberChunkProps(name, number, type, specs);

    return new NumberChunk(props);
}