import { assertEquals } from "jsr:@std/assert@^1.0.0";
import {
  analyzeName,
  calculateLifePath,
  calculatePersonalityNumber,
  calculatePersonalYear,
  charPosition,
  generateNumerologyProfile,
  getReduced,
  isConsonant,
  isVowel,
  reduceWithSteps,
} from "./numerology.ts";

Deno.test("charPosition maps letters 1 to 9 accurately", () => {
  assertEquals(charPosition("a"), 1);
  assertEquals(charPosition("i"), 9);
  assertEquals(charPosition("j"), 1);
  assertEquals(charPosition("r"), 9);
  assertEquals(charPosition("s"), 1);
  assertEquals(charPosition("z"), 8);
  assertEquals(charPosition("A"), 1);
  assertEquals(charPosition("Z"), 8);
  assertEquals(charPosition(" "), 0);
  assertEquals(charPosition("!"), 0);
});

Deno.test("isVowel and isConsonant detect letters correctly", () => {
  assertEquals(isVowel("a"), true);
  assertEquals(isVowel("E"), true);
  assertEquals(isVowel("x"), false);

  assertEquals(isConsonant("b"), true);
  assertEquals(isConsonant("Z"), true);
  assertEquals(isConsonant("a"), false);
  assertEquals(isConsonant("1"), false);
});

Deno.test("getReduced reduces single digits and preserves Master Numbers", () => {
  assertEquals(getReduced(5), 5);
  assertEquals(getReduced(14), 5);
  assertEquals(getReduced(11), 11);
  assertEquals(getReduced(22), 22);
  assertEquals(getReduced(33), 33);
  assertEquals(getReduced(29), 11);
  assertEquals(getReduced(38), 11);
  assertEquals(getReduced(55), 1); // 55 -> 10 -> 1
  // If preserveMaster is false:
  assertEquals(getReduced(11, false), 2);
  assertEquals(getReduced(22, false), 4);
  assertEquals(getReduced(33, false), 6);
});

Deno.test("reduceWithSteps generates steps and formatting", () => {
  const res1 = reduceWithSteps(29);
  assertEquals(res1.value, 11);
  assertEquals(res1.rootValue, 2);
  assertEquals(res1.isMaster, true);
  assertEquals(res1.formatted, "11/2");

  const res2 = reduceWithSteps(24);
  assertEquals(res2.value, 6);
  assertEquals(res2.rootValue, 6);
  assertEquals(res2.isMaster, false);
  assertEquals(res2.formatted, "6");
});

Deno.test("analyzeName correctly calculates destiny, vowels, consonants", () => {
  // Test with "Ada Lovelace"
  // A(1) d(4) a(1) L(3) o(6) v(4) e(5) l(3) a(1) c(3) e(5)
  // Total sum: 1 + 4 + 1 + 3 + 6 + 4 + 5 + 3 + 1 + 3 + 5 = 36 -> 9
  // Vowels: A(1), a(1), o(6), e(5), a(1), e(5) = 19 -> 10 -> 1
  // Consonants: d(4), L(3), v(4), l(3), c(3) = 17 -> 8
  const analysis = analyzeName("Ada Lovelace");
  assertEquals(analysis.destiny.value, 9);
  assertEquals(analysis.soulDesire.value, 1);
  assertEquals(analysis.outerPersonality.value, 8);
});

Deno.test("calculateLifePath preserves master numbers", () => {
  // 17 November 1988:
  // day 17 -> 8
  // month 11 -> 11
  // year 1988 -> 1+9+8+8 = 26
  // sum = 8 + 11 + 26 = 45 -> 9
  const lp = calculateLifePath(17, 11, 1988);
  assertEquals(lp.rootValue, 9);
});

Deno.test("calculatePersonalityNumber and calculatePersonalYear work properly", () => {
  const pers = calculatePersonalityNumber(29);
  assertEquals(pers.value, 11);
  assertEquals(pers.isMaster, true);

  // Dec 25, year 2026: 2+5+1+2+2+0+2+6 = 20 -> 2
  const py = calculatePersonalYear(25, 12, 2026);
  assertEquals(py.value, 2);
});

Deno.test("generateNumerologyProfile generates complete 3x3 grid, planes, and energy", () => {
  const profile = generateNumerologyProfile("John Doe", "1990-05-15", 2026);
  assertEquals(profile.name, "John Doe");
  assertEquals(profile.birthDate.year, 1990);
  assertEquals(profile.birthDate.month, 5);
  assertEquals(profile.birthDate.day, 15);
  assertEquals(profile.targetYear, 2026);

  // Planes existence
  assertEquals(typeof profile.planes.mind.count, "number");
  assertEquals(typeof profile.planes.soul.count, "number");
  assertEquals(typeof profile.planes.physical.count, "number");

  // Grid keys 1..9
  for (let i = 1; i <= 9; i++) {
    assertEquals(typeof profile.grid.counts[i], "number");
  }

  // Check energy balance
  assertEquals(
    ["masculine", "feminine", "balanced"].includes(profile.energyBalance),
    true,
  );
});
