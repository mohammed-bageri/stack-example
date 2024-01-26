import { extname } from 'path';

export const customFileName = (
  _req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randomName}${fileExtName}`);
};

export const customDestination = (
  _req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  switch (true) {
    case !!file.originalname.match(/\.(jpg|jpeg|png|gif)$/):
      cb(null, './public/uploads/images');
      break;
    default:
      cb(null, './public/uploads/files');
      break;
  }
};

export const imageFileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const pdfFileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error('Only PDF files are allowed!'), false);
  }
  cb(null, true);
};
