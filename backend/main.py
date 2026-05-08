from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import products

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product Management Mini App",
    description="API for managing products",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # allow all origins for dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Product Management API"}
