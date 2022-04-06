export const convertCompactNotationStringToStandardNumber = (compactNumberString: string): number => {
    let factors = {
        k: 1e3,
        m: 1e6,
        b: 1e9,
        t: 1e12,
        aa: 1e15
    }
    let numberStringWithoutFactorMatch = compactNumberString.match(/[\d\.]+/g);
    if (!numberStringWithoutFactorMatch) {
        return NaN
    }

    let numberStringWithoutFactor = numberStringWithoutFactorMatch[0];
    let numberWithoutFactor = Number(numberStringWithoutFactor);
    let factorFromString = compactNumberString.replace(numberStringWithoutFactor, '').toLocaleLowerCase();
    if (!factorFromString) {
        return numberWithoutFactor
    }

    if (!isNaN(numberWithoutFactor)) {
        return factors[factorFromString] * numberWithoutFactor
    } else {
        return NaN
    }
}
