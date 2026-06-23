from sqlalchemy import Column, String, Integer, DECIMAL, ForeignKey, DateTime, SmallInteger
from sqlalchemy.sql import func
from database import Base

class DBStudent(Base):
    __tablename__ = "student"
    __table_args__ = {'extend_existing': True}

    student_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    matric_no = Column(String(25), nullable=False, unique=True)
    email_address = Column(String(100), nullable=False, unique=True)
    phone_no = Column(String(20), nullable=False, unique=True)
    otp_verification = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=func.now())

class DBVendor(Base):
    __tablename__ = "vendor"
    __table_args__ = {'extend_existing': True}

    vendor_id = Column(Integer, primary_key=True, autoincrement=True)
    admin_id = Column(Integer, nullable=False)
    business_name = Column(String(100), nullable=False, unique=True)
    contact_email = Column(String(100), nullable=False, unique=True)
    status = Column(String(30), nullable=False)

class DBProduct(Base):
    __tablename__ = "product"
    __table_args__ = {'extend_existing': True}

    product_id = Column(Integer, primary_key=True, autoincrement=True)
    vendor_id = Column(Integer, ForeignKey("vendor.vendor_id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    is_available = Column(SmallInteger, default=1)

class DBOrder(Base):
    __tablename__ = "order"
    __table_args__ = {'extend_existing': True}

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey("student.student_id"), nullable=False)
    vendor_id = Column(Integer, ForeignKey("vendor.vendor_id"), nullable=False)
    delivery_id = Column(Integer, nullable=False)
    room_id = Column(Integer, nullable=False)
    order_status = Column(String(50), nullable=False)
    time_placed_at = Column(DateTime, default=func.now())
    
class DBBaseTableMappingHelperForOrderItems(Base):
    __tablename__ = "order_items"
    __table_args__ = {'extend_existing': True}

    item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("order.order_id"))
    product_id = Column(Integer, ForeignKey("product.product_id"))
    quantity_of_items = Column(Integer, nullable=False)
    price_at_purchase = Column(DECIMAL(10, 2), nullable=False)

class DBBaseTableMappingHelperForPayment(Base):
    __tablename__ = "payment"
    __table_args__ = {'extend_existing': True}

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("order.order_id"), unique=True)
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    payment_status = Column(String(50), nullable=False)