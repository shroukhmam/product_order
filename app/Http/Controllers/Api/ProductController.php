<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $cacheKey = 'products' . md5(json_encode($request->all()));
        $products = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($request) {
            return Product::query()
                ->when($request->filled('search'), fn($q) =>
                $q->where('name', 'like', '%' . $request->search . '%')
                )
                ->when($request->filled('category'), fn($q) =>
                $q->where('category', $request->category)
                )
                ->when($request->filled('min_price'), fn($q) =>
                $q->where('price', '>=', $request->min_price)
                )
                ->when($request->filled('max_price'), fn($q) =>
                $q->where('price', '<=', $request->max_price)
                )
                ->paginate(10);
        });

        return response()->json($products);
    }

    public function show($product)
    {
        $product = Product::find($product);
        return response()->json(['status'=>true,'product' => $product]);
    }
}
