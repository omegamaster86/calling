# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_02_12_093542) do

  create_table "attack_logs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "calling_day", null: false, comment: "架電日"
    t.string "calling_start", comment: "架電開始時間"
    t.string "call_result", null: false, comment: "架電結果"
    t.string "call_content", null: false, comment: "架電内容"
    t.string "next_call_day", comment: "次回架電日"
    t.bigint "company_id", null: false, comment: "会社ID"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "salseman", null: false, comment: "担当者"
    t.index ["company_id"], name: "index_attack_logs_on_company_id"
  end

  create_table "companies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "company_name", null: false, comment: "会社名"
    t.string "address", null: false, comment: "住所"
    t.string "telephone_number", null: false, comment: "電話番号"
    t.string "website", comment: "ウェブサイトURL"
    t.string "industry", null: false, comment: "業界"
  end

  create_table "key_people", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "department", comment: "部署名"
    t.string "post", comment: "役職"
    t.string "name", comment: "名前"
    t.string "email", comment: "メールアドレス"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id", null: false, comment: "会社ID"
    t.string "telephone_number", comment: "電話番号"
    t.string "note", comment: "特記事項"
    t.index ["company_id"], name: "index_key_people_on_company_id"
  end

  create_table "todos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "provider"
    t.string "uid"
    t.text "tokens"
    t.string "encrypted_password"
  end

  add_foreign_key "attack_logs", "companies"
  add_foreign_key "key_people", "companies"
end
