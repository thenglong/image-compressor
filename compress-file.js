import imagemin from "imagemin";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminPngquant from "imagemin-pngquant";

export const compressFile = async (fileBuffer, { min = 20, max = 60 }) => {
  return imagemin.buffer(fileBuffer, {
    plugins: [
      imageminJpegRecompress({
        min,
        max,
      }),
      imageminPngquant({
        quality: [min / 100, max / 100],
      }),
    ],
  });
};
