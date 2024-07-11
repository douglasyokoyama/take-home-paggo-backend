export interface InvoiceSummary {
  label: string;
  value: string;
}

export interface InvoiceDetail {
  id: number;
  file_name: string;
  status: string;
  created_at: Date;
  summary?: InvoiceSummary[];
}
