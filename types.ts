
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  details: string;
  warranty: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
