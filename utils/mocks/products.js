const productsMock = [
  {
    name: 'catre 2 plaza',
    description:
      'catre de madera 2 plazas con 4 cajones a los cantos.',
    image: '/images/cama1.jpg',
    tags: ['madera', '2 plazas', 'melamina'],
    price: 250.0,
  },
  {
    name: 'cama de 2 pisos',
    description:
      'catre metalico de 2 pisos y 1 plaza cada uno, armable',
    image: '/images/cama2.jpg',
    tags: ['metalico', 'armable'],
    price: 150.0,
  },
  {
    name: 'cudros detallados',
    description: 'cudros personalizados diferentes dimensiones',
    image: '/images/cuadro1.webp',
    tags: ['cuadro', 'personalizado', 'caoba'],
    price: 60.0,
  },
  {
    name: 'mesa para comedor',
    description: 'tamaño para 8 personas , dimensiones:6X1.5m',
    image: '/images/mesa1.jpg',
    link: '/mesa/1',
    tags: ['madera', '8 personas', 'expensive'],
    price: 120.0,
  },
  {
    name: 'sofa azul',
    description: 'sofa 2 personas, de 3X1m',
    image: '/images/sofa1.jpg',
    link: '/sofa/1',
    tags: ['sofa', '2 personas'],
    price: 300.0,
  },
  {
    name: 'silla curva',
    description: 'silla madera caoba',
    image: '/images/silla1.jpg',
    link: '/silla/1',
    tags: ['silla', 'madera', 'caoba'],
    price: 15.2,
  },
];

function filteredProductsMock(tag) {
  return productsMock.filter(product => product.tags.includes(tag));
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock);
  }

  async createProduct() {
    return Promise.resolve('6bedb1267d1ca7f3053e2875');
  }
}

module.exports = {
  productsMock,
  ProductsServiceMock,
  filteredProductsMock,
};
