let API_ROUTE

process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8080/api/v1/products'
  : API_ROUTE = 'heroku/api/v1/products'


export default API_ROUTE