import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../core/services/product.service';
import { ProductModel } from '../../shared/components/model/ProductModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-output',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-output.component.html',
  styleUrls: ['./product-output.component.css']
})
export default class ProductOutputComponent implements OnInit {

  exitProductId: number | null = null;
  exitQuantity: number | null = null;
  products: ProductModel[] = [];
  paginatedProducts: ProductModel[] = [];
  pageSize: number = 5;  // Tamaño de página inicial
  currentPage: number = 1;  // Página actual
  totalItems: number = 0;  // Total de productos (para la paginación)

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList(): void {
    this.productService.getProductList().subscribe(
      (response) => {
        // Filtrar los productos activos
        this.products = response.filter((product: { status: boolean; }) => product.status === true);
        this.totalItems = this.products.length;
        this.paginateProducts();
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  openConfirmDialog(): void {
    if (this.exitProductId !== null && this.exitQuantity !== null) {
      // Verifica que exitProductId y exitQuantity sean enteros válidos
      if (Number.isInteger(this.exitProductId) && Number.isInteger(this.exitQuantity)) {
        Swal.fire({
          title: 'Confirmación',
          text: `¿Desea registrar una salida de ${this.exitQuantity} unidades del producto con ID ${this.exitProductId}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.salidaDeProductos();
          }
        });
      } else {
        Swal.fire('Error', 'Los valores deben ser enteros válidos.', 'error');
      }
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
    }
  }

  salidaDeProductos() {
    const newProductModel = new ProductModel();
    newProductModel.productId = Number(this.exitProductId);
    newProductModel.quantity = Number(this.exitQuantity);
    newProductModel.movementType = "Salida";

    this.productService.addOutput(newProductModel).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Salida registrada exitosamente.', 'success');
        this.loadProductList();
        this.exitProductId = null;
        this.exitQuantity = null;
      },
      (error) => {
        Swal.fire('Error', 'Error al efectuar el movimiento, comuníquese con el administrador.', 'error');
      }
    );
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.paginateProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  filterProductsById(id: string): void {
    if (id) {
      const idNumber = Number(id); // Convertir el ID a número
      this.paginatedProducts = this.products.filter(product => product.productId === idNumber);
    } else {
      this.paginateProducts(); // Mostrar productos paginados si no hay ID
    }
  }
}
