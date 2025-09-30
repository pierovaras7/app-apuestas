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
        Schema::create('bet_selections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bet_id')->constrained()->onDelete('cascade');
            $table->string('event_name');       // ej. "Barcelona vs Real Madrid"
            $table->string('market');           // ej. "Ganador", "Más de 2.5 goles"
            $table->string('pick');             // ej. "Barcelona", "Over 2.5"
            $table->decimal('odd', 10, 2);
            $table->enum('status', ['pendiente', 'ganada', 'perdida'])->default('pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bet_selections');
    }
};
