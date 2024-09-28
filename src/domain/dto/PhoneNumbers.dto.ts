/**
 * Dto de la respuesta entregada por la API de WhatsApp al consultar los números de teléfono.
 */
export interface PhoneNumbersDTO {
    data: PhoneNumberData[];
    paging: {
      cursors: {
        before: string;
        after: string;
      };
    };
  }
  
  /**
   * Interfaz que contiene la estructura de un número de teléfono proporcionado por la API de WhatsApp.
   */
  interface PhoneNumberData {
    verified_name: string;
    code_verification_status: string;
    display_phone_number: string;
    quality_rating: string;
    platform_type: string;
    throughput: {
      level: string;
    };
    id: string;
  }