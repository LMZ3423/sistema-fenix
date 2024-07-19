package com.spring.security.jwt.service;

import com.spring.security.jwt.model.InventoryMovementsModel;
import com.spring.security.jwt.model.ProductModel;
import com.spring.security.jwt.repository.IProductResository;
import com.spring.security.jwt.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class ProductService implements  IProductService{
    @Autowired
    private IProductResository iProductResository;
    
    @Autowired
    private ProductRepository productRepository;
    

    @Override
    public List<ProductModel> findAll() {
        List<ProductModel> list;
        try{
            list = iProductResository.findAllProducts();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }
    
    @Override
    public List<InventoryMovementsModel> findHistory() {
        List<InventoryMovementsModel> list;
        try{
            list = iProductResository.findHistory();
        }catch (Exception ex){
            throw ex;
        }
        return list;
    }
    
    // Método para guardar un producto con su registro en inventory
    @Override
    public ProductModel saveNewProduct(ProductModel product) {
        // Guarda el nuevo producto en la base de datos
        productRepository.saveNewProduct(product);
        
        // Obtén el ID del último producto insertado
        Long productId = productRepository.findLatestProductId();
        
        // Verifica si el productId es válido (no nulo y mayor que 0)
        if (productId != null && productId > 0) {
        	boolean productExists = productRepository.existsById(productId);
        	if(productExists) {
        		// Inserta en la tabla Inventory con el productId obtenido
        		productRepository.insertInventory(productId, 0);
        	}
        } else {
            // Manejo de error en caso de que productId no sea válido
            throw new IllegalStateException("No se pudo obtener un ID válido para el nuevo producto");
        }
        
        return product;
    }


	@Override
	public ProductModel updateStatus(ProductModel existingProduct) {
		productRepository.updateStatus(existingProduct);
		return null;
	}
	
	@Override
	public ProductModel inputProducts(ProductModel existingProduct) {
		productRepository.updateQuantity(existingProduct);
		return null;
	}
	
	@Override
	public ProductModel outputProducts(ProductModel existingProduct) {
		productRepository.updateQuantityOutput(existingProduct);
		return null;
	}
	
	

//	@Override
//	public ProductModel findById(Long productId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
    



}
