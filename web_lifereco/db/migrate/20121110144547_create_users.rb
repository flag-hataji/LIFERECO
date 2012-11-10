class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :nickname
      t.string :email
      t.string :password
      t.date :singup_date

      t.timestamps
    end
  end
end
