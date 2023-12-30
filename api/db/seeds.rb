# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.create(title: 'Todo 1', content: 'Todo 1 の内容')
Todo.create(title: 'Todo 2', content: 'Todo 2 の内容')
Todo.create(title: 'Todo 3', content: 'Todo 3 の内容')
User.create(name: 'bara', email: 'm.kanbara@repoc.jp', password: 'omega')