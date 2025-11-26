import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Producto } from '../services/ecommerce/productos.services';
import { productosService } from '../services/ecommerce/productos.services';
import Detalle from '../components/detalle';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          setError('ID de producto no válido');
          return;
        }
        const productoData = await productosService.obtenerProductoPorId(Number(id));
        setProducto(productoData);
      } catch (err) {
        setError('No se pudo cargar el producto');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Volver a inicio
        </button>
      </div>
    );
  }

  return <Detalle producto={producto} onBack={() => navigate('/')} />;
}
