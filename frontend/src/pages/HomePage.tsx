import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadForm } from "../api/UploadsApi";
import Hero from "../components/Hero";

type FormFields = {
  uploadedimages: FileList;
  conversionType: string;
};

const HomePage = () => {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      conversionType: "image-to-pdf",
    },
  });
  const { uploadform } = useUploadForm();

  // State for storing the converted file blob and filename
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFilename, setResultFilename] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onSubmit = async (data: FormFields) => {
    if (!data.uploadedimages || data.uploadedimages.length === 0) {
      alert("Please upload a file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create a progress timer to simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 300);

    const formData = new FormData();
    for (let i = 0; i < data.uploadedimages.length; i++) {
      formData.append("uploadedimages", data.uploadedimages[i]);
    }
    formData.append("conversionType", data.conversionType);

    try {
      const convertedBlob = await uploadform(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Set the result filename
      setResultBlob(convertedBlob);
      setResultFilename(
        data.uploadedimages[0].name.replace(/\.[^/.]+$/, "") + ".pdf"
      );

      setTimeout(() => setIsUploading(false), 500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      console.error("Conversion failed:", error);
    }
  };

  // Function to trigger the download
  const handleDownload = () => {
    if (resultBlob && resultFilename) {
      const url = window.URL.createObjectURL(resultBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resultFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      {/* Hero Section */}
      <Hero />

      <h1 className="text-4xl md:text-2xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Convert images to pdf
      </h1>
      {/* Conversion Card */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden mb-16">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="border-2 rounded-lg p-8 mb-6 text-center transition-color">
            <input
              {...register("uploadedimages")}
              type="file"
              name="uploadedimages"
              multiple
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors cursor-pointer inline-block"
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Converting..." : "Convert Now"}
          </button>
        </form>

        {/* Progress Bar (only visible during upload) */}
        {isUploading && (
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {uploadProgress === 100
                ? "Finalizing conversion..."
                : "Processing your files..."}
            </p>
          </div>
        )}

        {/* Download Button (only visible after upload) */}
        {resultBlob && !isUploading && (
          <div className="px-6 pb-6 text-center">
            <p className="text-lg text-green-600 font-medium mb-4">
              ✓ Conversion completed successfully!
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center transition-colors"
              onClick={handleDownload}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
              Download Result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
