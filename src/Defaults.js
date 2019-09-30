import {Spec, DisplayTypes, InternalSizes, NumberTypes, ReprTypes, NumberChunk, DefaultNumberSpecifiers} from './NumberChunk';

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