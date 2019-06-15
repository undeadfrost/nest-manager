import { createHash } from 'crypto';

/**
 * 随机盐值生成
 * @return 6位数字
 */
export function getRandomSalt(): string {
  return Math.random().toString().slice(2, 8);
}

/**
 * MD5编码
 * @param password
 * @return MD5编码之后数据
 */
export function decodeMd5(password: string): string {
  return createHash('md5').update(password).digest('hex');
}

/**
 * 密码加密
 * @param password
 * @param salt
 */
export function cryptPassword(password: string, salt: string): string {
  return this.decodeMd5(`${password}@@${salt}`);
}
