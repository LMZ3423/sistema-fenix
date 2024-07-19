package com.spring.security.jwt.model;

import java.util.Date;

public class InventoryMovementsModel {
	private int movementID;
    private int productID;
    private int userID;
    private String movementType;
    private int quantity;
    private Date movementDate;

    // Constructor vacío (por si es necesario)
    public void ProductMovementModel() {
    }

    // Constructor con todos los atributos
    public void ProductMovementModel(int productID, int userID, String movementType, int quantity, Date movementDate) {
        this.productID = productID;
        this.userID = userID;
        this.movementType = movementType;
        this.quantity = quantity;
        this.movementDate = movementDate;
    }

    // Getters y setters
    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getMovementType() {
        return movementType;
    }

    public void setMovementType(String movementType) {
        this.movementType = movementType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getMovementDate() {
        return movementDate;
    }

    public void setMovementDate(Date movementDate) {
        this.movementDate = movementDate;
    }

	public int getMovementID() {
		return movementID;
	}

	public void setMovementID(int movementID) {
		this.movementID = movementID;
	}
}
