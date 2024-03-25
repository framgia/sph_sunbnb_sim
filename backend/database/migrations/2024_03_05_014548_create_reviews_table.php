<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('listing_id')->constrained();
            $table->decimal('overall_rating', $precision = 4, $scale = 2);
            $table->decimal('cleanliness_rating', $precision = 4, $scale = 2)->nullable();
            $table->decimal('location_rating', $precision = 4, $scale = 2)->nullable();
            $table->decimal('value_rating', $precision = 4, $scale = 2)->nullable();
            $table->text('comment');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('reviews');
    }
};
