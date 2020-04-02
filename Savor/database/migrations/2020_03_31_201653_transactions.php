<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Transactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('transactions', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('description');
$table->double('amount');
$table->integer('categories_id');


$table->date('start_date');

$table->date('end_date');
$table->integer('user_id');
$table->string('intervalo');
$table->string('type');
$table->integer('currencies_id');
 


 
});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('transactions');

    }
}
