# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Destroying users"

User.destroy_all

puts "Done!"

puts "Creating users"
10.times do |n|
  User.create!({
    email: Faker::Internet.email,
    password: 'dsadsdasdasasdsadadada'
    })
end

puts "Done!"

Html.destroy_all
p "HTML is destroyed along with all its dependencies"

3.times do
  curr = User.first.htmls.create(
    {
      body: "<html>
              <head>
              </head>
              <body>
              </body>
            </html>"
    });
  p "HTML id: #{curr.id} initialized"

  2.times do
    js = curr.javascripts.create({
      body: "console.log('kekek')"
    })

    p "Javascript id: #{js.id} initialized"

    css = curr.styles.create({
      body: "*  {border: 1px solid grey}"
    })

    p "Style id: #{css.id} initialized"
  end
end
