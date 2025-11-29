import axios from 'axios';
import { whatsappConfig } from './whatsapp-config';

interface SendMessagePayload {
  phone: string;
  message: string;
}

interface MessageResponse {
  phone: string;
  zaapId: string;
  messageID: string;
  type: string;
}

export async function enviarMensagemWhatsApp(payload: SendMessagePayload): Promise<MessageResponse | undefined> {
  try {
    const response = await axios.post<MessageResponse>(whatsappConfig.apiUrl, payload, {
      headers: {
        'Client-Token': whatsappConfig.clientToken,
        'Content-Type': 'application/json',
      },
    });

    console.log('Mensagem WhatsApp enviada com sucesso!');
    console.log('Resposta:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao enviar mensagem WhatsApp:', error.message);
      console.error('Detalhes do erro:', error.response?.data);
    } else {
      console.error('Ocorreu um erro inesperado:', error);
    }
    return undefined;
  }
}

export function gerarMensagemPaciente(
  nomePaciente: string,
  corPrioridade: string,
  posicaoFila: number,
  tempoEstimado: string
): string {
  return `Olá ${nomePaciente}, tudo certo?

Aqui estão as informações sobre a fila:

🏥 Cor do Protocolo: ${corPrioridade}
📋 Posição na Fila: ${posicaoFila}
⏰ Tempo de espera total estimado: ${tempoEstimado}

Contate-nos para mais detalhes.`;
}
