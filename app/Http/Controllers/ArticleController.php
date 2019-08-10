<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function get_articles()
    {
        $articles = Article::limit(3)->with('files')->get();

        return [
            'success' => true,
            'articles' => $articles,
        ];
    }
}
