<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('report_reason', function (Blueprint $table) {
            $table->unsignedBigInteger('report_id');
            $table->unsignedBigInteger('reason_id');

            $table->foreign('reason_id')->references('id')->on('reasons')->onDelete('cascade');
            $table->foreign('report_id')->references('id')->on('reports')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('report_reason');
    }
};
