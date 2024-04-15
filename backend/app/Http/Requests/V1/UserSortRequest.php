<?php

namespace App\Http\Requests\V1;

use App\Enums\UserStatus;
use Illuminate\Foundation\Http\FormRequest;

class UserSortRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        return [
            'status' => ['nullable', 'string', 'in:'.implode(',', UserStatus::getConstants())],
            'sort' => ['nullable', 'string', 'in:asc,desc'],
        ];
    }
}
