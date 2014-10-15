class Blob < ActiveRecord::Base
  def mood
  end

  def last_ate
    (read_attribute(:last_ate) || created_at).to_i - 100
  end

  def last_pet
    (read_attribute(:last_pet) || created_at).to_i - 100
  end
end
