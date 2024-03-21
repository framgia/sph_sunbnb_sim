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
            $table->enum('type', ExperienceType::getConstants());
            $table->time('start_time');
            $table->time('end_time');
            $table->json('language')->nullable();
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
