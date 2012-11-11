class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.date :upload_date
      t.integer :storage_vendor
      t.string :storage_path
      t.string :photo_path
      t.date :month
      t.boolean :is_best_year_photo

      t.timestamps
    end
  end
end
