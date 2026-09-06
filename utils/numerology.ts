/**
 * Pythagorean Numerology Core Engine
 * Ported from Pythagorean Numerology Report Generator
 */

export interface NumberDescription {
  "Good Description": string;
  "Not So good Description": string;
  Lessons: string;
  "Soul Desire": string;
}

export interface CoreNumberResult {
  value: number;
  rootValue: number;
  isMaster: boolean;
  rawSum: number;
  chain: number[];
  formatted: string;
}

export interface PlaneSummary {
  name: string;
  description: string;
  digits: number[];
  count: number;
  percentage: number;
}

export interface LetterBreakdown {
  letter: string;
  position: number;
  type: "vowel" | "consonant";
}

export interface NumerologyProfile {
  name: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
    rawInput: string;
  };
  targetYear: number;
  lifePath: CoreNumberResult;
  personality: CoreNumberResult;
  destiny: CoreNumberResult;
  soulDesire: CoreNumberResult;
  outerPersonality: CoreNumberResult;
  personalYear: CoreNumberResult;
  grid: {
    digits: Record<number, string>;
    counts: Record<number, number>;
  };
  planes: {
    mind: PlaneSummary;
    soul: PlaneSummary;
    physical: PlaneSummary;
  };
  masculineCount: number;
  feminineCount: number;
  energyBalance: "masculine" | "feminine" | "balanced";
  oldSoul: boolean;
  incarnationCount: number;
  letterBreakdown: LetterBreakdown[];
  presentNumbers: Array<{
    digit: number;
    count: number;
    key: string;
    description: string;
    isMany: boolean;
  }>;
  missingNumbers: Array<{
    digit: number;
    description: string;
  }>;
}

