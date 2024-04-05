<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn('reported_at');
            $table->foreignId('admin_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('reports', function (Blueprint $table) {

            $table->date('reported_at');
            $table->foreignId('admin_id')->nullable(false)->change();
        });

    }
};
