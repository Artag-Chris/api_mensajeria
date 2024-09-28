import{envs} from "../envs"

export const phonesUrls= `https://graph.facebook.com/${envs.Version}/${envs.WABA_ID}/phone_numbers`

export const templatesUrls=`https://graph.facebook.com/${envs.Version}/${envs.WABA_ID}/message_templates?fields=name,components,status,category`