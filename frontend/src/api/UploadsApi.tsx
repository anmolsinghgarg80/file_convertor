import { useMutation } from "@tanstack/react-query";

export const useUploadForm = () => {
  const uploadFormRequest = async (form: FormData): Promise<Blob> => {
    const response = await fetch("http://localhost:7000/api/uploads/images", {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      console.log("Error uploading image");
      throw new Error("File upload failed");
    }

    return await response.blob();
  };

  return {
    uploadform: useMutation<Blob, Error, FormData>({
      mutationFn: uploadFormRequest,
    }).mutateAsync,
  };
};

type textData = {
  text: string;
};

export const useTextToPdfForm = () => {
  const textToPdfRequest = async (data: textData) => {
    const response = await fetch("http://localhost:7000/api/uploads/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error getting response");
      throw new Error("Error getting response");
    }

    return await response.blob();
  };

  return {
    textToPdf: useMutation<any, Error, textData>({
      mutationFn: textToPdfRequest,
    }).mutateAsync,
  };
};
