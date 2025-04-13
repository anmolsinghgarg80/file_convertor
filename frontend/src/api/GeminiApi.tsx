import { useMutation } from "@tanstack/react-query";
type GeminiQuestion = {
  question: string;
};

export const GeminiApi = () => {
  const geminiApiRequest = async (form: GeminiQuestion) => {
    const response = await fetch("http://localhost:7000/api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      console.log("Error getting response");
      throw new Error("Error getting response");
    }

    return await response.json();
  };

  return {
    geminiform: useMutation<any, Error, GeminiQuestion>({
      mutationFn: geminiApiRequest,
    }).mutateAsync,
  };
};
