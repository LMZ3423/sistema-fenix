package com.spring.security.jwt.repository;

import com.spring.security.jwt.model.InventoryMovementsModel;
import com.spring.security.jwt.model.ProductModel;

import java.util.List;

public interface IProductResository {
    public List<ProductModel> findAllProducts();

	ProductModel saveNewProduct(ProductModel product);

	public List<InventoryMovementsModel> findHistory();

//	ProductModel save(ProductModel product);
}
