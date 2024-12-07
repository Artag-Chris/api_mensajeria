export function reemplazarValores(texto: string, valores: { [key: string]: string }): string {
    let nuevoTexto = texto;
  
    for (const clave in valores) {
      if (valores.hasOwnProperty(clave)) {
        const regex = new RegExp(`\\*\\{\\{${clave}\\}\\}\*`, 'g');
        nuevoTexto = nuevoTexto.replace(regex, `*${valores[clave]}*`);
      }
    }
  
    return nuevoTexto;
  }