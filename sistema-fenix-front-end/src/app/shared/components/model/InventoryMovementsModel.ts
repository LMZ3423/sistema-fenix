export class InventoryMovementsModel {
    constructor(
      public movementID: number,
      public productID: number,
      public userID: number,
      public movementType: string,
      public quantity: number,
      public movementDate: Date
    ) {}
  }
  