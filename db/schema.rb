# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161020041651) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "htmls", force: :cascade do |t|
    t.text     "body"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_htmls_on_user_id", using: :btree
  end

  create_table "javascripts", force: :cascade do |t|
    t.text     "body"
    t.integer  "order"
    t.integer  "html_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["html_id"], name: "index_javascripts_on_html_id", using: :btree
  end

  create_table "styles", force: :cascade do |t|
    t.text     "body"
    t.integer  "order"
    t.integer  "html_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["html_id"], name: "index_styles_on_html_id", using: :btree
  end

  create_table "templates", force: :cascade do |t|
    t.string   "title"
    t.string   "category"
    t.integer  "rating"
    t.integer  "times_published"
    t.string   "image_url"
    t.string   "repo_name"
    t.string   "preview_url"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "provider"
    t.string   "uid"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
