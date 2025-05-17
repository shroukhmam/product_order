<?php

namespace App\Http\Controllers\Api;

use App\Events\OrderPlaced;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        DB::beginTransaction();

        try {
            $total = 0;
            $order = Order::create([
                'user_id' => $user->id,
                'total' => 0,
            ]);

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'stock' => "Product {$product->name} is out of stock.",
                    ]);
                }

                $product->decrement('stock', $item['quantity']);

                $price = $product->price;
                $order->products()->attach($product->id, [
                    'quantity' => $item['quantity'],
                    'price' => $price,
                ]);

                $total += $item['quantity'] * $price;
            }

            $order->update(['total' => $total]);

            DB::commit();
            /////
            Cache::flush();
            event(new OrderPlaced($order));

            return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Order $order)
    {
        $order->load('products');

        return response()->json([
            'id' => $order->id,
            'total' => $order->total,
            'products' => $order->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'quantity' => $product->pivot->quantity,
                    'price' => $product->pivot->price,
                ];
            }),
        ]);
    }
}
