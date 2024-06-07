import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dpyvbsl6p', 
  api_key: '863819763933962', 
  api_secret: '7pu0_OqGquUXac5L_r3FWgclMGg' ,
  secure: true,
});

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath ,{
          upload_preset: "unsigned_upload",
          public_id: "course_images",
          allowed_formats: ['png' , 'jpg' , 'svg' , 'jpeg' , 'webp']
        });
        console.log('Image upload result:', result);
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Error uploading image');
    }
};

export { uploadImage };
