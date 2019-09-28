import {DisplayTypes, InternalSizes, NumberTypes, ReprTypes, NumberChunk} from './NumberChunk';

export const DefaultNumberSpecifiers = Object.freeze({
    displayType: DisplayTypes.Decimal, // DisplayTypes enum
    unsigned: false,
    leftJustify: false,
    showSign: false, 
    showHexX: false,
    forceDecimalPoint: false,
    limitSize: false, // use shorter representation where possible (float vs. scientific notation)
    padChar: ' ', // pad with zeroes instead of spaces
    width: null, // horizontal width
    capitalize: false, // use capital hex digits, capital E for sci. notation
    precision: null,
    size: InternalSizes.int,
});

export function getNumberChunkProps(number, type, specs) {
    if (number === null) number = NumberTypes.Integer;
    if (type === null) type = ReprTypes.CPrintf;

    let specifiers = {};
    Object.assign(specifiers, DefaultNumberSpecifiers);
    Object.assign(specifiers, specs);

    return {
        number: number,
        type: type,
        specifiers: specifiers
    };
}

export function makeNumberChunk(number, type, specs) {
    const props = getNumberChunkProps(number, type, specs);

    return new NumberChunk(props);
}