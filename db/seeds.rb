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
User.destroy_all
p "HTML is destroyed along with all its dependencies"

User.create(email: "adrian@girl4lyfe.com", password: "password")

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

puts "Destroying Templates"
Template.destroy_all
puts "Creating Templates"
Template.create(
  title: 'new-age',
  category: 'business',
  rating: 5,
  times_published: 0,
  image_url: 'https://startbootstrap.com/img/templates/new-age.jpg',
  repo_name: 'BlackrockDigital/startbootstrap-new-age',
  preview_url: 'https://blackrockdigital.github.io/startbootstrap-new-age/'
)

Template.create(
  title: 'creative',
  category: 'business',
  rating: 5,
  times_published: 0,
  image_url: 'https://startbootstrap.com/img/templates/creative.jpg',
  repo_name: 'BlackrockDigital/startbootstrap-creative',
  preview_url: 'https://blackrockdigital.github.io/startbootstrap-creative/'
)

Template.create(
  title: 'stylish-portfolio',
  category: 'portfolio',
  rating: 5,
  times_published: 0,
  image_url: 'https://startbootstrap.com/img/templates/stylish-portfolio.jpg',
  repo_name: 'BlackrockDigital/startbootstrap-stylish-portfolio',
  preview_url: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
)

Template.create(
  title: 'agency',
  category: 'business',
  rating: 5,
  times_published: 0,
  image_url: 'https://startbootstrap.com/img/templates/agency.jpg',
  repo_name: 'BlackrockDigital/startbootstrap-agency',
  preview_url: 'https://blackrockdigital.github.io/startbootstrap-agency/'
)

Template.create(
  title: 'clean-blog',
  category: 'business',
  rating: 5,
  times_published: 0,
  image_url: 'https://startbootstrap.com/img/templates/clean-blog.jpg',
  repo_name: 'BlackrockDigital/startbootstrap-clean-blog',
  preview_url: 'https://blackrockdigital.github.io/startbootstrap-clean-blog/'
)
