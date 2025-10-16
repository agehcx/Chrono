import {IsNotEmpty, IsString} from 'class-validator';

export class VerifyWorldIdDto {
  @IsString()
  @IsNotEmpty()
  nullifier_hash!: string;

  @IsString()
  @IsNotEmpty()
  merkle_root!: string;

  @IsString()
  @IsNotEmpty()
  proof!: string;

  @IsString()
  @IsNotEmpty()
  verification_level!: 'orb' | 'device';

  @IsString()
  @IsNotEmpty()
  action!: string;
}
