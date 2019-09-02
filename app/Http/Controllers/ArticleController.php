<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function get_articles()
    {
        $articles = Article::limit(3)->with('files')->get();

        $articles = $articles->transform(
            function ($article, $key) {
                $files = $article->files;
                $article->files = $files->transform(
                    function ($file, $key) {
                        $file->url = Storage::disk('local')->url($file->url);
                        return $file;
                    }
                );
                return $article;
            }
        );

        return [
            'success' => true,
            'articles' => $articles,
        ];
    }

    public function get_archives()
    {
        $articles = Article::with('files')->get();

        $articles = $articles->transform(
            function ($article, $key) {
                $files = $article->files;
                $article->files = $files->transform(
                    function ($file, $key) {
                        $file->url = Storage::disk('local')->url($file->url);
                        return $file;
                    }
                );
                return $article;
            }
        );

        return [
            'success' => true,
            'articles' => $articles,
        ];
    }

    public function get_article($id)
    {
        $article = Article::find($id);

        if ($article) {
            $files = $article->files;
            $article->files = $files->transform(
                function ($file, $key) {
                    $file->url = Storage::disk('local')->url($file->url);
                    return $file;
                }
            );

            return [
                'success' => true,
                'article' => $article,
            ];
        }

        return [
            'success' => false,
        ];
    }
}
