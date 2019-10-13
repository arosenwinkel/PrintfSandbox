import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, NumberTypes, DisplayTypes} from './NumberModifiers';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, null);

    expect(chunk.toStr()).toEqual("%d");
});

it ('renders double to C printf', () => {
    const chunk = makeNumberChunk(null, NumberTypes.FloatingPoint, null, null);
    expect(chunk.toStr()).toEqual("%f");
});

it ('renders long long int to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, {"size": InternalSizes.longlong});
    expect(chunk.toStr()).toEqual("%lld");
});

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk(null, null, null, {"width": 10, "padChar": "0"});
    expect(chunk.toStr()).toEqual("%010d");
});

it ('renders combinations of display and number types', () => {
    const cases = [
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Hex}, "%a"],
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Hex, "capitalize": true}, "%A"],
        [NumberTypes.Integer, {"displayType": DisplayTypes.Hex}, "%x"],
        [NumberTypes.Integer, {"displayType": DisplayTypes.Hex, "capitalize": true}, "%X"],
        [NumberTypes.Unsigned, {"displayType": DisplayTypes.Integer}, "%u"],
        [NumberTypes.Integer, {"displayType": DisplayTypes.Octal}, "%o"],
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Scientific}, "%e"],
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Scientific, "capitalize": true}, "%E"],
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Scientific, "limitSize": true}, "%g"],
        [NumberTypes.FloatingPoint, {"displayType": DisplayTypes.Scientific, "limitSize": true, "capitalize": true}, "%G"],
    ];

    cases.map((c) => {
        const chunk = makeNumberChunk(null, c[0], null, c[1]);
        expect(chunk.toStr()).toEqual(c[2]);
    });
})