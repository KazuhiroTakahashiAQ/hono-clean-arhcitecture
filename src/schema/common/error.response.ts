import { z } from "zod";

const errorSchemaFactory = (code: z.ZodEnum<any>) => {
    return z.object({
        error: z.object({
            code: code.openapi({
                description: "error code.",
                example: code._def.values.at(0),
            }),
            message: z
                .string()
                .openapi({ description: "explanation" }),
            // requestId: z.string().openapi({
            //     description: "requestId",
            //     example: "req_1234",
            // }),
        }),
    });
}

export const notFoundShcema = errorSchemaFactory(z.enum(["NOTFOUND"])).openapi("ErrNOTFOUND")
export type notFoundType = z.infer<typeof notFoundShcema>

export const notFound = {
    404: {
        description:
            "The client is authenticated but does not have sufficient permissions to access the requested resource.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["NOTFOUND"])).openapi("ErrNOTFOUND"),
            },
        },
    },
}

export const errorResponses = {
    400: {
        description:
            "The server cannot process the request due to a client-side error, such as malformed syntax or invalid request parameters.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["BAD_REQUEST"])).openapi("ErrBadRequest"),
            },
        },
    },
    401: {
        description: "Authentication is required and has either not been provided or is invalid.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["UNAUTHORIZED"])).openapi("ErrUnauthorized"),
            },
        },
    },
    403: {
        description:
            "The client is authenticated but does not have sufficient permissions to access the requested resource.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["FORBIDDEN"])).openapi("ErrForbidden"),
            },
        },
    },
    404: {
        description:
            "The client is authenticated but does not have sufficient permissions to access the requested resource.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["NOTFOUND"])).openapi("ErrNOTFOUND"),
            },
        },
    },


 // ...
}