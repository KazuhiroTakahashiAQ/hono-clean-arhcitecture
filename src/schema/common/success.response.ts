import { z } from "zod";

// 200
export const okResponse = (description? :string, schema?: z.ZodTypeAny) => {
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
export const createdResponse = (description? :string, schema?: z.ZodTypeAny) => {
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