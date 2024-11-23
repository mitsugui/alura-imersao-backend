// Importa a classe GoogleGenerativeAI da biblioteca @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o cliente da API do Gemini com a chave de API 
// armazenada na variável de ambiente GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo Gemini 1.5 Flash
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Gera uma descrição em português brasileiro para uma imagem usando o Gemini.
 *
 * @param {Buffer} imageBuffer - O buffer da imagem.
 * @returns {Promise<string>} Uma promessa que resolve com a descrição da imagem.
 */
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define o prompt para o modelo Gemini
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Formata a imagem como um objeto JSON que a API do Gemini espera
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer para base64
        mimeType: "image/png", // Define o tipo MIME da imagem como PNG
      },
    };

    // Chama a API do Gemini para gerar a descrição
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto da descrição ou uma mensagem de erro caso não esteja disponível
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Captura e registra qualquer erro que ocorra durante a chamada da API
    console.error("Erro ao obter alt-text:", erro.message, erro);

    // Lança um novo erro com uma mensagem mais amigável
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}