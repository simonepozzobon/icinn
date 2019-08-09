<?php

namespace App\Http\Controllers\Admin;

use App\File;
use App\Article;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

    public function get_article($id)
    {
        $article = Article::findOrFail($id);

        return [
            'success' => true,
            'article' => $article,
        ];
    }

    public function update(Request $request)
    {
        if (isset($request->id) && $request->id && $request->id != 'null') {
            $article = Article::find($request->id);
        } else {
            $article = new Article();
        }

        $article->slug = uniqid();
        $date_formatted = Carbon::createFromFormat('D M d Y H:i:s e+', $request->date)->format('Y-m-d');
        $article->date = $date_formatted;
        $article->title = $request->title;
        $article->content = $request->content;
        $article->save();

        return [
            'success' => true,
            'test' => $request->all(),
            'article' => $article,
        ];
    }
}
