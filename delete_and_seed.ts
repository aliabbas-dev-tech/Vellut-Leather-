import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rgnueyccpiflidxvrzjf.supabase.co';
const supabaseKey = 'sb_publishable_nwENG59V3eN5VgF60Y1c5A_922TfUf6';
const supabase = createClient(supabaseUrl, supabaseKey);

const newCategories = [
  { name: "Leather Weekender & Duffels", description: "Premium weekend travel bags" },
  { name: "Leather Travel Backpacks", description: "Rugged full grain backpacks" },
  { name: "Leather Flight & Cabin Bags", description: "Professional flight and cabin bags" }
];

const newProducts = [
  { name: "Premium Tan Leather Weekender Duffel", category: "Leather Weekender & Duffels", price: 189, description: "Classic tan leather weekender duffel for premium short trips.", imageUrl: "/products/bag1.png" },
  { name: "Vintage Dark Brown Holdall Bag", category: "Leather Weekender & Duffels", price: 195, description: "Vintage dark brown holdall bag crafted from heavy-duty leather.", imageUrl: "/products/bag2.png" },
  { name: "Matte Black Executive Overnighter", category: "Leather Weekender & Duffels", price: 210, description: "Sleek matte black executive overnighter with premium hardware.", imageUrl: "/products/bag3.png" },
  { name: "Distressed Leather Travel Tote", category: "Leather Weekender & Duffels", price: 150, description: "Stylish distressed leather travel tote for quick getaways.", imageUrl: "/products/bag4.png" },
  { name: "Oiled Suede & Leather Duffel", category: "Leather Weekender & Duffels", price: 175, description: "Luxurious oiled suede and leather duffel bag.", imageUrl: "/products/bag5.png" },
  { name: "Heavy-Duty Full Grain Leather Travel Backpack", category: "Leather Travel Backpacks", price: 160, description: "Heavy-duty full grain leather travel backpack designed for durability.", imageUrl: "/products/bag6.png" },
  { name: "Vintage Rucksack in Saddle Brown", category: "Leather Travel Backpacks", price: 145, description: "Vintage rucksack in classic saddle brown leather.", imageUrl: "/products/bag7.png" },
  { name: "Minimalist Black Leather Commuter Pack", category: "Leather Travel Backpacks", price: 155, description: "Minimalist black leather commuter pack for modern professionals.", imageUrl: "/products/bag8.png" },
  { name: "Roll-Top Leather Explorer Backpack", category: "Leather Travel Backpacks", price: 170, description: "Roll-top leather explorer backpack with expanding capacity.", imageUrl: "/products/bag9.png" },
  { name: "Multi-Pocket Leather Tech Backpack", category: "Leather Travel Backpacks", price: 165, description: "Multi-pocket leather tech backpack for organized travel.", imageUrl: "/products/bag10.png" },
  { name: "Classic Leather Pilot Briefcase/Cabin Bag", category: "Leather Flight & Cabin Bags", price: 130, description: "Classic leather pilot briefcase and cabin bag.", imageUrl: "/products/bag11.png" },
  { name: "Under-Seat Leather Flight Messenger", category: "Leather Flight & Cabin Bags", price: 120, description: "Under-seat leather flight messenger bag perfect for airlines.", imageUrl: "/products/bag12.png" },
  { name: "Slim Tan Leather Crossbody Boarding Bag", category: "Leather Flight & Cabin Bags", price: 95, description: "Slim tan leather crossbody boarding bag for essential documents.", imageUrl: "/products/bag13.png" },
  { name: "Expandable Travel Briefcase in Dark Espresso", category: "Leather Flight & Cabin Bags", price: 140, description: "Expandable travel briefcase in dark espresso leather.", imageUrl: "/products/bag14.png" },
  { name: "Smooth Calfskin Leather Overnight Case", category: "Leather Flight & Cabin Bags", price: 180, description: "Ultra-premium smooth calfskin leather overnight case.", imageUrl: "/products/bag15.png" }
];

async function deleteAndSeed() {
  console.log('Deleting existing products and collections...');
  // Delete all existing products
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  // Also delete old collections to prevent clutter
  await supabase.from('collections').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Inserting new categories...');
  for (const cat of newCategories) {
    await supabase.from('collections').insert({
      name: cat.name,
      description: cat.description,
      is_featured: true
    });
  }

  // Get collections map
  const { data: colls } = await supabase.from('collections').select('*');
  const catMap: any = {};
  (colls ?? []).forEach((c: any) => catMap[c.name] = c.id);

  console.log('Inserting new products...');
  for (const product of newProducts) {
    const { data: insertedProduct, error } = await supabase.from('products').insert({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    }).select().single();
    
    if (error) {
      console.error('Error inserting product', product.name, error);
    } else if (insertedProduct) {
      console.log('Inserted', product.name);
      
      const collId = catMap[product.category];
      if (collId) {
        await supabase.from('product_collections').insert({
          product_id: insertedProduct.id,
          collection_id: collId
        });
      }
    }
  }
  console.log('Done seeding!');
}

deleteAndSeed();
