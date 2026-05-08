import pytest

def test_create_product(client):
    response = client.post(
        "/products/",
        json={"name": "Test Product", "price": 10.5, "stock": 50, "category": "Test"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Product"
    assert data["price"] == 10.5
    assert data["stock"] == 50
    assert "id" in data

def test_create_product_invalid(client):
    # Invalid price (negative)
    response = client.post(
        "/products/",
        json={"name": "Test Product", "price": -5, "stock": 50, "category": "Test"}
    )
    assert response.status_code == 422

def test_get_products(client):
    # Create product first
    client.post(
        "/products/",
        json={"name": "Test Product", "price": 10.5, "stock": 50, "category": "Test"}
    )
    
    response = client.get("/products/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["name"] == "Test Product"

def test_get_product_by_id(client):
    # Create product
    create_response = client.post(
        "/products/",
        json={"name": "Test Product 2", "price": 20.0, "stock": 10, "category": "Test"}
    )
    product_id = create_response.json()["id"]
    
    response = client.get(f"/products/{product_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == product_id
    assert data["name"] == "Test Product 2"

def test_get_product_not_found(client):
    response = client.get("/products/999")
    assert response.status_code == 404

def test_update_product(client):
    # Create product
    create_response = client.post(
        "/products/",
        json={"name": "Test Product 3", "price": 30.0, "stock": 15, "category": "Test"}
    )
    product_id = create_response.json()["id"]
    
    # Update product
    response = client.put(
        f"/products/{product_id}",
        json={"name": "Updated Product", "price": 35.0}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Product"
    assert data["price"] == 35.0
    assert data["stock"] == 15  # Unchanged

def test_update_product_not_found(client):
    response = client.put(
        "/products/999",
        json={"name": "Updated Product"}
    )
    assert response.status_code == 404

def test_delete_product(client):
    # Create product
    create_response = client.post(
        "/products/",
        json={"name": "Test Product 4", "price": 40.0, "stock": 20, "category": "Test"}
    )
    product_id = create_response.json()["id"]
    
    # Delete product
    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 204
    
    # Verify deleted
    get_response = client.get(f"/products/{product_id}")
    assert get_response.status_code == 404

def test_delete_product_not_found(client):
    response = client.delete("/products/999")
    assert response.status_code == 404
