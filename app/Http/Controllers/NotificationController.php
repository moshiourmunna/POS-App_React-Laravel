<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\NotifyAdmin;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function __construct()

    {

        $this->middleware('auth:sanctum');

    }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()

    {

        return view('home');

    }


    public function sendNotification()
    {
        $inventories = Inventory::with('products')->get();
        $users = User::all();

        $details = [

            'greeting' => 'You are running out of stocks',

            'body' => $inventories,

            'thanks' => 'Thank you for using POS APP!',

            'instruction' => 'Restock',

            'actionURL' => url('/settings/inventory'),

        ];

        foreach ($inventories as $key => $inventory) {
            if ($inventory->stock < $inventory->threshold) {
                foreach ($users as $user) {
                    $user->notify(new NotifyAdmin($details));
                }
            }
        }
    }
}
