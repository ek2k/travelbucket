
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cities', function(table){
    table.increments();
    table.string('city');
    table.integer('user_id').unsigned().index().references('users.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities');
};
