import axios, { AxiosError } from "axios";

type Props = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  withAuth?: boolean;
};

// O tipo genérico 'TypeResponse' pode ser qualquer nome que você queira dar para o tipo da resposta da API.
// Exemplos comuns: 'ResponseType', 'T', 'ApiResponse', etc.
// Ele serve para definir o tipo da resposta da API, que pode ser um objeto de sucesso ou um erro.

export const api = async <TypeResponse>({
  endpoint,
  data,
  method = "GET",
  withAuth = true,
}: Props) => {
  // Criação de uma instância do axios com a URL base configurada a partir da variável de ambiente
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  // Se a autenticação for necessária, o token do usuário será adicionado no cabeçalho da requisição.
  if (withAuth) {
    instance.defaults.headers.common["Authorization"] = localStorage.getItem(
      import.meta.env.VITE_LOCAL_STORAGE_AUTH_KEY
    );
  }

  try {
    // Aqui, estamos fazendo a requisição utilizando o método específico.
    // 'TypeResponse' serve para tipar a resposta da API.
    const request = await instance<TypeResponse>({
      method,
      // Se o método for 'GET', os dados serão passados como parâmetros de consulta na URL (query string).
      // 'params' é usado para isso, e ele recebe 'data' se o método for 'GET'.
      params: method === "GET" && data,

      // Se o método não for 'GET', os dados serão enviados no corpo da requisição.
      // 'data' é utilizado para enviar esses dados no corpo, normalmente em requisições POST, PUT, PATCH, etc.
      data: method !== "GET" && data,
    });

    // Retorna os dados da resposta da API.
    // Aqui, 'request.data' contém os dados de sucesso retornados pela API.
    return {
      data: request.data,
    };
  } catch (error) {
    // Tratamento de erro: se houver um erro na requisição, ele será capturado aqui.
    // 'AxiosError' é uma tipagem que define o erro esperado do Axios, incluindo uma mensagem.
    const e = error as AxiosError<{ message: string }>;

    // Retorna o erro. Se a resposta da API contiver uma mensagem de erro, essa mensagem será retornada.
    // Caso contrário, retorna a mensagem de erro padrão.
    return {
      error: e.response?.data.message ?? e.message,
    };
  }
};
