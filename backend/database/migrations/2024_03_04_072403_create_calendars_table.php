<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('calendars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained();
            $table->integer('listing_id');
            $table->date('date');
            $table->boolean('available');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('calendars');
    }
};
