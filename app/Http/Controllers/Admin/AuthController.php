<?php

namespace App\Http\Controllers\Admin;

use Auth;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function attempt_login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $this->create_token($user, $request);

            return [
                'success' => true,
                'user' => $user,
                'token' => $this->format_token($token),
            ];
        }

        return [
            'success' => false,
        ];
    }

    public function attempt_login_from_cookie(Request $r)
    {
        $user = User::where([
                ['email', '=', $r->email],
                ['id', '=', $r->id],
            ])->first();

        if ($user) {
            $user = Auth::loginUsingId($user->id);
            $token = $this->create_token($user, $r);
            return [
                    'success' => true,
                    'user' => $user,
                    'token' => $this->format_token($token),
                ];
        }

        return [
            'success' => false,
        ];
    }

    public function attempt_logout(Request $r)
    {
        $r->user()->token()->revoke();

        return [
            'success' => true,
        ];
    }

    public function create_token($user, $request)
    {
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return $tokenResult;
    }

    public function format_token($tokenResult)
    {
        return [
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ];
    }
}
