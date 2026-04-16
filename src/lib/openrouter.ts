import axios from 'axios';

const BASE_URL = 'https://openrouter.ai/api/v1';

export const testConnection = async (apiKey: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/key`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchModels = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/models`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const sendChatCompletion = async (apiKey: string, payload: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/chat/completions`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'NexusHub Studio IA'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
