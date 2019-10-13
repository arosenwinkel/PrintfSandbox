import {Spec, specsDiff} from './Spec';

it('works', () => {
    // all defaulted
    const initSpec = {
        "a": new Spec(1),
        "b": new Spec(1),
        "c": new Spec(2)
    };

    // changed b to 2, changed c to 3
    const spec2 = {
        "a": new Spec(1),
        "b": new Spec(1, 2),
        "c": new Spec(2, 3)
    };

    // changed a to 2, reset b, left out c, added b
    const spec3 = {
        "a": new Spec(1, 2),
        "b": new Spec(1, 1),
        "d": new Spec(4, 5)
    };

    const diff1 = specsDiff(initSpec, spec2);
    expect(diff1["a"].isSet).toEqual(false);
    
    const diff2 = specsDiff(spec2, spec3);

    expect(diff2["c"].isSet).toEqual(true);
    expect(diff2["c"].setting).toEqual(2);
    expect(diff2["d"].setting).toEqual(5);
});