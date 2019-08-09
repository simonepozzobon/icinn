<?php

namespace App\Http\Controllers\Admin;

use App\File;
use App\Picture;

use Cache;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
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


    public function upload_image(Request $request)
    {
        $file = $request->file('file');
        $ext = $file->getClientOriginalExtension();
        $original_filename = $file->getClientOriginalName();
        $filename = uniqid() . '.' . $ext;

        $file_path = $file->storeAs('public/pictures', $filename);
        $full_path = Storage::disk('local')->url($file_path);


        return [
            'success' => true,
            'original_name' => $original_filename,
            'image' => $full_path,
        ];
    }
}
