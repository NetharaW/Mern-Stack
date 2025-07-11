import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API documentation for MERN Stack Tutorial',
      version: '1.0.0',
      description: 'API documentation for MERN Stack Tutorial',
      termsOfService: 'https://yourapp.com/terms',
      contact: {
        name: 'Nethara Waduge',
        email: 'netharanimangi.27@gmail.com',
        url: 'https://linkedin.com/in/nethara-nimangi',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    tags: [
      {
        name: 'Products',
        description: 'Operations related to products (create, read, update, delete)',
      },
    ],
    servers: [
      {
        url: 'http://localhost:5400',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Bearer token **_only_**',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./backend/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;