export const numbersDescription: Record<string, NumberDescription> = {
  "1": {
    "Good Description":
      "leadership qualities, independent, strong minded, self sufficient, extremely capable, initiative, individuality, strong personality, crave to be no. 1, rarely accepts defeat, don't give up easily, courageous, innovative, self motivated, talented problem solver",
    "Not So good Description":
      "thinking out of the box, can start but usually cannot finish",
    "Lessons":
      "become more self-aware; harmonise with others; embrace their individuality; be more diplomatic, patient and tolerant; to lead alongside others, to love and believe in themselves; learn to be less aggressive",
    "Soul Desire":
      "Long to become an independent individual who embraces uniqueness and thinks outside the box; have freedom and not repress order to fit into society; motivated by being in charge and initiate projects, don't like being told what to do",
  },
  "2": {
    "Good Description":
      "diplomatic, considerate, mediator, loving, harmonious, feminine, affectionate, persuasive, supportive, cooperative, intuitive, partnership, diplomacy",
    "Not So good Description":
      "moody, jealous, hypersensitive, self-conscious, shy, indecisive, co-dependent, timid",
    "Lessons":
      "to love and believe in themselves; to define personal limits and boundaries; trust their own intuition, learn to be independent; to be honest about their feelings; learn to say no; learn not to be too sensitive",
    "Soul Desire":
      "Long to be a cooperative peacemaker - promoting peace amongst family, friends, workplace & community. Motivated by relationship, harmony, friendship & love",
  },
  "3": {
    "Good Description":
      "creative, joy of living, expression, artistic (can be music, art, acting etc), childlike, fun loving, young at heart, friendly, humorous, charismatic, outgoing, gifted with words, imaginative, inspirational, sociable, cheerful",
    "Not So good Description":
      "critical, gossipy, superficial, attention seeking, disorganised & irresponsible, loose talk, exaggeration",
    "Lessons":
      "overcome self-doubt; eliminate unnecessary dramas; speak their truth; focus, plan & prioritise; be emotionally balanced",
    "Soul Desire":
      "You long to express yourself and use your creative and communication skills to bring joy to the world. Your soul wants to be happy, joyful and for others to feel the same as you. You feel that life is meant to be fun and to live life to the fullest. You are motivated by people, conversation, laughter, entertainment and arts.",
  },
  "4": {
    "Good Description":
      "practical, constructive, systematic, hardworking, order & organised, grounded, stable, reliable, focused, persistent, disciplined & determined, takes responsibilities seriously, prefers routine - finds it hard to adapt to change",
    "Not So good Description":
      "critical, judgemental, narrow minded, controlling, emotionally closed, stubborn, inflexible, lack of imagination, argumentative, serious",
    "Lessons":
      "embrace and surrender to change, make time for fun & relaxation, think outside the box, express emotion and affection, embrace gradual progress",
    "Soul Desire":
      "Long to be a dedicated worker who brings stability, organisation and order to your family, workplace and community. Your soul desires to obtain financial, emotional and physical stability so you can live a secure life. You appreciate honesty, truth, practicality and reality over superficial glitz and glamour.",
  },
  "5": {
    "Good Description":
      "freedom loving, adventurer, feels stimulated and challenged, curious, gifted communicator, adaptable, resourceful, clever, magnetic, resilient, multi-talented, quick learner, constructive freedom, sexuality, knowledge, versatile",
    "Not So good Description":
      "prone to addiction, carelessness, restlessness, jack of all trades, unreliable, inclined to exaggerate, scattered, irresponsible, intolerant, non-committal, restless, inconsistent",
    "Lessons":
      "learn to use their freedom constructively, be patient and tolerant, eliminate dramas, focus and commit, plan and prioritise",
    "Soul Desire":
      "Long to be a freedom loving adventurer who lives life to the fullest and makes the most of every experience. Your soul wants to be free - no restrictions, no limitations. You are motivated by new experiences, people, travel, excitement, adventure and variety",
  },
  "6": {
    "Good Description":
      "responsible, caregiver, nurturing, family & friends come first, self-sacrificing, generous, loving, supportive, wise, creative, conscientious, sympathetic, dependable, unselfish",
    "Not So good Description":
      "interfering, critical, bossy, jealous, self-critical, prone to worry, unrealistic, perfectionist, self-righteous, sensitive, must learn to be alone and not being lonely",
    "Lessons":
      "to love and appreciate themselves, to balance the giving and receiving, recognise love in many forms, learn to say no, come to terms with imperfections, to be responsible not just for others but for themselves as well, accept, let go and move on, respect others' boundaries",
    "Soul Desire":
      "You long to be a responsible caregiver who serves, supports and nurtures others with love. Your soul wants to bring love, beauty and harmony into the world so everyone can feel happy, loved and healed. You are motivated by beauty, family, love, relationships and service to others.",
  },
  "7": {
    "Good Description":
      "seeker of truth, needs alone time to ponder the meaning of life, spends time thinking, relaxing, analysing, studying, meditating, independent, intuitive, analytical, intellectual, deep, philosophical, technically oriented, insightful, inquisitive, spiritual, occult, wisdom",
    "Not So good Description":
      "secretive, perfectionist, withdrawn, cynical, emotionally closed, defensive, sceptical, untrusting, intolerant, egoistic",
    "Lessons":
      "to discover their own spiritual truth, to open and trust, to have hope and faith, to be patient and tolerant, embrace imperfection, involve themselves in life, to communicate with emotions",
    "Soul Desire":
      "You long to seek the truth and discover secrets and mysteries of the universe and find your spiritual truth. You want to get to the bottom of things and to learn what is beneath. You are motivated by wisdom, knowledge and understanding.",
  },
  "8": {
    "Good Description":
      "business-minded, usually self-employed or in position of authority, enjoys challenges and drives to success, organised, fair, dependable, self-motivated, strong, executive ability, authority, hardworking, determined, driven, has the ability to manifest wealth and abundance - needs to balance material and spiritual needs",
    "Not So good Description":
      "workaholic, egotistical, intimidating, greedy, prone to worry, domineering, intolerant, impatient, loves recognition, lack of humanitarianism",
    "Lessons":
      "to balance material and spiritual worlds, live with honesty and integrity, lead alongside with others, temper power with respect, reclaim their personal power, adopt an attitude of abundance",
    "Soul Desire":
      "You long to be a business minded leader who lives by higher ideals and exudes an attitude of abundance. The soul wants to feel balance, empowerment and abundance in personal and work life. You are motivated by responsibility, goals and challenges especially in career. You may prefer to be self-employed and thrive to lead others in achieving a common goal.",
  },
  "9": {
    "Good Description":
      "compassionate, humanitarian, fights for the underdogs, feels responsible to make the world a better place, generous, broadminded, passionate, multi-talented, intuitive, sympathetic, creative, wise, understanding, philanthropic nature, sympathetic, selfless",
    "Not So good Description":
      "intolerant, impatient, unforgiving, aggressive, temperamental, intense, dramatic, moody, defensive, hypersensitive, impulsive, careless in money matters, inclination for high living",
    "Lessons":
      "to be compassionate and tolerant, express themselves creatively, need to work with family issues, learn to forgive, accept, let go and move on",
    "Soul Desire":
      "You long to be a compassionate humanitarian who contributes to making the world a better place. Your soul wants to have every opportunity to promote peace, unity, understanding, forgiveness and universal love. Motivated to serve others.",
  },
  "11": {
    "Good Description":
      "intuition, illumination, inspiration, spirituality, uplifting, charismatic, creative, compassionate, insightful",
    "Not So good Description":
      "too sensitive, not practical, jealous, obsessive, egoistic, self-destructive",
    "Lessons":
      "to love and believe in themselves; to define their personal limits and boundaries, trust their own intuition, learn to be independent; to be honest about their feelings; learn to say no; learn not to be too sensitive. To understand and utilize their creative power; to live with honesty and integrity; to embrace their spirituality and universal laws; to utilise their Master Number energy; to balance materialism and spirituality; to serve humanity and promote unconditional love; to help raise the collective consciousness of the world.",
    "Soul Desire":
      "Long to be an inspirational teacher who raises spiritual awareness and understanding on planet Earth. Soul desires to promote peace, cooperation & harmony and transform others. Through their own transformation, helps others to uplift, empower and inspire them to reach their full potential.",
  },
  "22": {
    "Good Description":
      "turning dreams into reality through practical application; to reach higher level of consciousness, driven to build, create or promote something to benefit the community or humanity as a whole. Visionary, inventive, inspirational, forward thinking, focused, dedicated, idealistic, creative, intuitive, charismatic",
    "Not So good Description":
      "controlling, inflexible, workaholic, self-destructive, awkward, stubborn, arrogant, demanding, self-righteous",
    "Lessons":
      "embrace and surrender to change, make time for fun & relaxation, think outside the box, express emotion and affection, embrace gradual progress. To understand and utilize their creative power; to live with honesty and integrity; to embrace their spirituality and universal laws; to utilise their Master Number energy; to balance materialism and spirituality; to serve humanity and promote unconditional love; to help raise the collective consciousness of the world.",
    "Soul Desire":
      "Long to be a Master Builder who turns dreams into reality through practical application. Desire to build, create, or promote something that benefits humanity and bridges the spiritual and material worlds. Motivated by big projects and challenges that enable you to make a difference in the workplace, community, or world at large.",
  },
  "33": {
    "Good Description":
      "cosmic parents of the world who raise the vibration of humanity through their service, creativity and compassion. Have the ability to heal the masses with their unconditional love, champions for the underdogs. Master number of healing energies. Emotional high achievers who crave approval from others. Creative, joyful, compassionate, intuitive, uplifting, inspirational, healing, loving, family oriented, nurturing",
    "Not So good Description":
      "perfectionist, critical, self-righteous, people pleasing, judgemental, intolerant, bossy, self-critical, interfering, overachieving",
    "Lessons":
      "to love and appreciate themselves, to balance the giving and receiving, recognise love in many forms, learn to say no, come to terms with imperfections, to be responsible not just for others but for themselves as well, accept, let go and move on, respect others' boundaries",
    "Soul Desire":
      "To understand and utilize their creative power; to live with honesty and integrity, to embrace their spirituality and universal laws; to utilise their Master Number energy, to balance materialism and spirituality; to serve humanity and promote unconditional love, to help raise the collective consciousness of the world.",
  },
};

