const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Strict blocklist (case insensitive)
const BLOCKLIST = [
  'porn', 'sex', 'violence', 'drugs', 'gun', 'kill', 
  'adult', 'nude', 'explicit', 'fuck', 'shit', 'ass','suicide', 'racism', 'weapons','adult love','murder','blood'
];

// Approved educational resources
const EDUCATIONAL_RESOURCES = {
  science: {
    title: "National Geographic Kids",
    url: "https://kids.nationalgeographic.com",
    image: "/images/science.png"
  },
  
    math: {
      title: "Cool Math Games",
      url: "https://www.coolmathgames.com",
      image: "/images/math.png"
    },
  
  cartoons: {
    title: "Nick Jr.",
    url: "https://www.nickjr.com/videos",
    image: "/images/cartoons.png"
  },
  games: {
    title: "ABCya Educational Games",
    url: "https://www.abcya.com",
    image: "/images/games.png"
  },
  education: {
    title: "Khan Academy Kids",
    url: "https://learn.khanacademy.org/khan-academy-kids/",
    image: "/images/education.png"
  },
  rhymes: {
    title: "Mother Goose Club",
    url: "https://mothergooseclub.com",
    image: "/images/rhymes.png"
  }
  
  };


async function checkTextSafety(text) {
  const input = text.toLowerCase().trim();

  // 1. Immediate blocklist rejection
  if (BLOCKLIST.some(term => input.includes(term))) {
    return { safe: false, reason: 'blocked' };
  }

  // 2. Check for educational keywords
  const matchedCategory = Object.keys(EDUCATIONAL_RESOURCES).find(category => 
    input.includes(category)
  );

  if (matchedCategory) {
    return { 
      safe: true, 
      result: EDUCATIONAL_RESOURCES[matchedCategory]
    };
  }

  // 3. OpenAI moderation for ambiguous cases
  try {
    const mod = await openai.moderations.create({ input: text });
    return {
      safe: !mod.results[0].flagged,
      reason: mod.results[0].flagged ? 'moderated' : 'approved'
    };
  } catch (error) {
    console.error('Moderation error:', error);
    return { safe: false, reason: 'error' };
  }
}

module.exports = { checkTextSafety };