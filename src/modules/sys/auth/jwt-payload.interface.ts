export interface JwtPayload {
  iss?: string; // 签发人
  exp?: string; // 过期时间
  sub?: string; // 主题
  aud?: string; // 受众
  nbf?: string; // 生效时间
  iat?: string; // 签发时间
  jti?: string; // 编号
  username: string; // 用户名
}
