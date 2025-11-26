import type { Producto } from '../services/ecommerce/productos.services';
import { useState } from 'react';

interface DetalleProps {
  producto: Producto | null;
  onBack?: () => void;
}

export default function Detalle({ producto, onBack }: DetalleProps) {
  const [imageError, setImageError] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado
        </div>
        <button className="btn btn-primary" onClick={onBack}>
          Volver a inicio
        </button>
      </div>
    );
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddCart = () => {
    console.log(`Agregando ${cantidad} de ${producto.nombre} al carrito`);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= producto.stock) {
      setCantidad(value);
    }
  };

  return (
    <div className="container py-5">
      {/* Botón Volver */}
      <div className="mb-4">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
      </div>

      {/* Contenido del Detalle */}
      <div className="row">
        {/* Imagen */}
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div style={{ height: '400px', overflow: 'hidden', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            {!imageError && producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                onError={handleImageError}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                <span className="text-muted">Sin imagen disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Información */}
        <div className="col-lg-6">
          <h1 className="mb-3">{producto.nombre}</h1>
          
          <div className="mb-4">
            <span className="badge bg-info text-capitalize me-2">{producto.categoria || 'Sin categoría'}</span>
            <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado'}
            </span>
          </div>

          <h3 className="text-primary mb-4">${producto.precio.toFixed(2)}</h3>

          <p className="text-muted mb-4">{producto.descripcion}</p>

          {/* Información adicional */}
          <div className="row mb-4">
            <div className="col-md-6">
              <p><strong>ID del Producto:</strong> {producto.id}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Categoría:</strong> <span className="text-capitalize">{producto.categoria || 'N/A'}</span></p>
            </div>
          </div>

          {/* Selector de cantidad y agregar carrito */}
          <div className="row align-items-end">
            <div className="col-md-4 mb-3 mb-md-0">
              <label htmlFor="cantidad" className="form-label">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                className="form-control"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={handleQuantityChange}
                disabled={producto.stock === 0}
              />
            </div>
            <div className="col-md-8">
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleAddCart}
                disabled={producto.stock === 0}
              >
                {producto.stock > 0 ? `Agregar al carrito (${cantidad})` : 'Producto Agotado'}
              </button>
            </div>
          </div>

          {/* Información de envío */}
          <div className="alert alert-info mt-4" role="alert">
            <h6 className="alert-heading">Información de envío</h6>
            <p className="mb-0">Envío gratis en compras mayores a $50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
