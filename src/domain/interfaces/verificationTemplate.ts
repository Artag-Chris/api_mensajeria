export interface Verification {
    messaging_product: string;
    recipient_type:    string;
    to:                string;
    type:              string;
    template:          Template;
}

export interface Template {
    name:       string;
    language:   Language;
    components: Component[];
}

export interface Component {
    type:       string;
    parameters: Parameter[];
    sub_type?:  string;
    index?:     string;
}

export interface Parameter {
    type: string;
    text: string;
}

export interface Language {
    code: string;
}
