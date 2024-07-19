import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../shared/components/model/ProductModel';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export default class InventoryComponent implements OnInit {
  products: ProductModel[] = [];
  paginatedProducts: ProductModel[] = [];
  newProductName: String = '';
  newProductModel: ProductModel = new ProductModel();
  entryProductId: number | null = null;
  entryQuantity: number | null = null;
  roleID: number | null = null;

  pageSize: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProductList();
    this.roleID = this.authService.getRoleID();
    console.log('roleID:', this.roleID);
  }

  loadProductList(): void {
    this.productService.getProductList().subscribe(
      (response) => {
        this.products = response;
        this.totalItems = this.products.length;
        this.paginateProducts();
        console.log('Productos:', this.products);
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  submitForm(): void {
    this.newProductModel.productName = this.newProductName.toString();
    this.productService.addProduct(this.newProductModel).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.loadProductList();
      },
      (error) => {
        console.error('Error al agregar el producto', error);
      }
    );
  }

  onStatusChange(product: ProductModel): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres ${product.status ? 'desactivar' : 'activar'} este producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiarlo',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedProduct: ProductModel = { ...product, status: !product.status };
        this.productService.updateProductStatus(updatedProduct).subscribe(
          (response) => {
            product.status = updatedProduct.status;
            Swal.fire(
              'Actualizado',
              `El producto ha sido ${product.status ? 'activado' : 'desactivado'}.`,
              'success'
            );
          },
          (error) => {
            console.error('Error al actualizar el estado del producto', error);
          }
        );
      }
    });
  }


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginateProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
}
