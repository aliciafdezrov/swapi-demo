import {sortDTOListByProp} from './compare.util';

describe('compare util test', () => {
    describe('sortDTOListByProp', () => {
        const a = {name: "John", age: 25};
        const b = {name: "Peter", age: 20};
        const c = {name: "Ben", age: 30};
        const list = [a, b, c];

        it('should return sorted list in ascending order when sorting by a property of type string', () => {
            const result = sortDTOListByProp(list, "name", "string", true);
            expect(result[0]).toBe(c);
            expect(result[1]).toBe(a);
            expect(result[2]).toBe(b);
        });

        it('should return sorted list in descending order when sorting by a property of type string', () => {
            const result = sortDTOListByProp(list, "name", "string", false);
            expect(result[0]).toBe(b);
            expect(result[1]).toBe(a);
            expect(result[2]).toBe(c);
        });

        it('should return sorted list in ascending order when sorting by a property of type number', () => {
            const result = sortDTOListByProp(list, "age", "number", true);
            expect(result[0]).toBe(b);
            expect(result[1]).toBe(a);
            expect(result[2]).toBe(c);
        });

        it('should return sorted list in descending order when sorting by a property of type number', () => {
            const result = sortDTOListByProp(list, "age", "number", false);
            expect(result[0]).toBe(c);
            expect(result[1]).toBe(a);
            expect(result[2]).toBe(b);
        });

        it('should return list the same list when elements are equal in ascending order', () => {
            const d = {name: "John", age: 25};
            const e = {name: "John", age: 20};
            const f = {name: "John", age: 30};
            const equalList = [d, e, f];
            const result = sortDTOListByProp(equalList, "name", "string", true);
            expect(result[0]).toBe(d);
            expect(result[1]).toBe(e);
            expect(result[2]).toBe(f);
        });

        it('should return list the same list when elements are equal in descending order', () => {
            const d = {name: "John", age: 25};
            const e = {name: "John", age: 20};
            const f = {name: "John", age: 30};
            const equalList = [d, e, f];
            const result = sortDTOListByProp(equalList, "name", "string", false);
            expect(result[0]).toBe(d);
            expect(result[1]).toBe(e);
            expect(result[2]).toBe(f);
        });

        it('should return list with null values at the top when the sort is ascending', () => {
            const d = {name: null, age: 25};
            const e = {name: "Doe", age: 20};
            const f = {name: "John", age: 30};
            const equalList = [d, e, f];
            const result = sortDTOListByProp(equalList, "name", "string", true);
            expect(result[0]).toBe(d);
            expect(result[1]).toBe(e);
            expect(result[2]).toBe(f);
        });

        it('should return list with null values at the bottom when the sort is descending', () => {
            const d = {name: null, age: 25};
            const e = {name: "Doe", age: 20};
            const f = {name: "John", age: 30};
            const equalList = [d, e, f];
            const result = sortDTOListByProp(equalList, "name", "string", false);
            expect(result[2]).toBe(d);
            expect(result[1]).toBe(e);
            expect(result[0]).toBe(f);
        });
    });
});
