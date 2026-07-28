import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto, RegisterDto } from './dto';

const SALT_ROUNDS = 12;

export type JwtPayload = { sub: string; username: string };

export type PublicUser = {
  userID: string;
  username: string;
  email: string | null;
  avatar: string;
  socketID: string;
  room: string;
  preferedDistance: number;
  geolocation_lat: number;
  geolocation_lng: number;
  beSeenBeyondRange: boolean;
};

function defaultAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  publicUser(u: {
    userID: string;
    username: string;
    email: string | null;
    avatar: string;
    socketID: string;
    room: string;
    preferedDistance: number;
    geolocation_lat: number;
    geolocation_lng: number;
    beSeenBeyondRange: boolean;
  }): PublicUser {
    return {
      userID: u.userID,
      username: u.username,
      email: u.email,
      avatar: u.avatar,
      socketID: u.socketID,
      room: u.room,
      preferedDistance: u.preferedDistance,
      geolocation_lat: u.geolocation_lat,
      geolocation_lng: u.geolocation_lng,
      beSeenBeyondRange: u.beSeenBeyondRange,
    };
  }

  private sign(user: { userID: string; username: string }) {
    const payload: JwtPayload = { sub: user.userID, username: user.username };
    return this.jwt.sign(payload);
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ username: dto.username }, { email: dto.email }] },
    });
    if (existing)
      throw new ConflictException('Username or email already in use');

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const userID = uuid();
    const user = await this.prisma.user.create({
      data: {
        userID,
        username: dto.username,
        email: dto.email,
        passwordHash,
        avatar: dto.avatar || defaultAvatar(dto.username),
        socketID: `pending-${userID}`,
        room: 'geoChat',
        preferedDistance: 40,
        geolocation_lat: 0,
        geolocation_lng: 0,
        beSeenBeyondRange: false,
      },
    });

    return { token: this.sign(user), user: this.publicUser(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: dto.identifier }, { email: dto.identifier }] },
    });
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return { token: this.sign(user), user: this.publicUser(user) };
  }

  async me(userID: string) {
    const user = await this.prisma.user.findUnique({ where: { userID } });
    if (!user) throw new NotFoundException('User not found');
    return this.publicUser(user);
  }

  verify(token: string): JwtPayload {
    return this.jwt.verify<JwtPayload>(token);
  }
}
