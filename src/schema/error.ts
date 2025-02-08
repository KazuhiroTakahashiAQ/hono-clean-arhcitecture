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

export const errorResponses = {
    400: {
        description:
            "The server cannot or will not process the request due to something that is perceived to be a client error.",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["BAD_REQUEST"])).openapi("ErrBadRequest"),
            },
        },
    },
    401: {
        description: `Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". ...`,
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["UNAUTHORIZED"])).openapi("ErrUnauthorized"),
            },
        },
    },
    403: {
        description:
            "The client does not have access rights to the content; ...",
        content: {
            "application/json": {
                schema: errorSchemaFactory(z.enum(["FORBIDDEN"])).openapi("ErrForbidden"),
            },
        },
    },


 // ...
}