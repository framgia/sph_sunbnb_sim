<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest {
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
        $userId = auth()->id();
        $currentEmail = auth()->user()->email;

        $emailRule = $this->input('email') !== $currentEmail
            ? 'required|email|unique:users,email'
            : 'required|email';

        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => $emailRule,
            'current_password' => 'required|string',
            'new_password' => 'required|confirmed|string|min:8',
        ];
    }
}
