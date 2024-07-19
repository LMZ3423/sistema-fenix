import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductModel } from '../../shared/components/model/ProductModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export default class AddNewProductComponent implements OnInit {

  newProductModel: ProductModel = new ProductModel();
  newProductName: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  confirmAddProduct() {
    Swal.fire({
      title: '¿Deseas agregar un nuevo producto al inventario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitForm();
      }
    });
  }

  submitForm() {
    this.newProductModel.productName = this.newProductName.toString();
    this.productService.addProduct(this.newProductModel).subscribe(
      (response) => {
        Swal.fire({
          title: 'Producto agregado al inventario',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log('PRODUCTO AGREGADO: ', response);
        this.newProductName = '';
      },
      (error) => {
        Swal.fire({
          title: 'Error al efectuarse la operación',
          text: 'Comuníquese con el administrador',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al obtener los productos', error);
      }
    );
  }

}
