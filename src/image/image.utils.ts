import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { dir } from 'console';
import { encode } from 'blurhash';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const imageFilePathEatery = (req, file, callback) => {
  var path = './upload/' + req.user.id + '/eateries';

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  callback(null, path);
};

export const imageFilePathCat = (req, file, callback) => {
  var path = './upload/' + req.user.id + '/categories';

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  callback(null, path);
};

export const imageFilePathFood = (req, file, callback) => {
  var path = './upload/' + req.user.id + '/foods';

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  callback(null, path);
};

export const imageFilePathProfile = (req, file, callback) => {
  var path = './upload/' + req.user.id + '/profiles';

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  callback(null, path);
};

export const imageFileName = (req, file, callback) => {
  const name = uuidv4();
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
