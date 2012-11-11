class CreateTimelines < ActiveRecord::Migration
  def change
    create_table :timelines do |t|
      t.string :name
      t.date :start_date
      t.boolean :is_secret_mode
      t.boolean :is_main_line

      t.timestamps
    end
  end
end
