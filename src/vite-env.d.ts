/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HCAPTCHA_SITEKEY: string,
    readonly VITE_API_HOST: string,
    readonly VITE_EVENTS_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}