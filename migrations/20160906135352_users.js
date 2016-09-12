
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('fname');
    table.string('lname');
    table.string('password');
    table.string('email');
    table.string('home_city');
    table.boolean('admin').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
