import { z } from "zod";

// 200
export const okResponse = (description? :string, schema?: z.ZodTypeAny) => {
    return {
        200: {
            description: description || "OK",
            content: {
                "application/json": {
                    schema: schema || z.object({}),
                },
            },
        }
    };
}

// 201
export const createdResponse = (description? :string, schema?: z.ZodTypeAny) => {
    return {
        201: {
            description: description || "Created",
            content: {
                "application/json": {
                    schema: schema || z.object({}),
                },
            },
        }
    };
}

// 204
export const noContentResponse = (description? :string) => {
    return {
        204: {
            description: description || "No Content",
        }
    };

 // ...
}