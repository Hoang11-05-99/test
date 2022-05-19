import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/model/account.model';
import * as bcrypt from 'bcrypt';
import { CreateAccountDTO } from 'src/dto/createAccountDto';
import { Role } from 'src/constant/enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async getAccount(id: string) {
    const findAccount = await this.accountModel.findOne({
      _id: id,
    });
    if (findAccount) {
      throw new HttpException(
        {
          result: findAccount,
          status: HttpStatus.OK,
          message: 'Tải thông tin tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Tài khoản không tồn tại',
        },
        HttpStatus.OK,
      );
    }
  }

  async registerAccount(user: CreateAccountDTO) {
    const findUser = await this.accountModel.findOne({
      email: user.email,
    });
    if (findUser)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Tên tài khoản đã tồn tại',
        },
        HttpStatus.OK,
      );
    const hashedPassword = await this.hashPassword(user.passWord);
    if (user.role === Role.CANDIDATE) {
      const newCandidate = await new this.accountModel({
        ...user,
        passWord: hashedPassword,
        role: Role.CANDIDATE,
      }).save();
      const candidateObject = newCandidate.toObject();
      delete candidateObject.passWord;
      throw new HttpException(
        {
          result: candidateObject,
          status: HttpStatus.OK,
          message: 'Tạo tài khoản thành công',
        },
        HttpStatus.OK,
      );
    } else if (user.role === Role.RECRUITER) {
      const newRecruiter = await new this.accountModel({
        ...user,
        passWord: hashedPassword,
        role: Role.RECRUITER,
      }).save();
      const recruiterObject = newRecruiter.toObject();
      delete recruiterObject.passWord;
      throw new HttpException(
        {
          result: recruiterObject,
          status: HttpStatus.OK,
          message: 'Tạo tài khoản thành công',
        },
        HttpStatus.OK,
      );
    }
  }

  async validateAccount(email: string, passWord: string): Promise<Account> {
    const findUser = await this.accountModel
      .findOne({ email })
      .select('userName role email passWord status');
    if (!findUser)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.NOT_FOUND,
          message: 'Tài khoản không đúng !!!',
        },
        HttpStatus.OK,
      );
    const isValidPassword = await bcrypt.compare(passWord, findUser.passWord);
    if (!isValidPassword)
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.BAD_REQUEST,
          message: 'Mật khẩu không đúng !!!',
        },
        HttpStatus.OK,
      );
    const UserObject = findUser.toObject();
    delete UserObject.passWord;
    return UserObject;
  }

  async login(user: CreateAccountDTO) {
    const userValidate = await this.validateAccount(user.email, user.passWord);
    if (userValidate) {
      const token = await this.jwtService.signAsync(userValidate);
      throw new HttpException(
        {
          result: token,
          status: HttpStatus.OK,
          message: 'Đăng nhập thành công',
        },
        HttpStatus.OK,
      );
    }
  }
}
