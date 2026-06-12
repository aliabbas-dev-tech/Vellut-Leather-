import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgnueyccpiflidxvrzjf.supabase.co';
const supabaseKey = 'sb_publishable_nwENG59V3eN5VgF60Y1c5A_922TfUf6';
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { name: "Executive Duffel Bags", description: "For business & short trips" },
  { name: "Adventure Travel Backpacks", description: "Premium rugged leather backpacks" },
  { name: "Overnight Messenger Bags", description: "Compact business travel & laptop bags" }
];

const productsData = [
  { name: "The Heritage Weekender Duffel", category: "Executive Duffel Bags" },
  { name: "Midnight Matte Leather Overnighter", category: "Executive Duffel Bags" },
  { name: "Classic Vintage Holdall", category: "Executive Duffel Bags" },
  { name: "The Grand Voyage Trolley Duffel", category: "Executive Duffel Bags" },
  { name: "Suede Accented Travel Bag", category: "Executive Duffel Bags" },
  { name: "Nomad Full-Grain Backpack", category: "Adventure Travel Backpacks" },
  { name: "Urban Explorer Rucksack", category: "Adventure Travel Backpacks" },
  { name: "The Commuter Tech Pack", category: "Adventure Travel Backpacks" },
  { name: "Stealth Black Flight Backpack", category: "Adventure Travel Backpacks" },
  { name: "The Vintage Trail Rucksack", category: "Adventure Travel Backpacks" },
  { name: "Sovereign Leather Briefcase", category: "Overnight Messenger Bags" },
  { name: "The Pilot Satchel Bag", category: "Overnight Messenger Bags" },
  { name: "Elite Crossbody Reporter", category: "Overnight Messenger Bags" },
  { name: "The Oxford Overnight Case", category: "Overnight Messenger Bags" },
  { name: "Classic Tan Leather Portfolio", category: "Overnight Messenger Bags" }
];

async function linkCollections() {
  // 1. Insert collections if not exist
  for (const cat of categories) {
    const { data: existing } = await supabase.from('collections').select('*').eq('name', cat.name).single();
    if (!existing) {
      await supabase.from('collections').insert({
        name: cat.name,
        description: cat.description,
        is_featured: true
      });
      console.log('Inserted collection:', cat.name);
    }
  }

  // 2. Get all collections map
  const { data: colls } = await supabase.from('collections').select('*');
  const catMap = {};
  colls.forEach(c => catMap[c.name] = c.id);

  // 3. Get products map
  const { data: prods } = await supabase.from('products').select('*');
  
  // Link
  for (const prodData of productsData) {
    const dbProduct = prods.find(p => p.name === prodData.name);
    if (dbProduct) {
      const collId = catMap[prodData.category];
      if (collId) {
        // Check if already linked
        const { data: existingLink } = await supabase.from('product_collections')
          .select('*')
          .eq('product_id', dbProduct.id)
          .eq('collection_id', collId)
          .single();
          
        if (!existingLink) {
          await supabase.from('product_collections').insert({
            product_id: dbProduct.id,
            collection_id: collId
          });
          console.log(`Linked ${prodData.name} to ${prodData.category}`);
        }
      }
    }
  }
  console.log('Done linking.');
}

linkCollections();
