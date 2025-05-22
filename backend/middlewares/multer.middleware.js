import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file.fieldname === 'resume' && allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === 'videoResume' && file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPEG, JPG for resume and MP4 for video resume are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 40 * 1024 * 1024 }, // 10MB limit
});

export default upload;