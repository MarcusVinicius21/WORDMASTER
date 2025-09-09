import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // O corpo da requisição (request.body) é o arquivo sendo enviado
  if (!filename || !request.body) {
    return NextResponse.json({ error: "Nenhum arquivo para upload." }, { status: 400 });
  }

  try {
    // Faz o upload do arquivo para o Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public', // Torna o arquivo publicamente acessível
    });

    // Retorna a resposta do Vercel Blob, que inclui a URL pública
    return NextResponse.json(blob);

  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json({ error: 'Falha no upload do arquivo.', details: error.message }, { status: 500 });
  }
}