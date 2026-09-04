import { DevotionalQuote, MusicTrack, NostalgicMemory, FluteNote } from '../types';

export const YOUTUBE_PLAYLIST_ID = 'PL9aH_eUfO0g4w8aqg4vz8RyjDffxVYyRK';

export const PLAYLIST_TRACKS: MusicTrack[] = [
  {
    id: 'track-1',
    title: 'Achyutam Keshavam',
    subtitle: 'अच्युतं केशवं कृष्ण दामोदरं',
    artist: 'Devotional Bliss • Traditional',
    duration: '05:24',
    youtubeVideoId: 'yR0Pj8bS07I', // Popular rendition
    raga: 'Bhairavi',
    bhava: 'Samarpana (Surrender)'
  },
  {
    id: 'track-2',
    title: 'Shri Krishna Govind Hare Murari',
    subtitle: 'श्री कृष्ण गोविन्द हरे मुरारी',
    artist: 'Ravindra Jain • Timeless Classic',
    duration: '06:12',
    youtubeVideoId: 'zD76gO89f6w',
    raga: 'Yaman',
    bhava: 'Bhakti & Shanti'
  },
  {
    id: 'track-3',
    title: 'Madhurashtakam',
    subtitle: 'अधरं मधुरं वदनं मधुरं नयनं मधुरं',
    artist: 'Mahaprabhu Vallabhacharya',
    duration: '04:48',
    youtubeVideoId: 'gM28Y14iZVU',
    raga: 'Mohanam',
    bhava: 'Madhurya (Sweetness)'
  },
  {
    id: 'track-4',
    title: 'Radhe Radhe Govinda',
    subtitle: 'राधे राधे गोविन्द राधे राधे',
    artist: 'Gaurav Krishna Goswami • Braj Dhun',
    duration: '07:35',
    youtubeVideoId: 'Gg4Pqf0u0tQ',
    raga: 'Kafi',
    bhava: 'Utsava (Joyous Celebration)'
  },
  {
    id: 'track-5',
    title: 'Maiya Mori Main Nahi Makhan Khayo',
    subtitle: 'मैय्या मोरी मैं नहीं माखन खायो',
    artist: 'Surdas Pad • Anup Jalota Classic',
    duration: '05:50',
    youtubeVideoId: 'X0hZ9eP0n84',
    raga: 'Pilu',
    bhava: 'Vatsalya (Maternal Love)'
  },
  {
    id: 'track-6',
    title: 'Yashomati Maiya Se Bole Nandlala',
    subtitle: 'यशोमति मैया से बोले नंदलाला',
    artist: 'Lata Mangeshkar • Satyam Shivam Sundaram',
    duration: '04:15',
    youtubeVideoId: 'bA3q165k0p4',
    raga: 'Pahadi',
    bhava: 'Innocence & Nostalgia'
  },
  {
    id: 'track-7',
    title: 'Govind Bolo Hari Gopal Bolo',
    subtitle: 'गोविन्द बोलो हरि गोपाल बोलो',
    artist: 'Vrindavan Sankirtan',
    duration: '06:40',
    youtubeVideoId: 'eC7F7y6Dq2M',
    raga: 'Khamaj',
    bhava: 'Kirtan Ekagrata'
  },
  {
    id: 'track-8',
    title: 'Divine Bansuri Meditation',
    subtitle: 'वंशी ध्वनि • यमुना तट की बांसुरी',
    artist: 'Pt. Hariprasad Chaurasia style',
    duration: '08:12',
    youtubeVideoId: 'sF3E83dM-0k',
    raga: 'Bhupali',
    bhava: 'Dhyana (Transcendence)'
  }
];

export const DEVOTIONAL_QUOTES: DevotionalQuote[] = [
  {
    id: 'quote-1',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'Karmanye vadhikaraste ma phaleshu kadachana',
    english: 'You have a divine right to perform your duties, but never to the fruits of your actions. Perform every act with love, free from anxious attachment.',
    source: 'Shrimad Bhagavad Gita 2.47',
    context: 'The eternal philosophy of Nishkama Karma spoken on the sacred field of Kurukshetra',
    mood: 'Guidance & Equanimity'
  },
  {
    id: 'quote-2',
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    transliteration: 'Yada yada hi dharmasya glanir bhavati bharata',
    english: 'Whenever and wherever righteousness declines and unrighteousness arises, O descendant of Bharata, at that time I manifest Myself upon this earth.',
    source: 'Shrimad Bhagavad Gita 4.7',
    context: 'The promise of divine arrival to protect innocence and uphold cosmic balance',
    mood: 'Reassurance & Strength'
  },
  {
    id: 'quote-3',
    sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\ntad aham bhakty-upahritam ashnami prayatatmanah',
    transliteration: 'Patram pushpam phalam toyam yo me bhaktya prayacchati',
    english: 'Whoever offers Me with true devotion even a single leaf, a flower, a fruit, or pure water — that offering of a loving heart I accept with delight.',
    source: 'Shrimad Bhagavad Gita 9.26',
    context: 'God seeks not grand rituals, but the humble purity of your affection',
    mood: 'Tenderness & Surrender'
  },
  {
    id: 'quote-4',
    sanskrit: 'जो हुआ, वह अच्छा हुआ। जो हो रहा है, वह अच्छा हो रहा है। जो होगा, वह भी अच्छा ही होगा।',
    transliteration: 'Jo hua woh accha hua, jo ho raha hai woh accha ho raha hai...',
    english: 'Whatever happened, happened for good. Whatever is happening, is happening for good. Whatever will happen, shall happen for good. Have faith in the eternal rhythm.',
    source: 'Gita Amrit • The Wisdom of Acceptance',
    context: 'The nostalgic life motto framed in brass and glass on living room walls across generations',
    mood: 'Peace & Consolation'
  },
  {
    id: 'quote-5',
    sanskrit: 'मैय्या मोरी मैं नहीं माखन खायो।\nख्याल परै ये सखा सबै मिलि, मेरैं मुख लपटायो॥',
    transliteration: 'Maiya mori main nahi makhan khayo...',
    english: '"O Mother, I never ate the butter! My mischievous playmates joined hands to smear it across my cheeks while I was gazing at the calf."',
    source: 'Mahakavi Surdas • Sur Sagar',
    context: 'Child Krishna standing with innocent butter-stained lips in Mother Yashoda’s courtyard',
    mood: 'Playful Nostalgia'
  },
  {
    id: 'quote-6',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    transliteration: 'Sarva-dharman parityajya mam ekam sharanam vraja',
    english: 'Abandon all fears and varieties of anxiety; take refuge in Me alone. I shall liberate you from all darkness. Grieve no more.',
    source: 'Shrimad Bhagavad Gita 18.66',
    context: 'The ultimate benediction of peace and unconditional sanctuary',
    mood: 'Sanctuary & Liberation'
  }
];

