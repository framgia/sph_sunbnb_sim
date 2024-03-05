<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('guest_id');
            // $table->unsignedBigInteger('listing_id');
            // $table->unsignedBigInteger('admin_id');
            $table->string('title');
            $table->text('content');
            $table->string('status');
            $table->date('reported_at');

            // $table->foreign('guest_id')->references('id')->on('guests')->onDelete('cascade');
            // $table->foreign('listing_id')->references('id')->on('listings')->onDelete('cascade');
            // $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('reports');
    }
};
