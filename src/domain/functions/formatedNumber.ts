/**
 * Función para eliminar espacios en blanco y el símbolo '+' de un string.
 * @param input - El string de entrada.
 * @returns El string sin espacios en blanco y sin el símbolo '+'.
 */
export const cleanPhoneNumber = (input: string): string => {
    return input.replace(/\s+/g, '').replace(/\+/g, '');
};

