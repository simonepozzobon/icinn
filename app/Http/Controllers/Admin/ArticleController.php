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
        $articles = Article::with('files')->get();

        return [
            'success' => true,
            'articles' => $articles,
        ];
    }

    public function get_article($id)
    {
        $article = Article::with('files')->findOrFail($id);

        return [
            'success' => true,
            'article' => $article,
        ];
    }

    public function destroy_article($id)
    {
        $article = Article::findOrFail($id);
        $article->files()->detach();
        $article->delete();

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
        $article->author = $request->author;
        $article->content = $request->content;
        $article->save();

        if (isset($request->attacched) && $request->attacched) {
            $files = json_decode($request->attacched, true);

            $debug = [];

            $article->files()->detach();

            foreach ($files as $key => $id) {
                $file = File::find($id);

                if ($file) {
                    $article->files()->attach($file);
                }
                array_push($debug, $file);
            }

        }
        return [
            'success' => true,
            'test' => $request->all(),
            'article' => $article,
        ];
    }
}
