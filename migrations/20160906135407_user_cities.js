
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_cities', function(table){
    table.integer('user_id').unsigned().index().references('users.id').onDelete('CASCADE');
    table.integer('city_id').unsigned().index().references('cities.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_cities');
};
