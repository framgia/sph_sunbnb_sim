<?php

use App\Enums\ExperienceType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained();
            $table->integer('duration');
            $table->string('language');
            $table->enum('name', ExperienceType::getConstants());
            $table->json('inclusions')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('experiences');
    }
};
