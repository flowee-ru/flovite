/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_HCAPTCHA_SITEKEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}