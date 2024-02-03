class User < ApplicationRecord
    has_secure_password
    # validates :uid, uniqueness: { case_sensitive: true }
    # validates :provider, uniqueness: { case_sensitive: true }
    validates :email, uniqueness: { case_sensitive: true }
    # パスワードバリデーションを条件付きで適用
    validate :password_presence, unless: :external_auth?

    private

    # 外部認証サービスを使用しているか判定
    def external_auth?
        provider.present?
    end

    # パスワードの存在を検証するカスタムメソッド
    def password_presence
        errors.add(:password, "can't be blank") if password.blank?
    end

end

# グーグル認証とメール認証で分岐するように記載