export const numbers: Record<string, Record<string, string>> = {
  "1": {
    "1":
      "For people with only one Number 1 in their charts, it's extremely difficult to express their innermost feelings and desires. They are unable to convey their true feelings, even though they may not necessarily be bad at communication at other levels. It will also be hard for them to be able to appreciate other person's point of view.",
    "11":
      "Comparatively much balanced in their approach, people with two Number 1s in their charts find it easy to communicate and express their inner feelings. They have an ability to look at life in an unbiased manner and are better judges of other people's point of views. This is also considered as the best quantity of Number 1s to have.",
    "111":
      "Such people may have a duality when it comes to their personality. But one thing is for sure that such people are outgoing and entertaining (many famous entertainers have this combo). Coming back to the ambivalence - people with three Number 1s may either be complete chatterboxes or they may be quiet and introspective. The truth is that they are actually both, and their personality manifestation depends on situation.",
    "1111":
      "Sensitive and caring, such people are frequently misunderstood, as they tend to be quite inexpressive. Verbal expression is not one of their better qualities, because of which they tend to be misfits among groups and find it hard to relax and simply let go.",
    "Many":
      "Too many Number 1s in the chart isn't a very good indication. An absence of ability to verbally express oneself is stark in these natives, and they may even face enormous difficulty on account of this. They also stand a high chance of being misunderstood due to this inability. Such people, however, may be very creative and may use such forms for inner-expression like music, dance or painting.",
  },
  "2": {
    "2":
      "Such people tend to be quite sensitive and intuitive but can also be easily hurt. Blessed with an uncanny ability and discretion to see through other people's insincerity, these people are naturally good judges of others.",
    "22":
      "Such people who have two 2s in their charts are highly intelligent and sensitive. Born with a superb intuition, they end up benefiting immensely from this prowess of theirs. Very much like the people with one 2 in their charts, these people also tend to be masters at detecting and assessing the motivations of others.",
    "222":
      "Such people tend to go overboard with their sensitive side, may experience premonitions, may easily get hurt and may also give others an impression of being aloof. Prone to living in a world of their own, they loathe socialising and spending time with others as they are afraid of getting hurt.",
    "2222":
      "Impatient and rash, these people have a tendency to over-react to small problems. Extremely sensitive introverts, they prefer to spend time by themselves, rather than risk getting hurt because of others.",
    "Many":
      "Born with an incredible sensitivity, such people find it hard to deal with their own self doubt and the world at large. This kind of a chart is a rarity, but it's actually a good thing, as more the number of 2s, more difficult it is for the native to adjust. Lack of self confidence and trust in others are also the marked qualities of such people.",
  },
  "3": {
    "3":
      "An excellent memory and a marked creative streak are the prominent gains of people who possess one Number 3 in their Numerology chart. A positive, yet a practical, realistic approach towards the attainment of their goals and an honest optimism towards life set them apart from others, and even make them a source of inspiration for others.",
    "33":
      "Mentally alert and creative, such people are quite imaginative and love their eccentricity and a crazy streak that allows them to be unconventional. Giving the native an ability to express well in words, this combination allows people to excel in creative and literary fields, and many such people may be writers.",
    "333":
      "Three 3s may be counted as too many, for they make the native extra-imaginative, so much so that the native may remain self-absorbed and prefer to live in his/her own imagination. Such people appear as aloof and remote and find it hard to relate to others and usually are bad listeners.",
    "3333":
      "This rarely found combination makes the natives extremely impractical, timid, fearful and super dreamy. The imagination of these people tends to be so strong that it is difficult for them to step out of it into the real world and confront the day-to-day chores and demands of routine.",
    "Many":
      "Too many 3s in the chart may indicate a scattered brain... not grounded.",
  },
  "4": {
    "4":
      "People with this combination in their Numerology chart tend to be practical, earthy and basically good with manual work. They tend to enjoy 'hands-on' approach and such vocations. A more than practically needed emphasis on theories and imagination makes them impatient. The digit also relates to work like handicrafts and pottery, and even instrumental music. Such people also are good organizers.",
    "44":
      "Born with excellent organizational skills, such people love the task of initiating a task and carrying it to the end. Accurate, conscientious and prim, these people make great managers, and may even be sculptors or someone great at origami. However they may be inclined to become overly involved in superficial, physical and materialistic pursuits at the expense of fun or spiritual pursuits.",
    "444":
      "Almost exclusively given to material, practical and physical pursuits, people with such a combination find it hard to attend to any other sphere of their lives. Organized to the T, these people are self-disciplined and hard working. Their abilities may be apparent to others, but they themselves may frequently be unable to realise their natural talents.",
    "4444":
      "An extremely rare placement, it is rarely found. Such people, if any, are totally immersed in physical activities. Anything to do with intellectual or spiritual domain is beyond their understanding. They also possess enormous capability at any task that needs working using hands.",
    "Many": "Too many 4s may indicate being overworked and a workaholic.",
  },
  "5": {
    "5":
      "Emotionally stable and balanced, people with one Number 5 in their chart find it easy to motivate and inspire others. Their compassionate and caring nature allows them to positively reinforce others in a manner that makes them achieve and perform much more than they otherwise would have.",
    "55":
      "Intense, emotional and determined, people with two 5s in their Numerology chart tend to be extremely enthusiastic and driven about whatever they do or possess. This generally makes them passionate, and sometimes even obsessed. This may lead to certain regrettable situations and outbursts.",
    "555":
      "Loving adventure, these people really need to channelise this vast reserve in the right direction. They tend to speak without contemplating, which may put them in tricky situations, wherein they might have hurt others unintentionally. They love any passionate activity and enjoy change.",
    "5555":
      "This combination is possible only three times in a span of a century (100 years). Hence, this is obvious that people with this combination are very rare. It's a dangerous combination to have, as it makes one prone to accidents.",
    "Many":
      "Too many 5s - best to marry later. They cannot settle at young age: wants to enjoy life, take risks. Watch out for vices and compulsive behaviours.",
  },
  "6": {
    "6":
      "People with one 6 in their Numerology chart have a great filial, familial and home love. Obviously, they make excellent parents and equally good children. They love handling their domestic responsibilities, and they also have a good amount of creative potential. Most often, they are the people in their families to whom everyone wants to come to when things go awry.",
    "66":
      "Inclined towards over-anxiety and fretting over even minutest details, as far as the family and home are concerned, people with two 6s in their chart tend to have a certain nervous streak about them. They need more mental rest than others, and need to relax more often. They have a great love for aesthetics.",
    "666":
      "Over-protective and possessive of their loved ones, people with three 6s tend to be borderline cases of extreme restlessness and stress. They also have a tendency to become negative, and thus they need constant motivation and encouragement. Blessed with considerable creative potential.",
    "6666":
      "Very creative and extremely driven, people with this combination are quite weak and vulnerable when it comes to the emotional front. Almost everything has the power to affect them, which makes adjusting to everyday life very difficult for them.",
    "Many":
      "Too many 6s - too self-sacrificial, tend to blame themselves if things go wrong.",
  },
  "7": {
    "7":
      "Such people are likely to learn the most important lessons of their life from either loss of love, possessions or health. As they learn from these experiences, they become more mature and interested in metaphysical or spiritual pursuits, along the way.",
    "77":
      "Growth in knowledge and wisdom is achieved mostly by losing love, health or money by these people. Extremely analytical, these people are excellent at solving intricate, cryptic or technical problems. The losses they meet with make them more spiritual and pique their interest in psychic or occult practices.",
    "777":
      "Strong and silent, people with three Number 7s in their chart often lead sad lives, which is a result of certain major disappointments and setbacks they end up suffering in their lives. These misfortunes may be in the area of love, health and finances. However, these people tend to develop enormous reserves of inner strength along the way.",
    "7777":
      "There are only three days in a century when such an occurrence happens. And it's a good thing, for this combination is not a lucky one. Fate has a strange and sad way of teaching almost all lessons of life to these people.",
    "Many":
      "Spent many lifetimes looking for spiritual truth. Need to trust again.",
  },
  "8": {
    "8":
      "Methodical, fastidious and immaculate about details, people with one Number 8 in their Numerology chart have restless, active minds that crave mental challenges. However, on the flip-side, these people often find it difficult to finish the tasks they, very enthusiastically, had initiated.",
    "88":
      "Very perceptive, observant and painstakingly careful of details, these people prefer to learn everything through experience, rather than trusting on others or the available reference. This is a good thing, but only to an extent. An excess of this trait makes them rigid and inflexible.",
    "888":
      "Rigid and restless, especially during their early years, people with three 8s tend to become more stable by their middle age, approximately around forty. That is when they progress at the maximum possible pace. This is also the time when they develop a better perspective and purpose in life.",
    "8888":
      "Variety is the spice of life! This is the mantra by which these people live their lives. Never averse to change, they, in fact, cultivate variations and distortions in regular patterns of life. Restless beyond belief, it is vital for them to find their true calling and purpose in life.",
    "Many": "2x 8s and above - very frugal with money.",
  },
  "9": {
    "9":
      "Possessing a strong, marked desire for self-improvement, people with one 9 in their Numerology chart are quite ambitious. All the people alive today have at least one 9, and it's undeniably true that we all have much more humanity inside us than we tend to express.",
    "99":
      "Idealistic, intelligent and astute, these people are quite likely to be critical of others. And many a times they can be blunt and derogatory. Since they themselves are gifted in the intelligence department, they might even look down upon others. They desperately need to cultivate the ability to shun their personal biases and gel with others.",
    "999":
      "Virtuous, idealistic, brilliant, mentally astute and caring, people with three 9s in their charts tend to get better with age. They become more mature and happier in life, once they understand how to make the best use of their capabilities.",
    "9999":
      "Such people are gifted when it comes to mental brilliance and intelligence, but they are quite vulnerable and find it extremely difficult to adjust to the everyday, mundane worldly matters. These people frequently retreat to their own dream, imaginary worlds. But deep inside them they have immense power and energy.",
    "Many":
      "Too many 9s - has been reincarnated many times, here to help raise earth vibrations and is very sacrificial. Need to take care of one's health.",
  },
};

