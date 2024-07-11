export const ExpenseAnalysisStandardFields = {
  INVOICE_RECEIPT_DATE: 'Invoice Receipt Date',
  INVOICE_RECEIPT_ID: 'Invoice Receipt ID',
  TAX_PAYER_ID: 'Invoice Tax Payer ID',
  CUSTOMER_NUMBER: 'Customer Number',
  ACCOUNT_NUMBER: 'Account Number',
  VENDOR_NAME: 'Vendor Name',
  RECEIVER_NAME: 'Receiver Name',
  VENDOR_ADDRESS: 'Vendor Address',
  RECEIVER_ADDRESS: 'Receiver Address',
  ORDER_DATE: 'Order Date',
  DUE_DATE: 'Due Date',
  DELIVERY_DATE: 'Delivery Date',
  PO_NUMBER: 'PO Number',
  PAYMENT_TERMS: 'Payment Terms',
  TOTAL: 'Total',
  AMOUNT_DUE: 'Amount Due',
  AMOUNT_PAID: 'Amount Paid',
  SUBTOTAL: 'Subtotal',
  TAX: 'Tax',
  SERVICE_CHARGE: 'Service Charge',
  GRATUITY: 'Gratuity',
  PRIOR_BALANCE: 'Prior Balance',
  DISCOUNT: 'Discount',
  SHIPPING_HANDLING_CHARGE: 'Shipping and Handling Charge',
  VENDOR_ABN_NUMBER: 'Vendor ABN Number',
  VENDOR_GST_NUMBER: 'Vendor GST Number',
  VENDOR_PAN_NUMBER: 'Vendor PAN Number',
  VENDOR_VAT_NUMBER: 'Vendor VAT Number',
  RECEIVER_ABN_NUMBER: 'Receiver ABN Number',
  RECEIVER_GST_NUMBER: 'Receiver GST Number',
  RECEIVER_PAN_NUMBER: 'Receiver PAN Number',
  RECEIVER_VAT_NUMBER: 'Receiver VAT Number',
  VENDOR_PHONE: 'Vendor Phone',
  RECEIVER_PHONE: 'Receiver Phone',
  VENDOR_URL: 'Vendor URL',
  ITEM: 'Line Item/Item Description',
  QUANTITY: 'Line Item/Quantity',
  PRICE: 'Line Item/Total Price',
  UNIT_PRICE: 'Line Item/Unit Price',
  PRODUCT_CODE: 'Line Item/ProductCode',
  ADDRESS: 'Address (Bill To, Ship To, Remit To, Supplier)',
  NAME: 'Name (Bill To, Ship To, Remit To, Supplier)',
  ADDRESS_BLOCK:
    'Core Address (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
  STREET:
    'Street Address (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
  CITY: 'City (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
  STATE: 'State (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
  COUNTRY: 'Country (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
  ZIP_CODE: 'ZIP Code (Vendor, Receiver, Bill To, Ship To, Remit To, Supplier)',
};

export interface ExpenseFieldList {
  Type: { Text: string; Confidence: number };
  ValueDetection: { Text: string; Confidence: number };
  pageNumber: number;
}

export interface InvoiceExtractRaw {
  expensesFieldList: ExpenseFieldList[][];
}
