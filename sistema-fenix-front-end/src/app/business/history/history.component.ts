import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { InventoryMovementsModel } from '../../shared/components/model/InventoryMovementsModel';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export default class HistoryComponent implements OnInit {
  movements: InventoryMovementsModel[] = [];
  filteredMovements: InventoryMovementsModel[] = [];
  paginatedMovements: InventoryMovementsModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadMovementHistory();
  }

  loadMovementHistory(): void {
    this.productService.getMovementHistory().subscribe((data) => {
      this.movements = data;
      this.filteredMovements = data;
      this.totalPages = Math.ceil(this.filteredMovements.length / this.itemsPerPage);
      this.updatePaginatedMovements();
    });
  }

  filterMovements(type: string): void {
    this.filteredMovements = this.movements.filter(movement => movement.movementType === type);
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredMovements.length / this.itemsPerPage);
    this.updatePaginatedMovements();
  }

  clearFilter(): void {
    this.filteredMovements = this.movements;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredMovements.length / this.itemsPerPage);
    this.updatePaginatedMovements();
  }

  updatePaginatedMovements(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMovements = this.filteredMovements.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedMovements();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedMovements();
    }
  }
}