export const missingNumbersDescription: Record<string, string> = {
  "1":
    "People with a missing number 1 will find it difficult to express themselves and their individuality. They will, most likely, not have any major issues with ego or self-pride, and may spend most of their time helping and nurturing others. Lack of leadership; must be more willing to take initiative.",
  "2":
    "Those with missing Number 2 indicates a lack of sensitivity and intuition in the native's personality. Such people also possess a marked impatient and unpunctual streak. They may be too much into justifications and clarifications for their actions. Does not feel as much compassion as others. Missing 2s are very masculine and find it difficult to cooperate with others.",
  "3":
    "People without Number 3 in their charts may suffer from a lack of self-confidence, and may also find it tough to express themselves on most occasions. Creative blocks and does not know how to enjoy themselves. Lack of cheer and joy in life; no happiness. Needs to go into inner child self and find that life is fun and full of surprises.",
  "4":
    "Such people lack organizational skills, and that is the most important quality they need to cultivate. Working in set routines with strict norms is a major issue for them, and they may turn up late usually. Strong dislike for mundane, boring tasks. Missing 4s have difficulties with completing tasks and do not pay careful attention to details; no management skills; can start, cannot finish.",
  "5":
    "Setting defined, targeted goals is a major issue for these people. They lack drive and versatility. Usually not great at multi-tasking, they require external sources of motivation and reinforcement to keep them on the right track. Missing 5s are confused in their life directions even though may have many opportunities presented to them. No determination and not self motivated.",
  "6":
    "People without a 6 in their charts tend to hide their innermost feelings from others. They also lack the quality of being selfless, even in their closest relationships. Due to which they find it difficult to relate to others, and may even have troubles with one of their parents. Relationship issues: Lack of assistance from others. As there is lack of sense of family responsibilities, will have difficult marriage that ends in divorce or may choose not to get married.",
  "7":
    "Maybe inconsiderate and insensitive when it comes to others' feelings, such people live a self-immersed life. They are usually disorganized in everyday life and tend to remain aloof from anything remotely spiritual or metaphysical. They are not independent and self-sufficient on most occasions, and hate being left on their own. Distrust anything that is metaphysical. They need proof. Fear of being alone.",
  "8":
    "8 is a practical number. People without this number are generally bad at handling their financial affairs. Plus, they lack motivation and drive, and may even be prone to leaving/abandoning their tasks mid-way. Quite impulsive and careless, they need to think before they act. Money one pocket in another pocket out - cannot hold money. No business acumen; Careless with money.",
  "9":
    "Everyone born in the twentieth century possesses this number, but from twenty first century onwards there will be many people who will not have it in their charts. Such people will tend to be insensitive and shall overlook the needs of others. Detached and oblivious to others, these people need to develop that much-needed streak of humanitarianism. Heartless; no compassion.",
};

