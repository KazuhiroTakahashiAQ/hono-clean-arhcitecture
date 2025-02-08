import { z } from "zod";

const successSchemaFactory = (code: z.ZodEnum<any>) => {
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

// 200
export const okResponse = (description? :string, schema?: z.ZodObject<any> | z.ZodArray<any>) => {
    return {
        description: description || "OK",
        content: {
            "application/json": {
                schema: schema || z.object({}),
            },
        },
    };
}

// 201
export const createdResponse = (description? :string, schema?: z.ZodObject<any> | z.ZodArray<any>) => {
    return {
      description: description || "Created",
      content: {
          "application/json": {
              schema: schema || z.object({}),
          },
      },
    };
}

// 204
export const noContentResponse = (description? :string) => {
    return {
      description: description || "No Content",
    };

 // ...
}