<?php

use App\Enums\AccommodationType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained();
            $table->enum('name', AccommodationType::getConstants());
            $table->integer('bed_count');
            $table->integer('bedroom_count');
            $table->integer('bathroom_count');
            $table->integer('minimum_days');
            $table->integer('maximum_days');
            $table->json('amenities')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('accommodations');
    }
};
