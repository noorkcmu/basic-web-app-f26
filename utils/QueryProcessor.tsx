export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("largest")) {
    const numbers = (query.match(/-?\d+/g) || []).map(Number);
    if (numbers.length > 0) {
      return Math.max(...numbers).toString();
    }
  }

  const arithmetic = query.match(/what is (.+?)\??$/i);
  if (arithmetic) {
    const result = evaluate(arithmetic[1]);
    if (result !== null) {
      return result;
    }
  }

  if (query.toLowerCase().includes("primes")) {
    const numbers = (query.match(/\d+/g) || []).map(Number);
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "noork";
  }

  if (query.toLowerCase().includes("name")) {
    return "Noor Al-Kuwari";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}

const OPERATORS: { [word: string]: string } = {
  "plus": "+",
  "minus": "-",
  "multiplied by": "*",
  "to the power of": "^",
};

// Evaluates expressions like "37 multiplied by 59 plus 78" with normal
// precedence (power, then multiply, then plus/minus). Uses BigInt so large
// powers stay exact. Returns null if the text isn't such an expression.
function evaluate(expression: string): string | null {
  const parts = expression.trim().split(/\s+(plus|minus|multiplied by|to the power of)\s+/i);
  if (parts.length < 3) return null;

  const numbers: bigint[] = [];
  const ops: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (!/^\d+$/.test(parts[i])) return null;
      numbers.push(BigInt(parts[i]));
    } else {
      ops.push(OPERATORS[parts[i].toLowerCase()]);
    }
  }

  const apply = (symbols: string[], fn: (a: bigint, b: bigint, op: string) => bigint) => {
    for (let i = 0; i < ops.length; ) {
      if (symbols.includes(ops[i])) {
        numbers.splice(i, 2, fn(numbers[i], numbers[i + 1], ops[i]));
        ops.splice(i, 1);
      } else {
        i++;
      }
    }
  };

  apply(["^"], (a, b) => {
    let result = BigInt(1);
    for (let i = BigInt(0); i < b; i++) {
      result *= a;
    }
    return result;
  });
  apply(["*"], (a, b) => a * b);
  apply(["+", "-"], (a, b, op) => (op === "+" ? a + b : a - b));

  return numbers[0].toString();
}
