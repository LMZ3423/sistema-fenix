package com.spring.security.jwt.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.spring.security.jwt.model.InventoryMovementsModel;
import com.spring.security.jwt.model.ProductModel;

@Repository
public class ProductRepository implements IProductResository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<ProductModel> findAllProducts() {
		String SQL = "SELECT Products.ProductID, Products.ProductName, Products.Status, Inventory.Quantity "
				+ "FROM Products " + "INNER JOIN Inventory ON Products.ProductID = Inventory.ProductID "
				+ "ORDER BY Products.ProductID DESC";
		return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(ProductModel.class));
	}

	@Override
	public List<InventoryMovementsModel> findHistory() {
		String SQL = "SELECT * FROM InventoryMovements ORDER BY MovementDate DESC";
		return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(InventoryMovementsModel.class));
	}

	@Override
	public ProductModel saveNewProduct(ProductModel product) {
	    String checkProductExistsSQL = "SELECT COUNT(*) FROM products WHERE ProductName = ?";
	    Integer count = jdbcTemplate.queryForObject(checkProductExistsSQL, Integer.class, product.getProductName());

	    if (count != null && count > 0) {
	        throw new IllegalArgumentException("El producto ya existe");
	    }

	    String insertProductSQL = "INSERT INTO products (ProductName, Status) VALUES (?, ?)";
	    jdbcTemplate.update(insertProductSQL, product.getProductName(), product.getStatus());

	    return product;
	}


	public Long findLatestProductId() {
		String SQL = "SELECT @@IDENTITY";
		return jdbcTemplate.queryForObject(SQL, Long.class);
	}

	public void insertInventory(Long productId, int quantity) {
		String insertInventorySQL = "INSERT INTO inventory (ProductID, Quantity) VALUES (?, ?)";
		jdbcTemplate.update(insertInventorySQL, productId, quantity);
	}

	public void updateStatus(ProductModel product) {
		String SQL = "UPDATE Products SET Status = ? WHERE ProductID = ?";
		jdbcTemplate.update(SQL, product.getStatus(), product.getProductId());
	}

	@Transactional
	public void updateQuantity(ProductModel product) {
		// Actualizar la cantidad de productos en la tabla Inventory
		String updateQuantitySQL = "UPDATE Inventory SET quantity = quantity + ? WHERE productID = ?";
		jdbcTemplate.update(updateQuantitySQL, product.getQuantity(), product.getProductId());

		// Registrar el movimiento en la tabla InventoryMovements
		String registerMovementSQL = "INSERT INTO InventoryMovements (ProductID, UserID, MovementType, Quantity, MovementDate) VALUES (?, ?, ?, ?, ?)";
		jdbcTemplate.update(registerMovementSQL, product.getProductId(), 1, product.getMovementType(),
				product.getQuantity(), new Timestamp(System.currentTimeMillis()));
	}

	@Transactional
	public void updateQuantityOutput(ProductModel product) {
		// Actualizar la cantidad de productos en la tabla Inventory
		String updateQuantitySQL = "UPDATE Inventory SET quantity = quantity - ? WHERE productID = ?";
		jdbcTemplate.update(updateQuantitySQL, product.getQuantity(), product.getProductId());

		// Registrar el movimiento en la tabla InventoryMovements
		String registerMovementSQL = "INSERT INTO InventoryMovements (ProductID, UserID, MovementType, Quantity, MovementDate) VALUES (?, ?, ?, ?, ?)";
		jdbcTemplate.update(registerMovementSQL, product.getProductId(), 1, product.getMovementType(),
				product.getQuantity(), new Timestamp(System.currentTimeMillis()));
	}

	public boolean existsById(long productId) {
		String sql = "SELECT COUNT(*) FROM dbo.Products WHERE ProductID = ?";
		int count = jdbcTemplate.queryForObject(sql, Integer.class, productId);
		return count > 0;
	}

}