export const MASTER_NUMBERS = [11, 22, 33];

/**
 * Maps a single letter (a-z) to its Pythagorean number (1-9).
 * A=1, B=2, ..., I=9, J=1, K=2, ..., S=1, ..., Z=8.
 */
export function charPosition(letter: string): number {
  const code = letter.toLowerCase().charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return ((code - 97) % 9) + 1;
  }
  return 0;
}

export function isVowel(c: string): boolean {
  return ["a", "e", "i", "o", "u"].includes(c.toLowerCase());
}

export function isConsonant(c: string): boolean {
  return /^[bcdfghjklmnpqrstvwxyz]$/i.test(c);
}

/**
 * Recursively reduces a number by summing its digits.
 * Preserves Master Numbers (11, 22, 33) when preserveMaster is true.
 */
export function getReduced(number: number, preserveMaster = true): number {
  if (number <= 9) return number;
  if (preserveMaster && MASTER_NUMBERS.includes(number)) return number;

  let val = 0;
  for (const n of String(number)) {
    val += parseInt(n, 10) || 0;
  }
  if (val >= 10 && !(preserveMaster && MASTER_NUMBERS.includes(val))) {
    return getReduced(val, preserveMaster);
  }
  return val;
}

/**
 * Traces the complete reduction steps (e.g. 56 -> 11 -> 2).
 */
