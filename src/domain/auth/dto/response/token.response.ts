import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUwMTc4MzE1LCJleHAiOjE3NTAxNzg2MTV9.v_zl3GxprGU_GVKitqettjsNUYsmCg9ProlQHI0aPrE' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUwMTc4MzE1LCJleHAiOjE3NTAyNjQ3MTV9.mCqak6JvbdTWoZ6IYIHaH42_e81U5GQagcIUUlxIs2w' })
  refreshToken: string;
}
