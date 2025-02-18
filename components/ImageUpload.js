"use client";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = () => {
  return (
    <CldUploadWidget uploadPreset="nextjs">
      {({ open }) => (
        <button
          className="bg-blue-600 text-white p-4 rounded-lg"
          onClick={() => open()}
        >
          Upload an Image
        </button>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
