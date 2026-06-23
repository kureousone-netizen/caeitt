from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
import jwt as jwt_lib

# Import database connection variables and models
from database import get_db
import models

app = FastAPI()

SECRET_KEY = "cakeitt_secret_key_2026"

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production change this to your actual frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------------------------------------
# PYDANTIC INPUT SCHEMAS (Matches your Frontend Inputs)
# -------------------------------------------------------------
class ProductCreate(BaseModel):
    vendor_id: int
    name: str
    category: str
    price: float
    is_available: Optional[int] = 1


class SignupRequest(BaseModel):
    full_name: str
    matric_no: str
    email_address: str
    phone_no: str
    password: str  # Kept here for auth logic, though not in the student schema


class LoginRequest(BaseModel):
    email: str
    password: str


class OrderItemRequest(BaseModel):
    product_id: int
    quantity: int
    price_at_purchase: float


class OrderCreate(BaseModel):
    student_id: int
    vendor_id: int
    delivery_id: int
    room_id: int
    items: List[OrderItemRequest]
    total_amount: float
    payment_method: str = "Bank Transfer"


# -------------------------------------------------------------
# AUTHENTICATION ENDPOINTS (Writing to 'student' table)
# -------------------------------------------------------------
@app.post("/auth/signup", status_code=status.HTTP_201_CREATED)
def signup(user: SignupRequest, db: Session = Depends(get_db)):
    # Verify if email or matric number already exists
    existing_user = db.query(models.DBStudent).filter(
        (models.DBStudent.email_address == user.email_address) |
        (models.DBStudent.matric_no == user.matric_no)
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or Matric Number already registered")
    
    # Save student details to the database
    new_student = models.DBStudent(
        full_name=user.full_name,
        matric_no=user.matric_no,
        email_address=user.email_address,
        phone_no=user.phone_no
    )
    
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return {"message": "Signup successful", "student_id": new_student.student_id}


@app.post("/auth/login")
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    # Search for user by email address
    user = db.query(models.DBStudent).filter(models.DBStudent.email_address == credentials.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # In a production app, verify your hashed password here.
    # For your school demo database bypass step, we will forge the token directly:
    token = jwt_lib.encode(
        {"id": user.student_id, "email": user.email_address},
        SECRET_KEY,
        algorithm="HS256"
    )
    
    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.student_id,
            "name": user.full_name,
            "email": user.email_address
        }
    }


# -------------------------------------------------------------
# PRODUCT ENDPOINTS (Writing to 'product' table)
# -------------------------------------------------------------
@app.get("/products")
def get_all_products(db: Session = Depends(get_db)):
    return db.query(models.DBProduct).all()


@app.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.DBProduct).filter(models.DBProduct.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get("/products/vendor/{vendor_name}")
def get_products_by_vendor(vendor_name: str, db: Session = Depends(get_db)):
    # Look up the vendor using the business_name column we just populated!
    vendor_record = db.query(models.DBVendor).filter(models.DBVendor.business_name == vendor_name).first()
    
    if not vendor_record:
        return []
    
    return db.query(models.DBProduct).filter(models.DBProduct.vendor_id == vendor_record.vendor_id).all()


@app.post("/products", status_code=status.HTTP_201_CREATED)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    new_product = models.DBProduct(
        vendor_id=product.vendor_id,
        name=product.name,
        category=product.category,
        price=product.price,
        is_available=product.is_available
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {"message": "Product added successfully", "product": new_product}


@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.DBProduct).filter(models.DBProduct.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully from database"}


# -------------------------------------------------------------
# TRANSACTIONS ENDPOINTS (Writing to 'order', 'order_items', 'payment')
# -------------------------------------------------------------
@app.post("/submit-order")
def submit_order(order: OrderCreate, db: Session = Depends(get_db)):
    # 1. Insert parent order record
    new_order = models.DBOrder(
        student_id=order.student_id,
        vendor_id=order.vendor_id,
        delivery_id=order.delivery_id,
        room_id=order.room_id,
        order_status="Awaiting Confirmation"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    # 2. Loop through and create items linked to this order
    for item in order.items:
        # Construct raw SQL bindings automatically under-the-hood
        raw_item = models.DBBaseTableMappingHelperForOrderItems(
            order_id=new_order.order_id,
            product_id=item.product_id,
            quantity_of_items=item.quantity,
            price_at_purchase=item.price_at_purchase
        )
        db.add(raw_item)
    
    # 3. Create a matching 1-to-1 payment receipt block (Matches your schema architecture)
    new_payment = models.DBBaseTableMappingHelperForPayment(
        order_id=new_order.order_id,
        total_amount=order.total_amount,
        payment_status="Pending"
    )
    db.add(new_payment)
    db.commit()
    
    return {"message": "Order processed successfully", "order_id": new_order.order_id}


@app.get("/get-details/{details_id}")
def get_details(details_id: int, db: Session = Depends(get_db)):
    student = db.query(models.DBStudent).filter(models.DBStudent.student_id == details_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found")
    return student


@app.get("/")
def home():
    return {"message": "Cake Itt API Connected to MySQL Server ✅"}