export const NOSTALGIC_MEMORIES: NostalgicMemory[] = [
  {
    id: 'mem-1',
    title: 'The Sunday Morning Doordarshan Ritual',
    hindiTitle: 'रविवार की सुबह और शंख की गूंज',
    era: '1990s • Indian Living Rooms',
    description: 'Bazaars fell eerily silent, telephone receivers were set aside, and whole neighborhoods huddled around a lone Onida or Solidaire TV with marigold flowers placed gently atop the wooden cabinet as Ramanand Sagar’s "Shri Krishna" started.',
    sensoryDetail: 'Smell of morning ginger chai, brass agarbatti stand smoke curling past the TV antenna.',
    tag: 'Community Memory'
  },
  {
    id: 'mem-2',
    title: 'Janmashtami Midnight Bell & Silver Swing',
    hindiTitle: 'जन्माष्टमी की मध्यरात्रि और झूला',
    era: 'Midnights Across Generations',
    description: 'Fasting on sabudana and fruit all day, counting down till 12:00 midnight. The sudden eruption of conch shells, brass thali beating, rocking Bal Gopal gently in the velvet-lined swing (Palna), and waiting for Panchamrit & Makhan Mishri prasad.',
    sensoryDetail: 'Chilled sweet panchamrit with crushed tulsi, ringing temple bells echoing in the rain.',
    tag: 'Festive Bliss'
  },
  {
    id: 'mem-3',
    title: 'Grandmother’s Greeting & Brass Handi',
    hindiTitle: 'दादी की मीठी बोली: "जय श्री कृष्ण"',
    era: 'Morning Dawn • Brahma Muhurta',
    description: 'Waking up to the rhythmic clinking of brass bangles as grandmother churned fresh yogurt with a wooden mathani, singing Surdas bhajans under her breath. Answering the landline telephone with an instinctive, warm "Jai Shree Krishna".',
    sensoryDetail: 'Frothy fresh white butter skimming the wooden churn, morning bird songs at 5:30 AM.',
    tag: 'Heartwarming Home'
  },
  {
    id: 'mem-4',
    title: 'T-Series Bhajan Cassette on the Transistor',
    hindiTitle: 'फिलिप्स का रेडियो और अनुराधा पौडवाल की आवाज़',
    era: '1980s - 2000s Audio Tape Era',
    description: 'The distinct mechanical *clunk* of the tape deck button. Anup Jalota’s rich harmonium, Jagjit Singh’s soothing baritone, or Anuradha Paudwal’s morning aarti drifting through open wooden balcony windows as school bags were packed.',
    sensoryDetail: 'Whirring cassette reels, yellow dial light of the Philips two-in-one tape recorder.',
    tag: 'Audio Nostalgia'
  }
];

export const FLUTE_NOTES: FluteNote[] = [
  { key: '1', swara: 'सा (Sa)', freq: 261.63, western: 'C4', meaning: 'Shadja (The Foundation)' },
  { key: '2', swara: 'रे (Re)', freq: 293.66, western: 'D4', meaning: 'Rishabha (Vibrant Spirit)' },
  { key: '3', swara: 'ग (Ga)', freq: 329.63, western: 'E4', meaning: 'Gandhara (Sweetness)' },
  { key: '4', swara: 'म (Ma)', freq: 349.23, western: 'F4', meaning: 'Madhyama (Heart Center)' },
  { key: '5', swara: 'प (Pa)', freq: 392.00, western: 'G4', meaning: 'Panchama (Cosmic Flow)' },
  { key: '6', swara: 'ध (Dha)', freq: 440.00, western: 'A4', meaning: 'Dhaivata (Serene Grace)' },
  { key: '7', swara: 'नि (Ni)', freq: 493.88, western: 'B4', meaning: 'Nishada (Divine Union)' }
];

export const BRAJ_PHRASES = [
  { phrase: 'जय श्री कृष्ण', transliteration: 'Jai Shree Krishna', meaning: 'Victory & reverence to Lord Krishna' },
  { phrase: 'राधे राधे', transliteration: 'Radhe Radhe', meaning: 'The heartbeat of Vrindavan' },
  { phrase: 'माखन चोर', transliteration: 'Makhan Chor', meaning: 'He who steals not just butter, but hearts' },
  { phrase: 'मुरली मनोहर', transliteration: 'Murli Manohar', meaning: 'The enchanting flute bearer' },
  { phrase: 'गोविन्द बोलो', transliteration: 'Govind Bolo', meaning: 'Chant the name of the Cowherd King' },
  { phrase: 'यमुना तट', transliteration: 'Yamuna Teer', meaning: 'The sacred moonlit riverbanks of Braj' }
];
