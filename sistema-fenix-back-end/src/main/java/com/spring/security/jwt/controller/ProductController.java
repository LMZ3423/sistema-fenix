package com.spring.security.jwt.controller;

import com.spring.security.jwt.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.spring.security.jwt.model.InventoryMovementsModel;
import com.spring.security.jwt.model.ProductModel;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("api/v1")
public class ProductController {

    @Autowired
    IProductService iProductService;

    @GetMapping("/list")
    public ResponseEntity<?> list() {
        List<ProductModel> products = this.iProductService.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @GetMapping("/history")
    public ResponseEntity<?> history() {
        List<InventoryMovementsModel> products = this.iProductService.findHistory();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<ProductModel> addProduct(@RequestBody ProductModel productName) {
        ProductModel product = new ProductModel();
        product.setProductName(productName.getProductName());
        product.setStatus(true); 
        ProductModel savedProduct = iProductService.saveNewProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    
    @PutMapping("/updateStatus")
    public ResponseEntity<ProductModel> updateProductStatus(@RequestBody ProductModel product) {
        ProductModel updatedProduct = iProductService.updateStatus(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    @PutMapping("/entry")
    public ResponseEntity<ProductModel> inputProducts(@RequestBody ProductModel product) {
        ProductModel updatedProduct = iProductService.inputProducts(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    @PutMapping("/output")
    public ResponseEntity<ProductModel> outputProducts(@RequestBody ProductModel product) {
        ProductModel updatedProduct = iProductService.outputProducts(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    
    
    

}