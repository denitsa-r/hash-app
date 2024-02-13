<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use App\Models\Hash;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHashRequest;
use App\Http\Requests\UpdateHashRequest;
use App\Http\Resources\HashResource;

class HashesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HashResource::collection(
            Hash::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreHashRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function store(StoreHashRequest $request)
    {
        $data = $request->validated();
        $hash = Hash::create($data);

        return response(new HashResource($hash) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hash  $hash
     * @return \Illuminate\Http\Response
     */
    public function show(Hash $hash)
    {
        return new HashResource($hash);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHashRequest  $request
     * @param  \App\Models\Hash  $hash
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateHashRequest $request, Hash $hash)
    {
        $data = $request->validated();
        //implement check for password to do
        $user->update($data);

        return new HashResource($hash);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hash  $hash
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hash $hash)
    {
        $hash->delete();

        return response("", 204);
    }
}
