<?php

namespace App\Http\Controllers\Admin;

use App\File;
use App\Article;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    public function get_articles()
    {
        $articles = Article::all();

        return [
            'success' => true,
            'articles' => $articles,
        ];
    }
}
