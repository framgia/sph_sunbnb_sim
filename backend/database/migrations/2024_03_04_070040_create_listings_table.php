<?php

use App\Enums\ListingStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->enum('status', ListingStatus::getConstants())->default(ListingStatus::PENDING);
            $table->string('name');
            $table->text('description');
            $table->string('province');
            $table->string('city');
            $table->string('barangay');
            $table->string('street');
            $table->integer('zip_code');
            $table->decimal('price', $precision = 9, $scale = 2);
            $table->integer('maximum_guests');
            $table->morphs('listable');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('listings');
    }
};
