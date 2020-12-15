class JsonWebToken
  class << self
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base || "test_token") # TODO: don't use the constant value.
    end

    def decode(token)
      body = JWT.decode(token, Rails.application.secrets.secret_key_base || "test_token")[0] # TODO: don't use the constant value.
      HashWithIndifferentAccess.new body
    rescue
      nil
    end
  end
end