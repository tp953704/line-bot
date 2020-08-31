type typeDbConfig = {
    mongoURI: string,
    secretOrKey: string
}

export const dbConfig : typeDbConfig = {
    mongoURI: process.env.MONOGO_URI || "",
    secretOrKey:"secret"
}
