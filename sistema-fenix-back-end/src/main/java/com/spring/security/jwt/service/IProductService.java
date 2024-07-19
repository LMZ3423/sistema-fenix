package com.spring.security.jwt.service;

import com.spring.security.jwt.model.InventoryMovementsModel;
import com.spring.security.jwt.model.ProductModel;

import java.util.List;

public interface IProductService {
	
    public List<ProductModel> findAll();
    
    public List<InventoryMovementsModel> findHistory();

	public ProductModel saveNewProduct(ProductModel product);

	public ProductModel updateStatus(ProductModel existingProduct);
	
	public ProductModel inputProducts(ProductModel existingProduct);

	public ProductModel outputProducts(ProductModel product);

//	public ProductModel findById(Long productId);
    
    
}