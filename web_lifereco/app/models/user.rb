class User < ActiveRecord::Base
  attr_accessible :email, :name, :nickname, :password, :singup_date
end
