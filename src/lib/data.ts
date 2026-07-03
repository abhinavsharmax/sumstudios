export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: string;
  description: string;
  coverImage: string;
  images: string[];
  area: string;
  client: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: string;
  author: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  tag: string;
  material: string;
  dimensions: string;
}

// Unsplash architectural photography
export const PROJECTS: Project[] = [
  {
    slug: 'pavilion-vayu',
    title: 'Pavilion Vayu',
    category: 'Cultural',
    location: 'Jaipur, India',
    year: '2025',
    status: 'Completed',
    description: 'A meditative pavilion woven from local sandstone and compressed earth, designed to dissolve the boundary between habitation and landscape.',
    coverImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&auto=format&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=85',
    ],
    area: '640 m²',
    client: 'Jaipur Arts Foundation',
  },
  {
    slug: 'residence-kanav',
    title: 'Residence Kanav',
    category: 'Residential',
    location: 'Alibaug, India',
    year: '2024',
    status: 'Completed',
    description: 'A coastal retreat where tidal rhythms dictate orientation. Raw concrete terraces step down to meet the sea, framing horizon as architecture.',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=85',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=85',
    ],
    area: '420 m²',
    client: 'Private',
  },
  {
    slug: 'atelier-mira',
    title: 'Atelier Mira',
    category: 'Commercial',
    location: 'Mumbai, India',
    year: '2024',
    status: 'Completed',
    description: 'A fashion atelier where light is the primary material. North-facing glazing floods workspaces with diffused luminosity throughout the day.',
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=85',
    images: [],
    area: '280 m²',
    client: 'Mira House',
  },
  {
    slug: 'tower-okha',
    title: 'Tower Okha',
    category: 'Mixed-Use',
    location: 'Ahmedabad, India',
    year: '2026',
    status: 'Under Construction',
    description: "A vertical community in Gujarat's textile capital — 24 floors of living, working, and making, wrapped in a perforated terracotta skin.",
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=85',
    images: [],
    area: '18,400 m²',
    client: 'Okha Developers',
  },
  {
    slug: 'library-of-light',
    title: 'Library of Light',
    category: 'Civic',
    location: 'Chandigarh, India',
    year: '2025',
    status: 'Completed',
    description: 'A public library conceived as a lantern — translucent walls of polycarbonate and timber allow the institution to glow as a beacon at night.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=85',
    images: [],
    area: '1,200 m²',
    client: 'Chandigarh Municipal Corporation',
  },
  {
    slug: 'studio-suryavansh',
    title: 'Studio Suryavansh',
    category: 'Residential',
    location: 'Bengaluru, India',
    year: '2023',
    status: 'Completed',
    description: "An artist's live-work studio embedded in a dense urban plot. A double-height void at the centre organises light, air, and movement.",
    coverImage: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1200&auto=format&fit=crop&q=85',
    images: [],
    area: '210 m²',
    client: 'Private',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'on-light-as-material',
    title: 'On Light as Material',
    category: 'Philosophy',
    date: 'June 2026',
    readTime: '7 min',
    excerpt: 'Light is not decoration — it is the first and final material in architectural composition. We consider how studios from Aalto to Zumthor have wielded it.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=85',
    author: 'Anika Sharma',
    content: `
      <p>In the Baroque tradition, light was theatrical. It entered from hidden sources, sculpted masses, and directed devotion. Caravaggio painted it before architects built with it. But in the modern sense — light as a considered, disciplined material — we must look to the Nordic tradition.</p>
      
      <h2>The Nordic Proposition</h2>
      <p>Alvar Aalto understood that northern light is precious and oblique. His skylights at Viipuri Library (1935) are not apertures — they are instruments tuned to eliminate shadow on reading surfaces. Each circular perforation in the ceiling distributes light evenly across the hall below, making the architecture itself disappear in service of the act of reading.</p>
      
      <blockquote>The sun does not know how famous he is.</blockquote>
      
      <p>This is the paradox of light in architecture: the more skilfully it is deployed, the less the viewer registers the mechanism. We experience the space, not the window. We feel the warmth, not the engineering.</p>
      
      <h2>Peter Zumthor's Darkness</h2>
      <p>Zumthor inverts the proposition. In the Bruder Klaus Field Chapel (2007), light enters through a single oculus in a charred wooden interior. The darkness is the material; the light is its opposite, made sharp and precise by absolute contrast. You cannot understand one without the other.</p>
      
      <p>At Sum Studio, we approach each project with a single question before any other: how does light move through this space across a year? The answer dictates orientation, fenestration, and ultimately, the emotional character of the architecture.</p>
    `,
  },
  {
    slug: 'material-honesty-in-tropical-climates',
    title: 'Material Honesty in Tropical Climates',
    category: 'Materials',
    date: 'May 2026',
    readTime: '5 min',
    excerpt: 'Exposed concrete weeps in monsoon humidity. Timber swells and contracts. Building honestly with tropical materials requires rethinking the canon.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
    author: 'Rohan Mehta',
    content: `
      <p>The European architectural canon — with its love of exposed concrete, raw steel, and polished stone — was largely developed in temperate climates. When transplanted to India's coasts and plains, these materials behave differently.</p>
      
      <h2>What Honesty Means Here</h2>
      <p>Material honesty, as Ruskin codified it and modernists adopted, means allowing materials to express their natural character. But in Alibaug or Chennai, concrete grows damp patches, steel oxidises quickly, and untreated timber hosts termites within a season.</p>
      
      <blockquote>Honesty is not the absence of treatment. It is the acceptance of a material's nature in a given climate.</blockquote>
      
      <p>We have been exploring compressed earth blocks — a material as old as habitation in India but reconsidered with modern binders and precision forming. It insulates, it ages gracefully, and it is made from the very ground of the site.</p>
    `,
  },
  {
    slug: 'the-threshold-as-architecture',
    title: 'The Threshold as Architecture',
    category: 'Theory',
    date: 'April 2026',
    readTime: '6 min',
    excerpt: 'The doorway, the corridor, the courtyard — spaces of transition are often the most spatially rich, yet the least considered in the brief.',
    coverImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop&q=85',
    author: 'Anika Sharma',
    content: `
      <p>In the traditional Indian haveli, the transition from street to private court is never abrupt. A vestibule, a compressed passage, then an explosion of sky and garden. The compression makes the release more profound.</p>
      
      <h2>The Forgotten In-Between</h2>
      <p>Contemporary architecture often treats the threshold as a problem to be minimised — a legal requirement, an accessibility note, a fire door. But the threshold is where architecture becomes explicit about the difference between realms.</p>
      
      <blockquote>The door handle is the first handshake with architecture. — Juhani Pallasmaa</blockquote>
      
      <p>We design thresholds as intentional experiences. The entry to Pavilion Vayu compresses you through a narrow sandstone corridor before releasing you into the central void. The journey takes twelve seconds and contains the entire emotional narrative of the building.</p>
    `,
  },
  {
    slug: 'slow-architecture-against-the-instant',
    title: 'Slow Architecture',
    category: 'Practice',
    date: 'March 2026',
    readTime: '4 min',
    excerpt: 'In an era of instant renders and AI-generated facades, we argue for the radical act of slowness — in design, in construction, in occupation.',
    coverImage: 'https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=1200&auto=format&fit=crop&q=85',
    author: 'Rohan Mehta',
    content: `<p>Placeholder content.</p>`,
  },
  {
    slug: 'on-the-courtyard',
    title: 'On the Courtyard',
    category: 'Typology',
    date: 'February 2026',
    readTime: '8 min',
    excerpt: 'The courtyard is perhaps the most resilient architectural type ever devised — climatically responsive, socially generative, and formally eternal.',
    coverImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=85',
    author: 'Anika Sharma',
    content: `<p>Placeholder content.</p>`,
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'sum-01-lamp',
    name: 'SUM 01 Floor Lamp',
    category: 'Lighting',
    price: '₹ 42,000',
    description: 'A slender floor lamp in blackened mild steel and hand-blown borosilicate glass. The diffuser casts a warm, omnidirectional glow.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=85',
    tag: 'New',
    material: 'Blackened mild steel, borosilicate glass',
    dimensions: 'H 160cm × Ø 28cm',
  },
  {
    slug: 'sum-02-chair',
    name: 'SUM 02 Lounge Chair',
    category: 'Seating',
    price: '₹ 1,20,000',
    description: 'A low-slung lounge chair in solid teak and hand-stitched natural leather. Designed to age and develop character over decades.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=85',
    tag: 'Signature',
    material: 'Solid teak, natural leather',
    dimensions: 'W 78cm × D 86cm × H 72cm',
  },
  {
    slug: 'sum-03-shelf',
    name: 'SUM 03 Wall Shelf',
    category: 'Storage',
    price: '₹ 28,000',
    description: 'A cantilever shelf in powder-coated aluminium with a patinated brass bracket. Minimal fixings, maximum presence.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=85',
    tag: '',
    material: 'Powder-coated aluminium, patinated brass',
    dimensions: 'W 90cm × D 24cm × H 4cm',
  },
  {
    slug: 'sum-04-table',
    name: 'SUM 04 Side Table',
    category: 'Tables',
    price: '₹ 55,000',
    description: 'A sculptural side table cast in terrazzo with a hairpin steel leg. Each piece is unique due to the aggregate composition.',
    image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=800&auto=format&fit=crop&q=85',
    tag: 'Bespoke',
    material: 'Terrazzo, powder-coated steel',
    dimensions: 'Ø 45cm × H 52cm',
  },
  {
    slug: 'sum-05-mirror',
    name: 'SUM 05 Arch Mirror',
    category: 'Objects',
    price: '₹ 34,000',
    description: 'An arched mirror in solid marble with a bevelled edge. The arch form echoes the studio\'s recurring interest in aperture and threshold.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=85',
    tag: '',
    material: 'Indian marble, bevelled glass',
    dimensions: 'W 55cm × H 90cm',
  },
  {
    slug: 'sum-06-vessel',
    name: 'SUM 06 Vessel',
    category: 'Objects',
    price: '₹ 8,500',
    description: 'A hand-thrown ceramic vessel in unglazed stoneware. Fired at 1280°C with wood ash glaze pooling at the base.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=85',
    tag: 'Limited',
    material: 'Unglazed stoneware, wood ash glaze',
    dimensions: 'Ø 18cm × H 32cm',
  },
  {
    slug: 'sum-07-pendant',
    name: 'SUM 07 Pendant',
    category: 'Lighting',
    price: '₹ 38,000',
    description: 'A pendant light in woven rattan and solid brass. The shade casts dappled light reminiscent of a canopy through leaves.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85',
    tag: '',
    material: 'Natural rattan, brushed brass',
    dimensions: 'Ø 52cm × H 38cm',
  },
  {
    slug: 'sum-08-rug',
    name: 'SUM 08 Flatweave Rug',
    category: 'Textiles',
    price: '₹ 62,000',
    description: 'A hand-knotted flatweave rug in natural wool and undyed cotton. The pattern derives from site plans of our completed projects.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=85',
    tag: 'New',
    material: 'Natural wool, undyed cotton',
    dimensions: '240cm × 170cm',
  },
];
