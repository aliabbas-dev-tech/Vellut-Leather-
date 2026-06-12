import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgnueyccpiflidxvrzjf.supabase.co';
const supabaseKey = 'sb_publishable_nwENG59V3eN5VgF60Y1c5A_922TfUf6';
const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    "id": "vl-001",
    "name": "The Heritage Weekender Duffel",
    "category": "Executive Duffel Bags",
    "price": 189.99,
    "description": "Handcrafted from full-grain tan leather. Features a spacious main compartment, internal shoe pocket, and solid brass hardware. Perfect for a 3-day trip.",
    "imageUrl": "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-002",
    "name": "Midnight Matte Leather Overnighter",
    "category": "Executive Duffel Bags",
    "price": 199.99,
    "description": "Sleek, water-resistant matte black leather duffel with premium YKK zippers and an adjustable shoulder strap.",
    "imageUrl": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-003",
    "name": "Classic Vintage Holdall",
    "category": "Executive Duffel Bags",
    "price": 175.00,
    "description": "Rich dark brown distressed leather that develops a beautiful patina over time. Includes dual reinforced grab handles.",
    "imageUrl": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-004",
    "name": "The Grand Voyage Trolley Duffel",
    "category": "Executive Duffel Bags",
    "price": 249.99,
    "description": "Premium leather duffel bag equipped with hidden smooth-rolling wheels and a telescopic handle for effortless airport travel.",
    "imageUrl": "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-005",
    "name": "Suede Accented Travel Bag",
    "category": "Executive Duffel Bags",
    "price": 165.50,
    "description": "A luxury blend of premium tan leather and genuine Italian suede accents. Features quick-access external pockets.",
    "imageUrl": "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-006",
    "name": "Nomad Full-Grain Backpack",
    "category": "Adventure Travel Backpacks",
    "price": 145.00,
    "description": "Heavy-duty leather travel backpack with padded shoulder straps, a dedicated 16-inch laptop sleeve, and anti-theft back pocket.",
    "imageUrl": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-007",
    "name": "Urban Explorer Rucksack",
    "category": "Adventure Travel Backpacks",
    "price": 139.99,
    "description": "Features a classic drawstring closure under a secure leather flap with magnetic buckle straps. Ideal for day-long city travel.",
    "imageUrl": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-008",
    "name": "The Commuter Tech Pack",
    "category": "Adventure Travel Backpacks",
    "price": 159.99,
    "description": "Minimalist modern leather backpack with organized smart slots for chargers, cables, power banks, and tech gear.",
    "imageUrl": "https://images.unsplash.com/photo-1578111592317-095561a0709b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-009",
    "name": "Stealth Black Flight Backpack",
    "category": "Adventure Travel Backpacks",
    "price": 149.00,
    "description": "Designed to fit perfectly under airline seats. Expandable main compartment made from premium milled black leather.",
    "imageUrl": "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-010",
    "name": "The Vintage Trail Rucksack",
    "category": "Adventure Travel Backpacks",
    "price": 169.99,
    "description": "Rugged oiled leather rucksack with heavy cotton lining, side water bottle pockets, and ergonomic back support.",
    "imageUrl": "https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-011",
    "name": "Sovereign Leather Briefcase",
    "category": "Overnight Messenger Bags",
    "price": 129.99,
    "description": "Classic professional messenger bag with an expandable profile, dual file dividers, and secure combination lock flaps.",
    "imageUrl": "https://images.unsplash.com/photo-1598532187826-f94f6a1a5245?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-012",
    "name": "The Pilot Satchel Bag",
    "category": "Overnight Messenger Bags",
    "price": 119.50,
    "description": "Inspired by classic aviation bags. Features thick oiled saddle leather, cross-body strap, and quick-release front clips.",
    "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-013",
    "name": "Elite Crossbody Reporter",
    "category": "Overnight Messenger Bags",
    "price": 95.00,
    "description": "Compact leather bag for essentials like passports, tablets, and travel documents. Perfect companion for transit days.",
    "imageUrl": "https://images.unsplash.com/photo-1556905200-27956bb7bedc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-014",
    "name": "The Oxford Overnight Case",
    "category": "Overnight Messenger Bags",
    "price": 135.00,
    "description": "Sleek professional messenger that zips open flat for easy airport security checks. Made from ultra-smooth calfskin leather.",
    "imageUrl": "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "vl-015",
    "name": "Classic Tan Leather Portfolio",
    "category": "Overnight Messenger Bags",
    "price": 110.00,
    "description": "Slim, elegant messenger bag designed for digital nomads. Fits a 14-inch Macbook, notebooks, and boarding passes.",
    "imageUrl": "https://images.unsplash.com/photo-1512207724213-74742894da67?auto=format&fit=crop&w=800&q=80"
  }
];

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    const { data, error } = await supabase.from('products').insert({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    });
    if (error) {
      console.error('Error inserting product', product.name, error);
    } else {
      console.log('Inserted', product.name);
    }
  }
}

seed();
