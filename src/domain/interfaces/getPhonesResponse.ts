export interface PhonesResponse {
    verified_name:            string;
    code_verification_status: string;
    display_phone_number:     string;
    quality_rating:           string;
    platform_type:            string;
    throughput:               Throughput;
    webhook_configuration:    WebhookConfiguration;
    id:                       string;
}

export interface Throughput {
    level: string;
}

export interface WebhookConfiguration {
    application: string;
}
