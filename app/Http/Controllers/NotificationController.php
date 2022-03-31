<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Notification;
use App\Models\User;
use App\Notifications\NotifyAdmin;
use App\Notifications\notifyStuffs;
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


    public function sendNotification($info)
    {
        $inventories = Inventory::with('products')->get();
        $users = User::where('role', 1)->get();

        $details = [

            'greeting' => 'You are running out of stocks',

            'body' => $inventories,

            'thanks' => 'Thank you for using POS APP!',

            'instruction' => "$info",

            'actionURL' => url('/settings/inventory'),

        ];

        foreach ($users as $user) {
            $user->notify(new notifyStuffs($details));
        }

    }
}
