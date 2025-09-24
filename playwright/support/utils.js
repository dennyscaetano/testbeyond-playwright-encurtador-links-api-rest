// Função para gerar um ULID (identificador único lexicográfico)
export function generateULID() {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Conjunto de caracteres permitidos

  // Codifica a parte do tempo em 10 caracteres
  function encodeRandom(time) {
    let str = '';
    for (let i = 0; i < 10; i++) {
      str = ENCODING[time % 32] + str; // Converte para base32 usando ENCODING
      time = Math.floor(time / 32);
    }
    return str;
  }

  // Gera a parte aleatória do ULID com tamanho definido
  function randomPart(len) {
    let str = '';
    for (let i = 0; i < len; i++) {
      str += ENCODING[Math.floor(Math.random() * 32)]; // Escolhe caracteres aleatórios
    }
    return str;
  }

  // Retorna ULID completo: parte do tempo + parte aleatória
  return encodeRandom(Date.now()) + randomPart(16);
}