export function reduceWithSteps(
  rawScore: number,
  preserveMaster = true,
): CoreNumberResult {
  const chain: number[] = [rawScore];
  let current = rawScore;

  while (current >= 10) {
    if (preserveMaster && MASTER_NUMBERS.includes(current)) {
      break;
    }
    let next = 0;
    for (const d of String(current)) {
      next += parseInt(d, 10) || 0;
    }
    if (next === current) break;
    current = next;
    chain.push(current);
  }

  const isMaster = MASTER_NUMBERS.includes(current);
  let rootValue = current;
  if (isMaster) {
    let r = 0;
    for (const d of String(current)) {
      r += parseInt(d, 10) || 0;
    }
    rootValue = r;
  }

  const formatted = isMaster ? `${current}/${rootValue}` : String(current);

  return {
    value: current,
    rootValue,
    isMaster,
    rawSum: rawScore,
    chain,
    formatted,
  };
}

/**
 * Calculates Life Path Number based on day, month, and year.
 * Matching Pythagorean formula: reduced(day) + reduced(month) + sum(year digits), then reduced.
 */
export function calculateLifePath(
  day: number,
  month: number,
  year: number,
): CoreNumberResult {
  const reducedDay = getReduced(day);
  const reducedMonth = getReduced(month);
  let yearSum = 0;
  for (const digit of String(year)) {
    yearSum += parseInt(digit, 10) || 0;
  }
  const rawSum = reducedDay + reducedMonth + yearSum;
  return reduceWithSteps(rawSum, true);
}

