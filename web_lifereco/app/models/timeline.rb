class Timeline < ActiveRecord::Base
	has_many :photos
	attr_accessible :is_main_line, :is_secret_mode, :name, :start_date
end
