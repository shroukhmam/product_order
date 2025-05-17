<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            ProductSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'test1@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('123'),
            ]
        );
    }
}