/**
 * Personality Number (Day of Birth reduction).
 */
export function calculatePersonalityNumber(day: number): CoreNumberResult {
  return reduceWithSteps(day, true);
}

/**
 * Personal Year Number:
 * Digits of Day + Month + Target Year, reduced.
 */
export function calculatePersonalYear(
  day: number,
  month: number,
  targetYear: number,
): CoreNumberResult {
  const dateStr = `${day}${month}${targetYear}`;
  let rawSum = 0;
  for (const d of dateStr) {
    rawSum += parseInt(d, 10) || 0;
  }
  return reduceWithSteps(rawSum, true);
}

/**
 * Extracts letter breakdown and scores for vowels, consonants, and total name.
 */
export function analyzeName(fullName: string): {
  destiny: CoreNumberResult;
  soulDesire: CoreNumberResult;
  outerPersonality: CoreNumberResult;
  breakdown: LetterBreakdown[];
  nameValues: number[];
} {
  let vowelScore = 0;
  let consonantScore = 0;
  let totalScore = 0;
  const breakdown: LetterBreakdown[] = [];
  const nameValues: number[] = [];

  for (const char of fullName) {
    if (isVowel(char)) {
      const pos = charPosition(char);
      vowelScore += pos;
      totalScore += pos;
      nameValues.push(pos);
      breakdown.push({
        letter: char.toUpperCase(),
        position: pos,
        type: "vowel",
      });
    } else if (isConsonant(char)) {
      const pos = charPosition(char);
      consonantScore += pos;
      totalScore += pos;
      nameValues.push(pos);
      breakdown.push({
        letter: char.toUpperCase(),
        position: pos,
        type: "consonant",
      });
    }
  }

  return {
    destiny: reduceWithSteps(totalScore, true),
    soulDesire: reduceWithSteps(vowelScore, true),
    outerPersonality: reduceWithSteps(consonantScore, true),
    breakdown,
    nameValues,
  };
}

/**
 * Builds the complete 3x3 Pythagorean chart and analytical interpretations.
 */
