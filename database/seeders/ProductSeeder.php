<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Red Shirt',
                'description' => 'High-end laptop for professionals.',
                'price' => 1500.00,
                'stock' => 10,
                'category' => 'T-shirts',
                'image' => 'products/tshirt1.jpg',
            ],
            [
                'name' => 'Green Shirt',
                'description' => 'Noise cancelling, over-ear headphones.',
                'price' => 250.00,
                'stock' => 25,
                'category' => 'T-shirts',
                'image' => 'products/tshirt2.jpg',
            ],
            [
                'name' => 'blue Shirt',
                'description' => 'High-end clothes.',
                'price' => 1500.00,
                'stock' => 10,
                'category' => 'T-shirts',
                'image' => 'products/tshirt3.jpg',
            ],
            [
                'name' => 'White Polo',
                'description' => 'Ergonomic design with RGB lighting.',
                'price' => 75.00,
                'stock' => 40,
                'category' => 'Polo',
                'image' => 'products/shirt.jpg',
            ],
            [
                'name' => 'Jeans',
                'description' => 'Ergonomic design with RGB lighting.',
                'price' => 75.00,
                'stock' => 40,
                'category' => 'Jeans',
                'image' => 'products/photo.jpg',
            ],
        ];

        foreach ($products as $data) {
            Product::firstOrCreate(
                ['name' => $data['name']],
                $data
            );
        }
    }
}

