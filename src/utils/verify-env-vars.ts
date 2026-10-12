import "dotenv/config";
// import { Request, Response, NextFunction } from "express";

interface EnvVariables {
    PORT: string | undefined;
    SESSION_SECRET: string | undefined;
    WEB_URL: string | undefined;
}

const verifyEnvVars = () => {
     const env_variables: EnvVariables = {
        PORT: process.env.PORT,
        SESSION_SECRET: process.env.SESSION_SECRET,
        WEB_URL: process.env.WEB_URL,
    };

    const missingEnvVars = Object.entries(env_variables)
        .reduce(
            (acc, [key, value]) => {
                if (!value) return [
                    ...acc,
                    key
                ];

                return acc;
            },
            [] as string[]
        );

    if (missingEnvVars.length) {
        console.error(`❌ Missing ENVs: ${missingEnvVars.join(", ")}`)
        process.exit(1);
    }

    // if all envs are available, proceed...
}

verifyEnvVars();
