<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get(
    '/user',
    function (Request $request) {
        return $request->user();
    }
);

Route::post('login', 'Admin\AuthController@attempt_login');
Route::post('get-token', 'Admin\AuthController@attempt_login_from_cookie');
Route::get('logout', 'Admin\AuthController@attempt_logout')->middleware('auth:api');

Route::prefix('articles')->group(
    function () {
        Route::get('/', 'ArticleController@get_articles');
        Route::get('/archives', 'ArticleController@get_archives');
        Route::get('/{id}', 'ArticleController@get_article');
    }
);

Route::prefix('admin')->group(
    function () {
        Route::prefix('files')->group(
            function () {
                Route::post('upload', 'Admin\UploadController@upload_file');
                Route::post('update', 'Admin\UploadController@save_to_db');
            }
        );

        Route::prefix('images')->group(
            function () {
                Route::post('upload', 'Admin\UploadController@upload_image');
            }
        );

        Route::prefix('articles')->group(
            function () {
                Route::get('/', 'Admin\ArticleController@get_articles');
                Route::get('/{id}', 'Admin\ArticleController@get_article');
                Route::delete('/{id}', 'Admin\ArticleController@destroy_article');
                Route::post('update', 'Admin\ArticleController@update');
            }
        );
    }
);
