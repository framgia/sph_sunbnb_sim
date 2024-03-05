<?php

use App\Enums\BookingStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('user_id');
            // $table->unsignedBigInteger('listing_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('number_of_guests');
            $table->decimal('total_price', 10, 2);
            $table->enum('status', BookingStatus::getConstants());
            $table->softDeletes();

            // $table->foreign('user_id')->references('id')->on('guests');
            // $table->foreign('listing_id')->references('id')->on('listings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('bookings');
    }
};
