import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Aron',
          email: 'aron.bijl@me.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
          isSeller: true,
          seller: {
              name: true,
              logo: '/images/logo1.png',
              description: 'best seller in the world',
              rating: 4.5,
              numReviews: 120,
          },
        }
    ],
    products:[
        {
            name: 'Stool',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 120,
            countInStock: 9,
            brand: 'SKANANA',
            rating: 4.0,
            numReviews: 10,
            description: 'High Quality Product'
        },
        {
            name: 'Cabinet',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 480,
            countInStock: 20,
            brand: 'SKANANA',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality Product'
        },
        {
            name: 'Book Self',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 295,
            countInStock: 0,
            brand: 'SKANANA',
            rating: 5,
            numReviews: 10,
            description: 'High Quality Product'
        },
        {
            name: 'Kitchen Table',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 537,
            countInStock: 15,
            brand: 'SKANANA',
            rating: 5,
            numReviews: 10,
            description: 'High Quality Product'
        },
        {
            name: 'Night Stand',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 185,
            countInStock: 5,
            brand: 'SKANANA',
            rating: 4.0,
            numReviews: 10,
            description: 'High Quality Product'
        },
        {
            name: 'Some other product',
            category: 'furniture',
            image: '/assets/images/p1.jpg',
            price: 185,
            countInStock: 12,
            brand: 'SKANANA',
            rating: 4.0,
            numReviews: 10,
            description: 'High Quality Product'
        },
    ],
}

export default data;