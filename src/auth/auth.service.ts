import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  products: Auth[] = [];

  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async signin(email, pass) {
    try {
      try {
        const userExist = await this.authModel.findOne({ email: email });
        if (!userExist) {
          return 'User Does not Exist';
        }
        if (!bcrypt.compareSync(pass, userExist.hash)) return 'Incorrect Password';

        const token = jwt.sign({ email: userExist.email }, 'secret', {
          expiresIn: '1h',
        });
        const user = {
          userExist,
          token,
        };
        return user;
      } catch (error) {
        throw [404, error.message];
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async signup(req) {
    try {
      const uniqueMail = await this.authModel.findOne({ email: req.email });
      console.log(uniqueMail);
      if (!uniqueMail) {
        req.hash = bcrypt.hashSync(req.password, 8);
        delete req.password;

        const newUser = new this.authModel(req);
        const user = await this.authModel.create(newUser);
        return user;
      } else {
        return 'User Already Exist';
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
