export class ProductModel {
  productId: number;
  productName: string;
  status: boolean;
  quantity: number;
  movementType: string;

  constructor() {
    this.productId = 0;
    this.productName = '';
    this.status = false;
    this.quantity = 0;
    this.movementType = '';
  }
}
