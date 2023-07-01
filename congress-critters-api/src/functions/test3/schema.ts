export default {
  type: "object",
  properties: {
    fingerPrintHash: { type: 'string' },
    fingerPrintData: { type: 'object'},
    address:{ type: 'string' }
  },
  //required: ['name']
} as const;
