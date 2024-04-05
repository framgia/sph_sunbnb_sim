<?php

namespace App\Http\Requests\V1;

use App\Enums\Reason;
use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest {
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
            'title' => 'required|string',
            'content' => 'required|string',
            'reason' => ['required', 'string', 'in:'.implode(',', Reason::getConstants())],
        ];
    }
}