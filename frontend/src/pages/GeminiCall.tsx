import { useForm } from "react-hook-form";
import { GeminiApi } from "../api/GeminiApi";
import { useState } from "react";
import { useTextToPdfForm } from "../api/UploadsApi";

type geminiFormData = {
  question: string;
};

const GeminiCall = () => {
  const { register, handleSubmit } = useForm<geminiFormData>();
  const [response, setResponse] = useState<string>("");
  const [resultFilename, setResultFilename] = useState<string>("");

  const { geminiform } = GeminiApi();
  const { textToPdf } = useTextToPdfForm(); // Move this hook call to the top level

  const onSubmit = async (data: geminiFormData) => {
    const result = await geminiform(data);
    console.log(result.reply.response.candidates);
    const ResponseText =
      result.reply.response.candidates[0]?.content.parts[0]?.text ||
      "No response received";

    setResponse(ResponseText);
    setResultFilename("answer.pdf");
  };

  const handleDownload = async () => {
    // Don't call useTextToPdfForm here, use the hook that was initialized at the top level
    const resultBlob = await textToPdf({ text: response });

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-pink-300 rounded-lg p-8 mb-6 text-center transition-color">
          <input
            {...register("question")}
            type="text"
            name="question"
            placeholder="Enter your text"
            className="border-1 font-medium py-1 px-2 rounded-lg cursor-pointer w-1/2"
          />
        </div>

        {/* Convert Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 py-3 px-4 rounded-lg font-bold transition-colors cursor-pointer"
        >
          Get Answer
        </button>
      </form>

      {response && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Response:</h2>
          <div className="prose max-w-none">
            {/* Render markdown response with line breaks */}
            {response.split("\n").map((line, index) => (
              <p key={index}>{line || <br />}</p>
            ))}
          </div>
          <button
            onClick={handleDownload}
            className="w-full bg-amber-600 py-3 px-4 rounded-lg font-bold transition-colors cursor-pointer mt-4"
          >
            Download File
          </button>
        </div>
      )}
    </>
  );
};

export default GeminiCall;
