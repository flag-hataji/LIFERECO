class Photo < ActiveRecord::Base
  attr_accessible :is_best_year_photo, :month, :photo_path, :storage_path, :storage_vendor, :upload_date
  belongs_to :timeline

end
