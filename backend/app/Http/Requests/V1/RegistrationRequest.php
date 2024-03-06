<?php

namespace App\Http\Requests\V1;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegistrationRequest extends FormRequest {
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
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'role' => ['required', 'string', Rule::in(UserRole::toArray())],
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|string|min:8',
        ];
    }
}
