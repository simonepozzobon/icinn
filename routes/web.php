<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('link-storage', function() {
//     $exitCode = Artisan::call('storage:link');
//     echo "storage linked";
//     dump($exitCode);
//
//     $cache = Artisan::call('cache:clear');
//     echo "cache cleared";
//     dump($cache);
//
//     $config = Artisan::call('config:clear');
//     echo "config clear";
//     dump($config);
// });

Route::get('/admin/{slug?}', function ($slug = null) {
    return view('admin');
})->where('slug', '[\/\w\.-]*');

Route::get('/{slug?}', function ($slug = null) {
    return view('welcome');
})->where('slug', '[\/\w\.-]*');
