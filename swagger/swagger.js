module.exports = {
    swaggerDocument: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        securitySchemes:{
            BearerAuth:{           
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        },
        schemas: {
          User: {
            type: 'object',
            required: ['id', 'email', 'gender', 'password', 'role'],
            properties: {
              id: { type: 'integer', description: "The User's Id." },
              email: { type: 'string', description: "The User's Email." },
              gender: { type: 'string', description: "The User's gender." },
              password: { type: 'string', description: "The User's password." },
              role: { type: 'string', description: "The User's role." },
            },
            example: {
              id: 2,
              email: 'Uvuvwewe@gmail.com',
              gender: 'Male',
              password: 'Ugwemubim',
              role: 'Construction Worker',
            },
          },
          Movie: {
            type: 'object',
            required: ['id', 'title', 'genres', 'year'],
            properties: {
              id: { type: 'integer', description: "The Movie's Id." },
              title: { type: 'string', description: "The Movie's title." },
              genres: { type: 'string', description: "The Movie's genres." },
              year: { type: 'string', description: "The Movie's release year." },
            },
            example: {
              id: 101,
              title: 'Avengers Endgame',
              genres: 'Action|Adventure|Comedy|Fantasy',
              year: '2019',
            },
          },
          UserLogin: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: { type: 'string', description: 'User\'s email' },
              password: { type: 'string', description: 'User\'s password' },
            },
          },
        },
      },
      tags: [
        {
          name: 'Users',
          description: 'The users Managing API',
        },
      ],
      securityDefinitions: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Use Bearer authentication token.',
        },
      },
      paths: {
        '/users/login': {
          post: {
            summary: 'User Login',
            tags: ['Users'],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserLogin',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          description: 'Bearer token for authentication',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/users/register': {
          post: {
            summary: 'Register User',
            tags: ['Users'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        command: { type: 'string', description: 'The SQL command executed.' },
                        rowCount: { type: 'integer', description: 'The number of rows affected.' },
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', description: "The User's Id." },
                            email: { type: 'string', description: "The User's Email." },
                            password: { type: 'string', description: "The User's password." },
                            role: { type: 'string', description: "The User's role." },
                          },
                        },
                        message: { type: 'string', description: 'A message indicating the result of the operation.' },
                      },
                    },
                  },
                },
              },
              '400': {
                description: 'Bad Request',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                          description: 'A message indicating that the request was malformed or invalid.',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/users': {
          get: {
            summary: 'Get Data User',
            tags: ['Users'],
            parameters: [
              {
                name: 'page',
                in: 'query',
                description: 'Number of pages to display data',
                required: true,
                schema: {
                  type: 'integer',
                  minimum: 1,
                },
              },
            ],
            security: [
              {
                BearerAuth: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/users/{id}': {
          put: {
            summary: 'Update User By Id',
            tags: ['Users'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: "The User's Id.",
                schema: {
                  type: 'integer',
                },
              },
            ],
            security: [
              {
                BearerAuth: [],
              },
            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        command: { type: 'string', description: 'The SQL command executed.' },
                        rowCount: { type: 'integer', description: 'The number of rows affected.' },
                        data: {
                          type: 'object',
                          properties: {
                            id: { type: 'integer', description: "The User's Id." },
                            email: { type: 'string', description: "The User's Email." },
                            password: { type: 'string', description: "The User's password." },
                            role: { type: 'string', description: "The User's role." },
                          },
                        },
                        massage: { type: 'string', description: 'A message indicating the result of the operation.' },
                      },
                    },
                  },
                },
              },
            },
          },
          delete: {
            summary: 'Delete User By Id',
            tags: ['Users'],
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                description: "The User's Id.",
                schema: {
                  type: 'integer',
                },
              },
            ],
            security: [
              {
                BearerAuth: [],
              },
            ],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        command: { type: 'string', description: 'The SQL command executed.' },
                        rowCount: { type: 'integer', description: 'The number of rows affected.' },
                        massage: { type: 'string', description: 'A message indicating the result of the operation.' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/movies': {
            get: {
              summary: 'Get Data Movie',
              tags: ['Movies'],
              parameters: [
                {
                  name: 'page',
                  in: 'query',
                  description: 'Number of pages to display data',
                  required: true,
                  schema: {
                    type: 'integer',
                    minimum: 1,
                  },
                },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Movie',
                        },
                      },
                    },
                  },
                },
              },
            },
            post: {
              summary: 'Input New Movies',
              tags: ['Movies'],
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Movie',
                    },
                  },
                },
              },
              security: [
                {
                  BearerAuth: [],
                },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          command: { type: 'string', description: 'The SQL command executed.' },
                          rowCount: { type: 'integer', description: 'The number of rows affected.' },
                          data: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', description: "The Movie's Id." },
                              title: { type: 'string', description: "The Movie's Title." },
                              genres: { type: 'string', description: "The Movie's genres." },
                              year: { type: 'string', description: "The Movie's release year." },
                            },
                          },
                          message: { type: 'string', description: 'A message indicating the result of the operation.' },
                        },
                      },
                    },
                  },
                },
                '400': {
                  description: 'Bad Request',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',
                            description: 'A message indicating that the request was malformed or invalid.',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '/movies/{id}': {
            put: {
              summary: 'Update Movies By Id',
              tags: ['Movies'],
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  description: "The Movie's Id.",
                  schema: {
                    type: 'integer',
                  },
                },
              ],
              security: [
                {
                  BearerAuth: [],
                },
              ],
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Movie',
                    },
                  },
                },
              },
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          command: { type: 'string', description: 'The SQL command executed.' },
                          rowCount: { type: 'integer', description: 'The number of rows affected.' },
                          data: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer', description: "The Movie's Id." },
                              title: { type: 'string', description: "The Movie's title." },
                              genres: { type: 'string', description: "The Movie's genres." },
                              year: { type: 'string', description: "The Movie's release year." },
                            },
                          },
                          massage: { type: 'string', description: 'A message indicating the result of the operation.' },
                        },
                      },
                    },
                  },
                },
              },
            },
            delete: {
              summary: 'Delete Movies By Id',
              tags: ['Movies'],
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  description: "The Movie's Id.",
                  schema: {
                    type: 'integer',
                  },
                },
              ],
              security: [
                {
                  BearerAuth: [],
                },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          command: { type: 'string', description: 'The SQL command executed.' },
                          rowCount: { type: 'integer', description: 'The number of rows affected.' },
                          massage: { type: 'string', description: 'A message indicating the result of the operation.' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        
        },
    },
  };
  