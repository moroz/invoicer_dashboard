export interface Company {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
  insertedAt: string;
  updatedAt: string;
}

export interface CompanyParams {
  name: string;
  addressLine: string;
  city: string;
  vatId: string;
  postalCode: string;
}
