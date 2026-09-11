/**
 * Eventora Centralized Events Dataset
 * Single source of truth for all events across the application.
 */

export const EVENTS_DATA = [
  {
    id: "future-tech-summit-2026",
    title: "Future Tech Summit 2026",
    category: "Technology",
    categoryColor: {
      bg: "#EDE8F5",
      text: "#4A3B69",
      badgeText: "#6E56CF",
    },
    date: "Friday, Sep 25, 2026",
    dateShort: "SEP 25",
    time: "9:00 AM – 6:00 PM IST",
    timeFormatted: "9:00 AM – 6:00 PM",
    month: "September",
    location: "Mumbai Convention Centre",
    locationShort: "Mumbai Convention Centre",
    city: "Mumbai",
    venue: "Mumbai Convention Centre, G Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051",
    price: 499,
    priceFormatted: "₹499",
    tierStandardPrice: 499,
    tierVipPrice: 1499,
    seatsLeft: 128,
    seatsText: "Almost full • 128 seats left",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UMLToh1N3tdDkMkjpQJyiKgdV1NJdzDJtzjpXlzxC6hYnwLKYoh6uXFYYS0InW_Wl7NeXN9SVJDg1JZVgbZPUCHwCj4y-PAVQlTPXP6HkH6l9O_qI0rqqVVhqVzLhGH2ZBNnUNhBR-S2jk5QIt3hFM88Y66cQCOlwacnPFgsj6dDmNGC0-oPKiyt13t13ILPHADoEeIAXdN1fvvfYxR3_lBHsI93nNyoYrw5mHiQT42bxJ9st8DBGNOg",
    secondaryImage: "https://lh3.googleusercontent.com/aida/AEtjO1WQtkMWbSC2Mc4HzBvQB8N64RG_M4tpLbXH_RhCNyv4LSzXkGDJQYo5ZXjxMVllNqQDve5lz0JgBCdottY7qTkQQjjJRe_e4ozoq1Svi6yDBYp291q7bMrgZ9iWCztI0x4--MWspbtzdU5YdKmYRbbvAoHAbOKQ8qIx9Pp6hf2d6INKniiKd4VgXxjfTmnGWOOuRpsks9uWIv1hRbHVuBEXR3J20g9IK3tso0MhyWHaW8ryIdrlOVBGBC4",
    tagline: "A one-day gathering exploring artificial intelligence, emerging technology and the people building what comes next.",
    about: [
      "The Future Tech Summit 2026 is India's premier symposium exploring the vanguard of generative intelligence, decentralized infrastructure, and next-generation product engineering. Held at Mumbai's iconic Convention Centre, the conference convenes developers, system architects, startup founders, and technical researchers under one roof.",
      "Designed explicitly for creators actively deploying code into production, the summit bypasses superficial tech trends to focus rigorously on architectural deconstructions, foundational models adapted for Indian regional scale, high-throughput cloud edge systems, and responsible automated governance.",
      "Whether you are an engineering director scaling infrastructure for hundreds of millions of users or a researcher pushing the limits of neural interfaces, you will experience immersive keynote dialogues, production post-mortems, and live interactive systems labs."
    ],
    whatToExpect: [
      { id: "01", text: "Keynote conversations with global and Indian AI pioneers." },
      { id: "02", text: "Hands-on sessions and technical architecture deep-dives." },
      { id: "03", text: "Industry perspectives on scaling enterprise AI responsibly." },
      { id: "04", text: "Curated networking opportunities with 1,200+ technology leaders." }
    ],
    schedule: [
      { time: "09:00 AM", title: "Registration & Networking Breakfast", desc: "Check-in at Grand Foyer, badge collection, and artisanal coffee bar.", color: "terracotta" },
      { time: "10:00 AM", title: "Opening Keynote: Beyond Large Language Models", desc: "Dr. Priya Ranganathan unpacks neuromorphic models and multimodal inference breakthroughs.", color: "charcoal" },
      { time: "11:15 AM", title: "The Future of AI in Indian Infrastructure", desc: "Vikram Sen presents regional edge clustering and data privacy compliant workloads.", color: "charcoal" },
      { time: "01:00 PM", title: "Curated Lunch & Roundtable Discussions", desc: "Topic-based breakout dining tables hosted by industry mentors.", color: "sage" },
      { time: "02:30 PM", title: "Hands-on Technology Showcase & Live Demos", desc: "Live architecture deconstructions with Ananya Mehta and Rohan Desai.", color: "charcoal" },
      { time: "04:00 PM", title: "Founder & Engineering Leadership Panel", desc: "Unfiltered strategies on scaling generative applications from 1M to 100M active requests.", color: "charcoal" },
      { time: "05:30 PM", title: "Closing Conversation & Networking Mixer", desc: "Open garden mixer with music and informal collaborator pairing.", color: "lavender" }
    ],
    speakers: [
      {
        name: "Dr. Priya Ranganathan",
        role: "Principal AI Researcher",
        company: "DeepFoundry Labs",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UpNmpJLF4CCIlyWHuKAzz2DcaTXpMOa0nIH15OLZBb2D8V_sJHfqlF39J_44KwAFXHQ8BuHBQlwTnDGq4oDJqmoXpW3wM1_q6mkm8CM91XRNyDOcFXYVWHo2K-FebMssTc8Hjq0SQciqWE9uM7981sYfIsuKQc8IP_I7J5lnUWO8tLrmqfZk9kWg6zs-9uBS2y9NxxRBNakSCsom50nTBjgAs7HHZJJafXtHxa8qoMiAesBGSlhjXLXBg"
      },
      {
        name: "Ananya Mehta",
        role: "VP Product",
        company: "Future Labs Inc.",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UOAeXmg-JtSt_mt-NRjFWBKG6Fr8nqU4FZKxMijDzwI6DanWnvglgRIgo8A0i0WpeOsjZrkxUVGgUdbukax3vM1PT93gGDRcs3VUGnfWbH9WUDSJsRxdQSbavhIdW1XZuGOlCJ8S-DXn1sbwMftRPRT1LXI5kFG2iTG9wWJYQTp_nzPeu2629Fom_0YydB0y1B56OucYycQTyfmde-7dNglLF-JJMNx2sy5CBk020CLKi40dUB4HK2rQ"
      },
      {
        name: "Rohan Desai",
        role: "Co-Founder & CTO",
        company: "NeuralStack Systems",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1VVL_JbpVJ5i2bDwSrgQszN-wR3UP9IIM1uqQUDicBMqjZwt7bOzbVlgCSrXV5jlNiFFdDId9Ta44JR4ztw276vxC0uMDMv-_9adlolQ7URJQwtzplyDPLT8uzfMdQSTmb0C4NbrtwlLB4DJ8_vUXNfrcMDtuVxDlVbY4gd0SFlRw0pID68F_pLX5HdBAij_YC6IkmY6GQ6-LcaC7CjhMybGBZ8FbdAE3q4yovXCLq-SXUkxvLQcxxTlYc"
      },
      {
        name: "Vikram Sen",
        role: "Engineering Director",
        company: "Bharat Cloud Platform",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1U9srkGgxZ3FpCLrU-kEvm9ckuOSdNVgMcIEqExzwhbTsj247EIK4kiACTuCHg2GZx_jox9RT7R3ZGg9ELY-8NKQMbhv6Bh-CF3FiFhXIZcXwroFwRu7gX3zJHiWNSpd-9PslsbOd345F1cqeEoVAXZGslt8xGHR8YgCUHMN-axwb_WnXI_z99QFCHDHRQSTSP3NKRiKtEsQehuMYiJGxMVcM8ovRFAuwzkVDKeGADBTlfs5QPysIR7xTk"
      }
    ],
    featured: true
  },
  {
    id: "intimate-acoustic-session-vinyl",
    title: "Intimate Acoustic Session & Vinyl",
    category: "Music",
    categoryColor: {
      bg: "#FCEEE6",
      text: "#6B351E",
      badgeText: "#B85D3B",
    },
    date: "Friday, Oct 02, 2026",
    dateShort: "OCT 02",
    time: "7:30 PM – 10:30 PM IST",
    timeFormatted: "7:30 PM – 10:30 PM",
    month: "October",
    location: "Subterranean Music Hall",
    locationShort: "Subterranean Music Hall",
    city: "Mumbai",
    venue: "Subterranean Music Hall, Below Apollo Pier, Colaba, Mumbai 400001",
    price: 350,
    priceFormatted: "₹350",
    tierStandardPrice: 350,
    tierVipPrice: 850,
    seatsLeft: 34,
    seatsText: "Limited seating • 34 seats left",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLD2WJaZG2Dljyls7FJVNXxQehJmpf2AJKZ8oV4Jqniz9mNYX-O1EFa-JvOvF6Uv9tVjNXz3MVRIOmOVVPLBnGAdnD1krDHDKUuomMft7i8BNQMncf6hZMG_Do34r-jk0Gc0Ddqd1de4l2J0aLOTFCtPrStM9ab67ICP6k8PTz2YBtOzMF1MMGI4Xrzd6jlMWSJUrKhOXODUfG__AiOceI0elwRVCbfgsKbpTUwNJwgopXp-BnX4vL",
    secondaryImage: "https://lh3.googleusercontent.com/aida/AEtjO1ULmlNSVmKSBsicUAPhyHs3ibu6Q_zg6oTvB_0ATSrKF52oupQBYZZ26X3GfR9iFqbJiVIzbuHxfg0gTz-IAEUjz8yb2ywxgusbtn1_Ud-97fIZGntjlb8LnLDV283zwayNK3PpWvaX7zjGW1CxMyFH-vUTjn-22kxE9wv59UNN6LM80A9TulY7hxlYaEOQ5jj5G20e9agOlpdz-PMn8qtwGJd31WmcodaX_268RvJHWqOngjuA3A_NWQ",
    tagline: "An intimate acoustic showcase bringing independent singer-songwriters together for a night of soulful melodies and analog vinyl listening.",
    about: [
      "The Intimate Acoustic Session & Vinyl is an unplugged, high-fidelity live music experience dedicated to the purest sound reproduction. Set in the warm vaulted basement of Subterranean Music Hall, this night offers an antidote to loud arenas.",
      "Featuring pristine vocal clarity, vintage analog instruments, and candid storytelling behind every lyric, the session brings together celebrated acoustic musicians.",
      "Guests enjoy handcrafted beverages, artisan bites, and an evening designed around genuine listening culture."
    ],
    whatToExpect: [
      { id: "01", text: "Unplugged original compositions with acoustic guitar, upright bass, and cello." },
      { id: "02", text: "Intimate artist discussions on songwriting and analog production." },
      { id: "03", text: "Limited capacity listening room with pristine audio acoustics." },
      { id: "04", text: "Post-session vinyl listening lounge & musician mixer." }
    ],
    schedule: [
      { time: "07:30 PM", title: "Doors Open & Warm Ambient Vinyl", desc: "Seating, bespoke beverage service, and turntable warmups.", color: "peach" },
      { time: "08:15 PM", title: "Opening Set: Eliza Grace", desc: "Contemporary folk storytelling with acoustic 12-string.", color: "charcoal" },
      { time: "09:15 PM", title: "Acoustic Showcase: Prateek & Siddharth", desc: "Soulful vocal harmonies, upright bass, and percussion.", color: "charcoal" },
      { time: "10:00 PM", title: "Vinyl Listening & Musician Mixer", desc: "Rare 70s folk-rock vinyl playback on custom tube amplifiers.", color: "sage" }
    ],
    speakers: [
      {
        name: "Eliza Grace",
        role: "Singer-Songwriter",
        company: "Subterranean Collective",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UOAeXmg-JtSt_mt-NRjFWBKG6Fr8nqU4FZKxMijDzwI6DanWnvglgRIgo8A0i0WpeOsjZrkxUVGgUdbukax3vM1PT93gGDRcs3VUGnfWbH9WUDSJsRxdQSbavhIdW1XZuGOlCJ8S-DXn1sbwMftRPRT1LXI5kFG2iTG9wWJYQTp_nzPeu2629Fom_0YydB0y1B56OucYycQTyfmde-7dNglLF-JJMNx2sy5CBk020CLKi40dUB4HK2rQ"
      },
      {
        name: "Prateek Bhaduri",
        role: "Multi-Instrumentalist",
        company: "Acoustic Sessions Studio",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1VVL_JbpVJ5i2bDwSrgQszN-wR3UP9IIM1uqQUDicBMqjZwt7bOzbVlgCSrXV5jlNiFFdDId9Ta44JR4ztw276vxC0uMDMv-_9adlolQ7URJQwtzplyDPLT8uzfMdQSTmb0C4NbrtwlLB4DJ8_vUXNfrcMDtuVxDlVbY4gd0SFlRw0pID68F_pLX5HdBAij_YC6IkmY6GQ6-LcaC7CjhMybGBZ8FbdAE3q4yovXCLq-SXUkxvLQcxxTlYc"
      }
    ],
    featured: true
  },
  {
    id: "typography-layout-systems-lab",
    title: "Typography & Layout Systems Lab",
    category: "Design",
    categoryColor: {
      bg: "#FEF6E4",
      text: "#524410",
      badgeText: "#B47818",
    },
    date: "Tuesday, Oct 06, 2026",
    dateShort: "OCT 06",
    time: "10:00 AM – 2:00 PM IST",
    timeFormatted: "10:00 AM – 2:00 PM",
    month: "October",
    location: "Apex Co-Creative Space",
    locationShort: "Apex Co-Creative Space",
    city: "Bangalore",
    venue: "Apex Co-Creative Space, 4th Floor, 100 Feet Rd, Indiranagar, Bengaluru, Karnataka 560038",
    price: 650,
    priceFormatted: "₹650",
    tierStandardPrice: 650,
    tierVipPrice: 1250,
    seatsLeft: 26,
    seatsText: "Limited workshop • 26 spots remaining",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1U_Yi4c6wO9s_5LyqeXlVxptZMgWiFzNa41_4WtaGcijzLfrnTDZD5ZXndOTdtVvoSDBmWAWai1pXNDakhPXdyK56OpirtMcNTerct-VkY63iASYGoFbAmn4S0nZ-DBRYDbnSufq2Z0xVuic5Uo0kX5t0uaUpH38BoYlEiMr1ZnVVdacquoYnrSoq5StOopvGRFoe2P5H-LRX2g1-82Lzi_mZ3Fpw3UDWAPIoI9mo2Eg2M1MGI03O3KJJU",
    secondaryImage: "https://lh3.googleusercontent.com/aida/AEtjO1VxftCs7GdoAvGhzH21eCSr6_Gv8JVg5mZwviLHZ8yZzUWKBBMf6wScGsCKnuHssB2VXwRfYKw7VtNwp6ttqgrFFTdsrIOucYK1OrWKOz_URNLbrM7u6_fjH5KSm9bjKSnh-sCh7FwLcVmjOMbTzr1ogXxEq9nvKDpRUyPnH9uqX9LHk9X5zTrhJfngzlAuhbA_j0QGpB7UVnokHs0egB4_y1sawFNokoRlqdnYsDq0S5OJXymahGoIwBc",
    tagline: "Hands-on Swiss typography, mathematical grid systems, and modular layout engineering for modern designers.",
    about: [
      "The Typography & Layout Systems Lab is an intensive masterclass exploring the mathematical precision of the International Typographic Style adapted for contemporary digital and print systems.",
      "Conducted at Apex Co-Creative Space, participants work through typographic scales, optical baseline alignment, micro-interactions, and responsive layout constraints.",
      "Each attendee receives a screen-printed poster toolkit, physical layout rulers, and digital grid templates for Figma and CSS."
    ],
    whatToExpect: [
      { id: "01", text: "Deep dive into modular scales, line lengths, and optical kerning." },
      { id: "02", text: "Physical grid layout exercises with risograph prints." },
      { id: "03", text: "Constructing programmatic CSS subgrid and CSS clamp scales." },
      { id: "04", text: "Portfolio crit and Swiss design poster showcase." }
    ],
    schedule: [
      { time: "10:00 AM", title: "The Geometry of Type", desc: "History of modernist grids, proportions, and whitespace.", color: "butter" },
      { time: "11:15 AM", title: "Hands-on Layout Challenge", desc: "Crafting editorial poster hierarchies with analog tools.", color: "charcoal" },
      { time: "12:30 PM", title: "Digital Translation & Responsive Rules", desc: "Bridging print grid perfection into robust web code.", color: "charcoal" },
      { time: "01:30 PM", title: "Exhibition & Individual Crits", desc: "Group review and screenprint print takeaway.", color: "terracotta" }
    ],
    speakers: [
      {
        name: "Arjun M.",
        role: "Design Principal",
        company: "Studio Obsidian",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1VVL_JbpVJ5i2bDwSrgQszN-wR3UP9IIM1uqQUDicBMqjZwt7bOzbVlgCSrXV5jlNiFFdDId9Ta44JR4ztw276vxC0uMDMv-_9adlolQ7URJQwtzplyDPLT8uzfMdQSTmb0C4NbrtwlLB4DJ8_vUXNfrcMDtuVxDlVbY4gd0SFlRw0pID68F_pLX5HdBAij_YC6IkmY6GQ6-LcaC7CjhMybGBZ8FbdAE3q4yovXCLq-SXUkxvLQcxxTlYc"
      }
    ],
    featured: true
  },
  {
    id: "urban-architecture-archive-tour",
    title: "Urban Architecture Archive Tour",
    category: "Culture",
    categoryColor: {
      bg: "#EAF2EC",
      text: "#1D4427",
      badgeText: "#3B6E47",
    },
    date: "Wednesday, Oct 14, 2026",
    dateShort: "OCT 14",
    time: "4:00 PM – 7:00 PM IST",
    timeFormatted: "4:00 PM – 7:00 PM",
    month: "October",
    location: "Heritage Quarter Steps",
    locationShort: "Heritage Quarter Steps",
    city: "Mumbai",
    venue: "Heritage Quarter Steps, Asiatic Society steps, Fort, Mumbai, Maharashtra 400001",
    price: 289,
    priceFormatted: "₹289",
    tierStandardPrice: 289,
    tierVipPrice: 689,
    seatsLeft: 18,
    seatsText: "Limited walk • 18 spots left",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tagline: "A curated evening walking tour exploring Victorian Gothic, Art Deco, and Brutalist civic structures across Mumbai's historical core.",
    about: [
      "The Urban Architecture Archive Tour invites enthusiasts, architects, and urban observers into the stories etched into limestone, teak, and red basalt.",
      "Beginning at the iconic Asiatic Society steps, architectural historian Meenakshi Rathore guides an intimate group through hidden courtyards, spiral stairwells, and archives typically closed to the general public.",
      "The walk concludes with sunset rooftop tea overlooking the Horniman Circle gardens with commemorative blueprint prints."
    ],
    whatToExpect: [
      { id: "01", text: "Exclusive access to private colonial and Art Deco archive rooms." },
      { id: "02", text: "Architectural photography guidance during golden hour." },
      { id: "03", text: "In-depth storytelling on South Bombay's urban planning history." },
      { id: "04", text: "High-grade archival blueprint booklet and sunset tea." }
    ],
    schedule: [
      { time: "04:00 PM", title: "Assembly at Asiatic Steps", desc: "Briefing and distribution of archival maps and audio earpieces.", color: "sage" },
      { time: "04:45 PM", title: "Ballard Estate & Art Deco Facades", desc: "Decentering European tropes in Bombay Deco craftsmanship.", color: "charcoal" },
      { time: "05:45 PM", title: "The Secret Archive Vaults", desc: "Viewing 18th-century architectural maps and linen drawings.", color: "charcoal" },
      { time: "06:30 PM", title: "Rooftop Discussion & Sunset Tea", desc: "Q&A with preservation advocates over artisanal chai.", color: "terracotta" }
    ],
    speakers: [
      {
        name: "Meenakshi Rathore",
        role: "Architectural Historian",
        company: "Preservation Trust",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UpNmpJLF4CCIlyWHuKAzz2DcaTXpMOa0nIH15OLZBb2D8V_sJHfqlF39J_44KwAFXHQ8BuHBQlwTnDGq4oDJqmoXpW3wM1_q6mkm8CM91XRNyDOcFXYVWHo2K-FebMssTc8Hjq0SQciqWE9uM7981sYfIsuKQc8IP_I7J5lnUWO8tLrmqfZk9kWg6zs-9uBS2y9NxxRBNakSCsom50nTBjgAs7HHZJJafXtHxa8qoMiAesBGSlhjXLXBg"
      }
    ],
    featured: false
  },
  {
    id: "tactile-ceramics-wheel-throwing",
    title: "Tactile Ceramics & Wheel Throwing",
    category: "Workshops",
    categoryColor: {
      bg: "#FCEEE6",
      text: "#6B351E",
      badgeText: "#B85D3B",
    },
    date: "Sunday, Oct 18, 2026",
    dateShort: "OCT 18",
    time: "11:00 AM – 3:00 PM IST",
    timeFormatted: "11:00 AM – 3:00 PM",
    month: "October",
    location: "Clayworks Atelier",
    locationShort: "Clayworks Atelier",
    city: "Mumbai",
    venue: "Clayworks Atelier, Unit 12, Mathuradas Mills Compound, Lower Parel, Mumbai, Maharashtra 400013",
    price: 850,
    priceFormatted: "₹850",
    tierStandardPrice: 850,
    tierVipPrice: 1550,
    seatsLeft: 14,
    seatsText: "Almost booked • 14 spots left",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    tagline: "A hands-on mindful pottery workshop exploring wheel throwing, centering stoneware clay, and organic glazing techniques.",
    about: [
      "Tactile Ceramics & Wheel Throwing is a calming, sensory immersion into studio pottery inside the historic mill compound of Lower Parel.",
      "Guided by master potters, each participant receives their own electric potter's wheel and 4kg of premium terracotta and stoneware clay. You will learn centering, opening, pulling cylinders, and shaping functional vessels.",
      "All pieces are kiln-fired, glazed in studio mineral colors, and safely packaged for collection or delivery within two weeks."
    ],
    whatToExpect: [
      { id: "01", text: "Dedicated potter's wheel for every registered participant." },
      { id: "02", text: "Master instruction on hand-centering and pulling vessel walls." },
      { id: "03", text: "Kiln-firing and food-safe mineral glaze coating for up to 3 pieces." },
      { id: "04", text: "Artisan apron, studio tools, and herbal tea refreshments included." }
    ],
    schedule: [
      { time: "11:00 AM", title: "Studio Welcome & Clay Wedging", desc: "Understanding moisture, clay physics, and spiral wedging.", color: "peach" },
      { time: "11:45 AM", title: "Centering & The First Pull", desc: "Live wheel demonstration followed by 90 minutes of guided practice.", color: "charcoal" },
      { time: "01:30 PM", title: "Trimming & Surface Texturing", desc: "Applying chattering, ribs, and carved botanic linework.", color: "charcoal" },
      { time: "02:30 PM", title: "Glaze Selection & Studio Tea", desc: "Choosing reactive glazes and kiln prep over warm tea.", color: "sage" }
    ],
    speakers: [
      {
        name: "Shalini Rao",
        role: "Studio Founder & Master Ceramist",
        company: "Clayworks Atelier",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UOAeXmg-JtSt_mt-NRjFWBKG6Fr8nqU4FZKxMijDzwI6DanWnvglgRIgo8A0i0WpeOsjZrkxUVGgUdbukax3vM1PT93gGDRcs3VUGnfWbH9WUDSJsRxdQSbavhIdW1XZuGOlCJ8S-DXn1sbwMftRPRT1LXI5kFG2iTG9wWJYQTp_nzPeu2629Fom_0YydB0y1B56OucYycQTyfmde-7dNglLF-JJMNx2sy5CBk020CLKi40dUB4HK2rQ"
      }
    ],
    featured: false
  },
  {
    id: "independent-photo-forum-exhibition",
    title: "Independent Photo Forum Exhibition",
    category: "Culture",
    categoryColor: {
      bg: "#FBEBED",
      text: "#5E2937",
      badgeText: "#A83C50",
    },
    date: "Thursday, Oct 22, 2026",
    dateShort: "OCT 22",
    time: "6:00 PM – 9:30 PM IST",
    timeFormatted: "6:00 PM – 9:30 PM",
    month: "October",
    location: "Whitebox Pavilion",
    locationShort: "Whitebox Pavilion",
    city: "Mumbai",
    venue: "Whitebox Pavilion Gallery, Ground Floor, 14 K. Dubash Marg, Kala Ghoda, Fort, Mumbai 400001",
    price: 0,
    priceFormatted: "Free",
    tierStandardPrice: 0,
    tierVipPrice: 499,
    seatsLeft: 85,
    seatsText: "RSVP Open • 85 spots left",
    image: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=1200&q=80",
    tagline: "An evening gallery vernissage showcasing documentary, street, and analog photography from 20 emerging South Asian photographers.",
    about: [
      "The Independent Photo Forum Exhibition marks the opening night of our autumn showcase in the heart of Kala Ghoda.",
      "Spanning two expansive light-filled gallery floors, the curation highlights raw documentary essays, medium-format black-and-white portraits, and surrealist night landscapes.",
      "The opening vernissage includes artist talks, photobook signings, and music in the gallery courtyard."
    ],
    whatToExpect: [
      { id: "01", text: "Over 90 framed prints by 20 contemporary documentary photographers." },
      { id: "02", text: "Artist walk-throughs discussing visual sequencing and darkroom printing." },
      { id: "03", text: "Photobook pop-up shop featuring limited self-published zines." },
      { id: "04", text: "Complimentary gallery refreshments and courtyard ambient music." }
    ],
    schedule: [
      { time: "06:00 PM", title: "Gallery Doors Open & Exhibition Preview", desc: "First look at exhibition walls with ambient soundscapes.", color: "rose" },
      { time: "07:00 PM", title: "Curatorial Remarks & Artist Introductions", desc: "Welcome address by curator Kabir Varma and participating photographers.", color: "charcoal" },
      { time: "08:00 PM", title: "Darkroom Stories: Panel Discussion", desc: "The resurgence of silver gelatin prints and medium format film.", color: "charcoal" },
      { time: "09:00 PM", title: "Courtyard Mixer & Photobook Signing", desc: "Meet the artists with natural wine and artisan snacks.", color: "peach" }
    ],
    speakers: [
      {
        name: "Kabir Varma",
        role: "Lead Curator",
        company: "Whitebox Photo Forum",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UpNmpJLF4CCIlyWHuKAzz2DcaTXpMOa0nIH15OLZBb2D8V_sJHfqlF39J_44KwAFXHQ8BuHBQlwTnDGq4oDJqmoXpW3wM1_q6mkm8CM91XRNyDOcFXYVWHo2K-FebMssTc8Hjq0SQciqWE9uM7981sYfIsuKQc8IP_I7J5lnUWO8tLrmqfZk9kWg6zs-9uBS2y9NxxRBNakSCsom50nTBjgAs7HHZJJafXtHxa8qoMiAesBGSlhjXLXBg"
      }
    ],
    featured: false
  },
  {
    id: "jaipur-arts-weekend",
    title: "Jaipur Arts Weekend",
    category: "Culture",
    categoryColor: {
      bg: "#F2D9DF",
      text: "#5E2937",
      badgeText: "#9C5064",
    },
    date: "Friday, Oct 09, 2026",
    dateShort: "OCT 09",
    time: "11:00 AM – 7:00 PM IST",
    month: "October",
    location: "Jawahar Kala Kendra, Jaipur",
    city: "Jaipur",
    venue: "Jawahar Kala Kendra, 2, Gandhi Nagar, Jaipur, Rajasthan 302015",
    price: 299,
    priceFormatted: "₹299",
    tierStandardPrice: 299,
    tierVipPrice: 799,
    seatsLeft: 95,
    seatsText: "95 passes available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIvJysvkemBWqD2d9d8vai-3N3fuJyBfs-gSPmsYeRx16xCDAIZAsBlHO7ZpUutoYvqa_JobD3pzbjiT9BYpugPP9MaNYGl1JEnTtlc9v6rM5RMQQl62qbWE6j8Bl6M_xIMTmMbiovgzaIiPjeu1GB_OFIfhbVT8nqXc0LqCx662_RxDGHKc1kTZPeVo2PwOzlCPNX_UjjFyG_RJpg1UPNkXGcUMzD0EaJfjKkpFMp6IFcSevaYKW-",
    secondaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIvJysvkemBWqD2d9d8vai-3N3fuJyBfs-gSPmsYeRx16xCDAIZAsBlHO7ZpUutoYvqa_JobD3pzbjiT9BYpugPP9MaNYGl1JEnTtlc9v6rM5RMQQl62qbWE6j8Bl6M_xIMTmMbiovgzaIiPjeu1GB_OFIfhbVT8nqXc0LqCx662_RxDGHKc1kTZPeVo2PwOzlCPNX_UjjFyG_RJpg1UPNkXGcUMzD0EaJfjKkpFMp6IFcSevaYKW-",
    tagline: "Celebrating craft, block printing, architectural photography, and experimental theater in the Pink City.",
    about: [
      "Jaipur Arts Weekend occupies Charles Correa's iconic red sandstone pavilions at Jawahar Kala Kendra for three days of contemporary visual art, heritage handcraft preservation, and experimental sound.",
      "The program pairs traditional block-printing masters with digital generative artists, celebrating Rajasthani geometry through modern visual lenses.",
      "Explore courtyard exhibitions, attend textile workshops, and enjoy evening open-air classical-fusion recitals."
    ],
    whatToExpect: [
      { id: "01", text: "Curated gallery installations by 24 national and international artists." },
      { id: "02", text: "Master block-printing and natural dye lab with hands-on scarf crafting." },
      { id: "03", text: "Architectural heritage photo walk guided by preservation historians." },
      { id: "04", text: "Sundown acoustic ragas in the open amphitheater." }
    ],
    schedule: [
      { time: "11:00 AM", title: "Gallery Walk & Exhibition Preview", desc: "Explore newly commissioned textile installations across 4 galleries.", color: "rose" },
      { time: "02:00 PM", title: "Natural Pigments Workshop", desc: "Prepare indigo, madder, and turmeric dye baths with Bagru master craftsmen.", color: "charcoal" },
      { time: "05:00 PM", title: "Panel: Contemporary Indian Visual Identity", desc: "Conversations on reimagining South Asian motifs in modern design.", color: "charcoal" },
      { time: "06:30 PM", title: "Amphitheater Twilight Recital", desc: "Sitar and handpan musical union under the evening sky.", color: "lavender" }
    ],
    speakers: [
      {
        name: "Meenakshi Rathore",
        role: "Curatorial Director",
        company: "Jaipur Heritage Arts",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UpNmpJLF4CCIlyWHuKAzz2DcaTXpMOa0nIH15OLZBb2D8V_sJHfqlF39J_44KwAFXHQ8BuHBQlwTnDGq4oDJqmoXpW3wM1_q6mkm8CM91XRNyDOcFXYVWHo2K-FebMssTc8Hjq0SQciqWE9uM7981sYfIsuKQc8IP_I7J5lnUWO8tLrmqfZk9kWg6zs-9uBS2y9NxxRBNakSCsom50nTBjgAs7HHZJJafXtHxa8qoMiAesBGSlhjXLXBg"
      }
    ],
    featured: false
  },
  {
    id: "creative-coding-workshop-pune",
    title: "Creative Coding Workshop Pune",
    category: "Workshops",
    categoryColor: {
      bg: "#E9E2F8",
      text: "#3E2568",
      badgeText: "#795DA8",
    },
    date: "Monday, Oct 12, 2026",
    dateShort: "OCT 12",
    time: "2:00 PM – 7:00 PM IST",
    month: "October",
    location: "Design & Innovation Lab, Pune",
    city: "Pune",
    venue: "Design & Innovation Lab, Senapati Bapat Road, Shivaji Nagar, Pune, Maharashtra 411016",
    price: 599,
    priceFormatted: "₹599",
    tierStandardPrice: 599,
    tierVipPrice: 1299,
    seatsLeft: 22,
    seatsText: "Small batch • 22 seats remaining",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UXN2z6WyOpmyqOTI9bBfgVA_nyWu8Kh-iw1uKtrfS-L--i-XHBYhRisDz0RhoTgkgiSEOrs0GguY7CWyZLHRasJXPkbln-Hsq8kpWl4MebR7gzA70EJYSvApdrmCXsKa-7Qn7-e3YgVm1bTWn9SgVPZRkK7y-WOWGEpNOXRXqftAX9sMWbebW93xv1Ee9ODFpsBcdi_e5fbHLHfywCpgsd4_gi1RDoyfLK22p70j5tV4FFeJSF87Lr1B4",
    secondaryImage: "https://lh3.googleusercontent.com/aida/AEtjO1UXN2z6WyOpmyqOTI9bBfgVA_nyWu8Kh-iw1uKtrfS-L--i-XHBYhRisDz0RhoTgkgiSEOrs0GguY7CWyZLHRasJXPkbln-Hsq8kpWl4MebR7gzA70EJYSvApdrmCXsKa-7Qn7-e3YgVm1bTWn9SgVPZRkK7y-WOWGEpNOXRXqftAX9sMWbebW93xv1Ee9ODFpsBcdi_e5fbHLHfywCpgsd4_gi1RDoyfLK22p70j5tV4FFeJSF87Lr1B4",
    tagline: "Hands-on generative art, shader programming, and algorithmic patterns for frontend developers and digital artists.",
    about: [
      "The Creative Coding Workshop Pune is an intensive 5-hour interactive lab designed for engineers who want to make code visually compelling. Moving beyond standard web UI frameworks, we dive into WebGL, Three.js, GLSL shaders, and procedural physics.",
      "Bring your laptop, clone our starter repos, and leave with working generative systems, mathematical flower algorithms, and interactive cursor physics ready for your portfolio.",
      "Mentored by top generative engineers with full personalized debugging support throughout."
    ],
    whatToExpect: [
      { id: "01", text: "Deep dive into canvas 2D math, trigonometry, and Perlin noise." },
      { id: "02", text: "GLSL fragment shader pipelines from scratch." },
      { id: "03", text: "Procedural generative Indian rangoli algorithmic generation." },
      { id: "04", text: "Exporting high-resolution vector SVGs and interactive WebGL canvas." }
    ],
    schedule: [
      { time: "02:00 PM", title: "Setup, Syntax & The Generative Mindset", desc: "Vectors, coordinate transformations, and basic loops.", color: "lavender" },
      { time: "03:15 PM", title: "Noise, Particles & Mathematical Flow Fields", desc: "Simulating organic movement with curl noise.", color: "charcoal" },
      { time: "04:30 PM", title: "Shaders 101: GPU Parallel Aesthetics", desc: "Raymarching fundamentals and color mixing on GPU.", color: "charcoal" },
      { time: "06:00 PM", title: "Show & Tell + Portfolio Feedback", desc: "Project critiques and resource repository handoff.", color: "sage" }
    ],
    speakers: [
      {
        name: "Rohan Desai",
        role: "Co-Founder & CTO",
        company: "NeuralStack Systems",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1VVL_JbpVJ5i2bDwSrgQszN-wR3UP9IIM1uqQUDicBMqjZwt7bOzbVlgCSrXV5jlNiFFdDId9Ta44JR4ztw276vxC0uMDMv-_9adlolQ7URJQwtzplyDPLT8uzfMdQSTmb0C4NbrtwlLB4DJ8_vUXNfrcMDtuVxDlVbY4gd0SFlRw0pID68F_pLX5HdBAij_YC6IkmY6GQ6-LcaC7CjhMybGBZ8FbdAE3q4yovXCLq-SXUkxvLQcxxTlYc"
      }
    ],
    featured: false
  },
  {
    id: "city-marathon-mumbai",
    title: "Marine Drive Coastal Run",
    category: "Sports",
    categoryColor: {
      bg: "#DCE9DF",
      text: "#1D4427",
      badgeText: "#4D7C5D",
    },
    date: "Sunday, Oct 18, 2026",
    dateShort: "OCT 18",
    time: "5:30 AM – 9:30 AM IST",
    month: "October",
    location: "Marine Drive Promenade, Mumbai",
    city: "Mumbai",
    venue: "Starts at Nariman Point Promenade, Marine Drive, Mumbai, Maharashtra 400021",
    price: 350,
    priceFormatted: "₹350",
    tierStandardPrice: 350,
    tierVipPrice: 850,
    seatsLeft: 450,
    seatsText: "Registration closing soon",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    tagline: "Experience the brisk sunrise breeze along Mumbai's Queen's Necklace with 1,500 enthusiastic runners.",
    about: [
      "The Marine Drive Coastal Run is Mumbai's premier timed sunrise run, offering certified 10K and 5K courses along the iconic Arabian Sea coastline.",
      "Open to beginner runners and seasoned marathoners alike, the course is completely vehicular-traffic free, supported by hydration stations every 1.5km and live percussion squads to keep your pace high.",
      "Includes chip-timing bib, finisher medal, dry-fit event jersey, and warm South Indian breakfast at the finish line."
    ],
    whatToExpect: [
      { id: "01", text: "Officially measured and chip-timed 5K and 10K scenic routes." },
      { id: "02", text: "Pre-race dynamic warm-up led by professional athletic coaches." },
      { id: "03", text: "High-energy rhythm squads along the route." },
      { id: "04", text: "Commemorative metal finisher medal and hot breakfast." }
    ],
    schedule: [
      { time: "05:00 AM", title: "Bib Collection & Warmup", desc: "Zumba warmup and bag drop at Nariman Point.", color: "sage" },
      { time: "05:45 AM", title: "10K Flag-Off", desc: "Chipped runners begin seaside route towards Girgaon.", color: "charcoal" },
      { time: "06:15 AM", title: "5K Fun Run Flag-Off", desc: "Open runners and walkers start coastal loop.", color: "charcoal" },
      { time: "07:30 AM", title: "Medals, Breakfast & Podium Ceremony", desc: "Celebrating age category winners with fresh coastal breakfast.", color: "peach" }
    ],
    speakers: [
      {
        name: "Tanvi Shekhawat",
        role: "Race Director & Triathlete",
        company: "Mumbai Running Co.",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UOAeXmg-JtSt_mt-NRjFWBKG6Fr8nqU4FZKxMijDzwI6DanWnvglgRIgo8A0i0WpeOsjZrkxUVGgUdbukax3vM1PT93gGDRcs3VUGnfWbH9WUDSJsRxdQSbavhIdW1XZuGOlCJ8S-DXn1sbwMftRPRT1LXI5kFG2iTG9wWJYQTp_nzPeu2629Fom_0YydB0y1B56OucYycQTyfmde-7dNglLF-JJMNx2sy5CBk020CLKi40dUB4HK2rQ"
      }
    ],
    featured: false
  },
  {
    id: "product-leaders-meetup",
    title: "Product Leaders Forum Bangalore",
    category: "Business",
    categoryColor: {
      bg: "#F4E8B8",
      text: "#524410",
      badgeText: "#8C7424",
    },
    date: "Thursday, Oct 22, 2026",
    dateShort: "OCT 22",
    time: "6:00 PM – 9:30 PM IST",
    month: "October",
    location: "The Grand Hall, Koramangala, Bangalore",
    city: "Bangalore",
    venue: "The Grand Hall, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    price: 450,
    priceFormatted: "₹450",
    tierStandardPrice: 450,
    tierVipPrice: 1150,
    seatsLeft: 60,
    seatsText: "60 passes remaining",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Uncensored discussions on product strategy, retention loops, and team dynamics among senior tech leaders.",
    about: [
      "Product Leaders Forum brings together VP Products, Group PMs, and Senior Engineering Leads for frank Chatham House Rule discussions on navigating growth in challenging markets.",
      "Expect zero corporate jargon and no generic frameworks: speakers share real operational dashboards, pivot post-mortems, and team restructuring learnings.",
      "Held in Koramangala with dinner and curated networking sessions."
    ],
    whatToExpect: [
      { id: "01", text: "Three deep-dive case studies on scaling consumer apps in India." },
      { id: "02", text: "Curated peer problem-solving roundtables with 8 peers per table." },
      { id: "03", text: "Retention analytics and pricing experimentation teardowns." },
      { id: "04", text: "Executive dinner and drinks included." }
    ],
    schedule: [
      { time: "06:00 PM", title: "Welcome Drinks & Table Assignment", desc: "Peer matching based on product scale and sector.", color: "butter" },
      { time: "06:45 PM", title: "Unpacking the 0-1 vs 1-100 Transition", desc: "Keynote by Ananya Mehta on organizational shifts.", color: "charcoal" },
      { time: "07:45 PM", title: "Chatham House Roundtables", desc: "Uncensored discussion on product failures and turnarounds.", color: "charcoal" },
      { time: "08:45 PM", title: "Dinner & Informal Networking", desc: "Curated connections over artisanal dinner.", color: "sage" }
    ],
    speakers: [
      {
        name: "Ananya Mehta",
        role: "VP Product",
        company: "Future Labs Inc.",
        image: "https://lh3.googleusercontent.com/aida/AEtjO1UOAeXmg-JtSt_mt-NRjFWBKG6Fr8nqU4FZKxMijDzwI6DanWnvglgRIgo8A0i0WpeOsjZrkxUVGgUdbukax3vM1PT93gGDRcs3VUGnfWbH9WUDSJsRxdQSbavhIdW1XZuGOlCJ8S-DXn1sbwMftRPRT1LXI5kFG2iTG9wWJYQTp_nzPeu2629Fom_0YydB0y1B56OucYycQTyfmde-7dNglLF-JJMNx2sy5CBk020CLKi40dUB4HK2rQ"
      }
    ],
    featured: false
  }
];

