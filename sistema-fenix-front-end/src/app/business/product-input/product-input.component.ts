import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductModel } from '../../shared/components/model/ProductModel';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css'],
})
export default class ProductInputComponent implements OnInit {

  entryProductId: number | null = null;
  entryQuantity: number | null = null;
  newProductModel: ProductModel = new ProductModel();

  constructor(private productService: ProductService) { }

  ngOnInit() { }

  entradaDeProductos() {
    if (this.entryQuantity == null || this.entryQuantity <= 0) {
      Swal.fire('Error', 'Debes agregar al menos una unidad.', 'error');
      return;
    }    

    Swal.fire({
      title: 'Confirmar Entrada',
      text: `¿Deseas agregar ${this.entryQuantity} unidades al producto con ID ${this.entryProductId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.newProductModel.productId = Number(this.entryProductId);
        this.newProductModel.quantity = Number(this.entryQuantity);
        this.newProductModel.movementType = 'Entrada';

        this.productService.addProductEntry(this.newProductModel).subscribe(
          (response) => {
            Swal.fire('Éxito', `Has agregado con éxito ${this.entryQuantity} unidades al producto con ID ${this.entryProductId}`, 'success');
            this.entryProductId = null;
            this.entryQuantity = null;
          },
          (error) => {
            Swal.fire('Error', 'Error al efectuarse la operación, comuníquese con el administrador', 'error');
          }
        );
      }
    });
  }
}
