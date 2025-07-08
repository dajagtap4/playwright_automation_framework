class APIUtils
{
    constructor(apiContext,loginPayLoad)
    {
            this.apiContext = apiContext;
            this.loginPayLoad = loginPayLoad;
    }
    async getToken(apiContext)
    {
       const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.loginPayLoad})
       const loginResposeJSON = await loginResponse.json();
       const token = loginResposeJSON.token;
       console.log(token);
       return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
              {
                 data:orderPayLoad,
                 headers:
                 {
                    'authorization':response.token,
                    'content-type':'application/json'
                 },
              })
        
              const orderResposeJSON = await orderResponse.json();
              const orderId = orderResposeJSON.orders[0];
              response.orderId = orderId;
              return response;
    }
}

module.exports = {APIUtils} ;