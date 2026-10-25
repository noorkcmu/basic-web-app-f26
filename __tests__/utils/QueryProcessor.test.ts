import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Noor Al-Kuwari"
          ));
    })

    test('should return andrew id', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "noork"
          ));
    })

    test('should return largest number', () => {
        const query = "Which of the following numbers is the largest: 8, 11, 73?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("73");
    })

    test('should add numbers', () => {
        const query = "What is 10 plus 41?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("51");
    })

    test('should compute powers', () => {
        const query = "What is 2 to the power of 10?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("1024");
    })

    test('should subtract numbers', () => {
        const query = "What is 67 minus 38?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("29");
    })

    test('should return primes', () => {
        const query = "Which of the following numbers are primes: 11, 55, 93, 7, 8?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("11, 7");
    })

    test('should respect operator precedence', () => {
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100);
        const c = Math.floor(Math.random() * 100);
        expect(QueryProcessor(`What is ${a} multiplied by ${b} plus ${c}?`)).toBe(String(a * b + c));
        expect(QueryProcessor(`What is ${a} plus ${b} multiplied by ${c}?`)).toBe(String(a + b * c));
        expect(QueryProcessor(`What is ${a} minus ${b} plus ${c}?`)).toBe(String(a - b + c));
    })

    test('should find anagrams', () => {
        const word = "listen";
        const shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
        const query = `Which of the following is an anagram of ${word}: banana, ${shuffled}, enlists?`;
        expect(QueryProcessor(query)).toBe(shuffled);
    })
});