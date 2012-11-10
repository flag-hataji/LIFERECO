class Timeline < ActiveRecord::Base
  attr_accessible :is_main_line, :is_secret_mode, :name, :start_date
end