export function generateNumerologyProfile(
  name: string,
  dobString: string,
  targetYear?: number,
): NumerologyProfile {
  const dateParts = dobString.split("-").map((s) => parseInt(s, 10));
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const currentYear = targetYear ?? new Date().getFullYear();

  // Core Numbers
  const { destiny, soulDesire, outerPersonality, breakdown, nameValues } =
    analyzeName(name);
  const lifePath = calculateLifePath(day, month, year);
  const personality = calculatePersonalityNumber(day);
  const personalYear = calculatePersonalYear(day, month, currentYear);

  // Initialize Grid tally (indices 1 to 9)
  const gridDigits: Record<number, string> = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };

  const addDigits = (numStr: string | number) => {
    for (const d of String(numStr)) {
      const digit = parseInt(d, 10);
      if (digit >= 1 && digit <= 9) {
        gridDigits[digit] += String(digit);
      }
    }
  };

  // 1. All letters from full name
  for (const val of nameValues) {
    if (val >= 1 && val <= 9) {
      gridDigits[val] += String(val);
    }
  }

  // 2. Birth year digits
  addDigits(year);
  // 3. Birth month digits
  addDigits(month);
  // 4. Birth day digits
  addDigits(day);
  // 5. Life path number digits
  addDigits(lifePath.rootValue);
  // 6. Destiny number root digits
  addDigits(destiny.rootValue);

  // Calculate counts
  const gridCounts: Record<number, number> = {};
  let totalGridCount = 0;
  for (let i = 1; i <= 9; i++) {
    const c = gridDigits[i].length;
    gridCounts[i] = c;
    totalGridCount += c;
  }

  // Planes
  // Mind Plane: 3, 6, 9
  const mindCount = gridCounts[3] + gridCounts[6] + gridCounts[9];
  // Soul Plane: 2, 5, 8
  const soulCount = gridCounts[2] + gridCounts[5] + gridCounts[8];
  // Physical Plane: 1, 4, 7
  const physicalCount = gridCounts[1] + gridCounts[4] + gridCounts[7];

  const safeTotal = totalGridCount > 0 ? totalGridCount : 1;

  const planes = {
    mind: {
      name: "Mind Plane",
      description: "Intellect, memory, creative thought, and idealism.",
      digits: [3, 6, 9],
      count: mindCount,
      percentage: Math.round((mindCount / safeTotal) * 100),
    },
    soul: {
      name: "Soul Plane",
      description: "Intuition, feelings, spiritual sensitivity, and emotions.",
      digits: [2, 5, 8],
      count: soulCount,
      percentage: Math.round((soulCount / safeTotal) * 100),
    },
    physical: {
      name: "Physical Plane",
      description: "Practicality, craftsmanship, action, and grounding.",
      digits: [1, 4, 7],
      count: physicalCount,
      percentage: Math.round((physicalCount / safeTotal) * 100),
    },
  };

  // Masculine (1s) vs Feminine (2s)
  const masculineCount = gridCounts[1];
  const feminineCount = gridCounts[2];
  let energyBalance: "masculine" | "feminine" | "balanced" = "balanced";
  if (masculineCount > feminineCount) {
    energyBalance = "masculine";
  } else if (feminineCount > masculineCount) {
    energyBalance = "feminine";
  }

  // Old soul indicator (>= 5 nines)
  const oldSoul = gridCounts[9] >= 5;
  const incarnationCount = gridCounts[9];

  // Present numbers descriptions
  const presentNumbers: NumerologyProfile["presentNumbers"] = [];
  for (let i = 1; i <= 9; i++) {
    const count = gridCounts[i];
    if (count > 0) {
      const key = gridDigits[i];
      let description = "";
      let isMany = false;

      if (numbers[String(i)] && numbers[String(i)][key]) {
        description = numbers[String(i)][key];
      } else if (count > 4 && numbers[String(i)]?.["Many"]) {
        description = numbers[String(i)]["Many"];
        isMany = true;
      } else if (numbers[String(i)]) {
        // Fallback to highest available intensity
        const available = Object.keys(numbers[String(i)]).filter((k) =>
          k !== "Many"
        );
        description = numbers[String(i)][available[available.length - 1]] || "";
      }

      presentNumbers.push({
        digit: i,
        count,
        key,
        description,
        isMany,
      });
    }
  }

  // Missing numbers (Karmic lessons)
  const missingNumbers: NumerologyProfile["missingNumbers"] = [];
  for (let i = 1; i <= 9; i++) {
    if (gridCounts[i] === 0) {
      missingNumbers.push({
        digit: i,
        description: missingNumbersDescription[String(i)] || "",
      });
    }
  }

  return {
    name,
    birthDate: {
      year,
      month,
      day,
      rawInput: dobString,
    },
    targetYear: currentYear,
    lifePath,
    personality,
    destiny,
    soulDesire,
    outerPersonality,
    personalYear,
    grid: {
      digits: gridDigits,
      counts: gridCounts,
    },
    planes,
    masculineCount,
    feminineCount,
    energyBalance,
    oldSoul,
    incarnationCount,
    letterBreakdown: breakdown,
    presentNumbers,
    missingNumbers,
  };
}
