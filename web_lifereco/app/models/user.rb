class User < ActiveRecord::Base
	has_many :timelines
	attr_accessible :email, :name, :nickname, :password, :singup_date
end
