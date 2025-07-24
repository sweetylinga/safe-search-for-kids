const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BLOCKLIST = [
'abuse','abuser','abusive','addict','addicted','alcohol','alcoholic','anal','anger','angry','anus','arse','arsehole','ass','asshole','b00bs','b00b','b1tch','bastard','bastards','bdsm','beastiality','bitch','bitches','bitchy','bite me','biatch','biotch','blackmail','blowjob','boob','boobs','boobies','booty','breast','breasts','brothel','bugger','butt','butthole','buttplug','cocaine','crackhead','crazy','creampie','crap','creep','creepy','curse','cumming','cunt','d1ck','darn','dammit','damn','damnation','dick','dickhead','dildo','dope','drugs','drunk','dumb','dumbass','ejaculate','erection','escort','exotic','fag','faggot','faeces','fart','fatass','felatio','fellatio','fetish','fisting','flamer','fornicate','freak','freaky','frig','frigid','fuck','fucked','fucker','fucking','fudgepacker','g-spot','gangbang','genital','genitals','gloryhole','goddamn','gore','gory','grope','gun','hate','hater','hell','heroin','hoe','homo','hooker','horny','hump','idiot','incest','intercourse','jerk','jerking','jizz','kickass','kinky','kill','killer','killing','kinky','kiss ass','kissing','kiss my ass','lame','lapdance','lesbian','liquor','loser','lust','masochist','masturbate','menstruate','menstruation','meth','milf','moan','mob','moron','murder','murderer','musclehead','mute','necrophilia','nigga','nigger','nipple','nipples','nude','nudes','nudity','numbnuts','nutsack','obscene','orgasm','orgy','panties','pee','penis','pimp','piss','pissed','pissing','playboy','poop','porno','porn','pornhub','prostitute','psycho','pube','pubes','pu**y','puke','punch','pussy','queer','quickie','racist','racism','rape','raped','rapist','rectum','retard','revenge','rimjob','riots','rough','sadist','satan','scam','scammer','scum','sex','sexy','semen','shag','shit','shitface','shithole','shitty','shoot','shooter','slut','sluts','slutty','smack','sniff','snort','sodomize','spank','sperm','spit','splooge','stfu','strangle','strip','stripping','stupid','submissive','suicide','swallow','syphilis','taser','testicle','testicles','threesome','thug','thunderthighs','tits','titties','titty','toke','tool','torture','tramp','tranny','trashy','trigger','turd','twat','twerk','twerking','ugly','urinal','urine','vag','vagina','violence','violent','vomit','vulgar','wank','weed','weirdo','whore','witch','wussy','x-rated','your mom',
'abuse','abuser','abusive','arse','arsehole','ass','asshole','bastard','bastards','bitch','bitches','bitchy','crap','cunt','dammit','damn','darn','dick','dickhead','dumb','dumbass','fag','faggot','freak','freaky','frig','frigid','fuck','fucked','fucker','fucking','goddamn','hell','idiot','jerk','moron','piss','pissed','shit','shitty','stfu','stupid','tool','twat','wank','wussy',
'attack','assault','beat','blood','bloody','bomb','bullet','choke','cut','die','dying','explode','fight','fighting','firearm','gun','guns','grenade','hit','kill','killer','killing','knife','machete','murder','murderer','pistol','punch','riot','riots','shoot','shooter','shooting','slap','stab','stabbing','strangle','suffocate','sword','taser','torture','violence','violent','war','weapon','weapons',
'alcohol','alcoholic','beer','bong','cannabis','cocaine','crack','crackhead','dope','drug','drugs','drunk','ecstasy','ganja','heroin','high','joint','liquor','lsd','marijuana','meth','narcotic','opium','pill','pills','pot','psychedelic','reefer','smack','sniff','snort','stoned','substance','toke','vape','weed','wine',
'anal','arse','bdsm','beastiality','biatch','biotch','boob','boobs','boobies','booty','breast','breasts','brothel','clit','clitoris','cum','cumming','dildo','ejaculate','escort','fetish','fingerbang','fisting','g-spot','gangbang','genital','genitals','gloryhole','hump','horny','kinky','lapdance','lust','masturbate','milf','moan','nipple','nipples','nude','nudes','nudity','orgasm','orgy','panties','penis','porn','porno','pornhub','prostitute','pube','pubes','pussy','rimjob','sex','sexy','shag','spank','sperm','strip','stripping','testicle','testicles','threesome','tits','titties','titty','vag','vagina','x-rated',
'cutting','depress','depressed','depression','die','dying','harm','hang','hopeless','kill myself','kill yourself','overdose','pain','selfharm','self-harm','slash','suicidal','suicide','suffer','trigger','worthless',
'bigot','bigoted','blackface','chink','discriminate','fag','faggot','gay','homo','kike','nazi','negro','nigga','nigger','queer','racist','racism','retard','retarded','sexist','slur','terrorist','towelhead','tranny','xenophobic','your mom',
'blackmail','bully','bullying','cheat','cyberbully','danger','dangerous','hack','hacker','hacking','hate','hater','hoax','hooker','illegal','liar','nude','pedophile','prank','revenge','scam','scammer','scum','spoof','stalker','thief','thug','toxic','troll','unsafe','witch', 's3x', 'sexy', 's*xy', 's@xy', 's3xy', 'sxey', 's.e.x', 's3.x', 'se*x', 's*x', 'sx', 's_x','se*y','p0rn', 'porn', 'p*rn', 'p@rn', 'po*n', 'p.r.n', 'pr0n', 'p0*rn', 'p_rn', 'pr*n',
    'f*ck', 'f@ck', 'f_ck', 'f.c.k', 'fu*k', 'fuk', 'fuxk',
    'sh*t', 's#it', 'sh!t', 'sh1t', 's.h.i.t', 's_h_i_t',
    'b*tch', 'b!tch', 'b1tch', 'b.i.t.c.h', 'bi*ch', 'btch', 'b!+ch',
    'a$$', 'a**', '@ss', 'a.s.s', '4ss',
    'd*ck', 'd@ck', 'd1ck', 'd.i.c.k', 'd!ck',
    'c*nt', 'c@nt', 'c_nt', 'c.i.n.t', 'cu*t',
    'wh*re', 'wh@re', 'w#ore', 'w_h_o_r_e',
    's*uicide', 'sucide', 'su!cide', 'su1cide', 's.u.i.c.i.d.e',
    'k*ll', 'k!ll', 'k1ll', 'k.i.l.l',
    'nudez', 'n@ked', 'nak*d', 'n4ked', 'n.ud.e', 'n*de','murder','blood','suicide','abuse','abuser','abusive','arse','arsehole','ass','asshole','bastard','bastards','bitch','bitches','bitchy',
        'crap','cunt','dammit','damn','darn','dick','dickhead','dumb','dumbass','fag','faggot','freak','freaky','frig',
        'frigid','fuck','fucked','fucker','fucking','goddamn','hell','idiot','jerk','moron','piss','pissed','shit',
        'shitty','stfu','stupid','tool','twat','wank','wussy',
   
        'attack','assault','beat','blood','bloody','bomb','bullet','choke','cut','die','dying','explode','fight',
        'fighting','firearm','gun','guns','grenade','hit','kill','killer','killing','knife','machete','murder',
        'murderer','pistol','punch','riot','riots','shoot','shooter','shooting','slap','stab','stabbing','strangle',
        'suffocate','sword','taser','torture','violence','violent','war','weapon','weapons',
   
  
        'alcohol','alcoholic','beer','bong','cannabis','cocaine','crack','crackhead','dope','drug','drugs','drunk',
        'ecstasy','ganja','heroin','high','joint','liquor','lsd','marijuana','meth','narcotic','opium','pill','pills',
        'pot','psychedelic','reefer','smack','sniff','snort','stoned','substance','toke','vape','weed','wine',
    
   
        'anal','arse','bdsm','beastiality','biatch','biotch','boob','boobs','boobies','booty','breast','breasts',
        'brothel','clit','clitoris','cum','cumming','dildo','ejaculate','escort','fetish','fingerbang','fisting',
        'g-spot','gangbang','genital','genitals','gloryhole','hump','horny','kinky','lapdance','lust','masturbate',
        'milf','moan','nipple','nipples','nude','nudes','nudity','orgasm','orgy','panties','penis','porn','porno',
        'pornhub','prostitute','pube','pubes','pussy','rimjob','sex','sexy','shag','spank','sperm','strip','stripping',
        'testicle','testicles','threesome','tits','titties','titty','vag','vagina','x-rated',
    
        'cutting','depress','depressed','depression','die','dying','harm','hang','hopeless','kill myself',
        'kill yourself','overdose','pain','selfharm','self-harm','slash','suicidal','suicide','suffer','trigger',
        'worthless',
    
        'bigot','bigoted','blackface','chink','discriminate','fag','faggot','gay','homo','kike','nazi','negro','nigga',
        'nigger','queer','racist','racism','retard','retarded','sexist','slur','terrorist','towelhead','tranny',
        'xenophobic','your mom','adult','adult movies',
    
        'blackmail','bully','bullying','cheat','cyberbully','danger','dangerous','hack','hacker','hacking','hate',
        'hater','hoax','hooker','illegal','liar','nude','pedophile','prank','revenge','scam','scammer','scum','spoof',
        'stalker','thief','thug','toxic','troll','unsafe','witch'


];

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

  // Blocklist check
  if (BLOCKLIST.some(term => input.includes(term))) {
    return { safe: false, reason: 'blocked' };
  }

  // Educational resources check
  const matchedCategory = Object.keys(EDUCATIONAL_RESOURCES).find(category => 
    input.includes(category)
  );

  if (matchedCategory) {
    return { 
      safe: true, 
      result: EDUCATIONAL_RESOURCES[matchedCategory]
    };
  }

  // Under construction for unknown terms
  if (input.length > 0) {
    return {
      safe: false,
      reason: 'under_construction',
      refresh: true
    };
  }

  // Moderation fallback
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