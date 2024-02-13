<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//converts models to json data 

class HashResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'input_text' => $this->input_text,
            'hash_value' => $this->hash_value,
            'algorithm' => $this->algorithm,
            'created_at' => $this->created_at,
        ];
    }
}
