<?php

namespace App\Http\Controllers\Admin;

use App\File;

use Cache;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{

    // salvare il file
    // inserirlo nel database
    // collegarlo all articolo


    public function upload_file(Request $request)
    {
        Cache::forget('file');

        $file = $request->file('file');
        $ext = $file->getClientOriginalExtension();
        $filename = uniqid() . '.' . $ext;
        $file_path = $file->storeAs('public/files', $filename);

        Cache::put('file', [
            'filename' => $filename,
            'path' => $file_path,
        ]);

        return [
            'success' => true,
        ];
    }

    public function save_to_db(Request $request)
    {
        $file_cached = Cache::get('file');

        $file = new File();
        $file->title = $file_cached['filename'];
        $file->url = $file_cached['path'];
        $file->save();

        return [
            'success' => true,
            'file' => $file,
        ];
    }
}
