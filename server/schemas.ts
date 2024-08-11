export default [
  {
    $id: "printmessageparams",
    type: "object",
    additionalProperties: false,
    properties: {
      message: { type: "string" }
    },
    required: ["message"],
  } as const,
];




