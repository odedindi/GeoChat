import { IsEmail, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @Matches(/^[\w.-]+$/, {
    message: 'username may only contain letters, numbers, _, ., -',
  })
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}

export class LoginDto {
  @IsString()
  identifier!: string; // username or email

  @IsString()
  @MinLength(8)
  password!: string;
}
