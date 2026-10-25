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

  if (query.toLowerCase().includes("plus")) {
    const numbers = (query.match(/-?\d+/g) || []).map(Number);
    if (numbers.length > 0) {
      return numbers.reduce((sum, n) => sum + n, 0).toString();
    }
  }

  if (query.toLowerCase().includes("power")) {
    const numbers = (query.match(/\d+/g) || []).map(BigInt);
    if (numbers.length === 2) {
      let result = BigInt(1);
      for (let i = BigInt(0); i < numbers[1]; i++) {
        result *= numbers[0];
      }
      return result.toString();
    }
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
