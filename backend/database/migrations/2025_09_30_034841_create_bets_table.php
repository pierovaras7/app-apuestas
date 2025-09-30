<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('bets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['simple', 'combinada']);
            $table->string('description')->nullable();
            $table->decimal('stake', 10, 2); // monto apostado
            $table->decimal('odd', 10, 2)->default(1); // cuota total (para simples es la misma)
            $table->decimal('potential_win', 10, 2)->default(0);
            $table->enum('status', ['pendiente', 'ganada', 'perdida'])->default('pendiente');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bets');
    }
};
