import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { UploadImageProductController } from "./image-product/upload-image-product-controller";
import {
  CreateCustomerController,
  AuthenticateController,
  RefreshTokenController,
  CreateCustomerSocialAccountController,
  UpdateCustomerController,
  FindByIdCustomerController
} from "./customer";

import {
  CreateProductController,
  FindByIdProductController,
  FindManyProductController,
  UpdateProductController,
  DeleteProductController
} from './product'

import {
  CreateCategoryController,
  DeleteCategoryController,
  FindByIdCategoryController,
  FindManyCategoryController,
  UpdateCategoryController
} from './category'

import {
  CreateOrderController,
  FindByIdOrderController,
  FindManyCustomerIdOrderController,
  FetchOrdersController,  
  UpdateOrderController
} from './order'

import {
  CreateNeighborhoodController,
  FindManyNeighborhoodController,
  DeleteNeighborhoodController,
  FindByIdNeighborhoodController,
  UpdateNeighborhoodController,
} from './neighborhood'

import {
  CreateAddressController,
  DeleteAddressController,
  FindManyAddressController,
  UpdateAddressController,
} from './address'

import { OAuthEfi } from "./efi-pay/pix";
import { WebHookPixController, WebHookVerifyCertificateController } from "./efi-pay/webhook.pix";
import { FindManyDateOrderController } from "./order/find-many-date-orders-controller";
import { verifyUserRole } from "../../middlewares/verify-customer-role";
import { PixConfirmationController } from "./efi-pay/pix-confirmation-controller";
import { FetchPixController } from "./efi-pay/fetch-pix-controller";

export const Routes = async (app: FastifyInstance) => {

  /* Routes Customer */
  app.post('/sessions', AuthenticateController)
  app.post('/customer', CreateCustomerController)
  app.post('/sessions/social-login', CreateCustomerSocialAccountController)
  app.patch('/customer', UpdateCustomerController)
  app.patch('/token/refresh', RefreshTokenController)
  app.get('/customer', FindByIdCustomerController)


  /* Routes Product */
  app.get('/product/:id', FindByIdProductController)
  app.get('/product', FindManyProductController)
  app.post('/product', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, CreateProductController)
  app.put('/product', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, UpdateProductController)
  app.delete('/product/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, DeleteProductController)

  /* Routes Upload Image Product */
  app.post('/upload', UploadImageProductController)

  /* Routes Category */
  app.get('/category/:id', FindByIdCategoryController)
  app.get('/category', FindManyCategoryController)
  app.post('/category', CreateCategoryController)
  app.put('/category', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, UpdateCategoryController)
  app.delete('/category/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, DeleteCategoryController)

  /** Route pix */
  app.post('/pix', OAuthEfi)
  app.post('/webhook', WebHookPixController)
  app.post('/config-webhook', WebHookVerifyCertificateController)
  app.post('/pix-confirmation', PixConfirmationController) 
  app.get('/fetch-pix', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, FetchPixController)

  /** Route Order */
  app.post('/order', CreateOrderController)
  app.get('/order/:id', FindByIdOrderController)
  app.post('/date-order', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, FindManyDateOrderController)  
  app.get('/order', FindManyCustomerIdOrderController)
  app.get('/fetch-orders', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, FetchOrdersController)
  app.put('/order',  UpdateOrderController)

  // Routes Neighborhood
  app.get('/neighborhood', FindManyNeighborhoodController)
  app.post('/neighborhood',{onRequest: [verifyJWT, verifyUserRole('ADMIN')]}, CreateNeighborhoodController)
  app.get('/neighborhood/:id', FindByIdNeighborhoodController)
  app.delete('/neighborhood/:id', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, DeleteNeighborhoodController)
  app.put('/neighborhood', {onRequest: [verifyJWT, verifyUserRole('ADMIN')]}, UpdateNeighborhoodController)

  // Routes Address
  app.post('/address', CreateAddressController)
  app.get('/address', FindManyAddressController)
  app.delete('/address/:id', DeleteAddressController)
  app.put('/address', UpdateAddressController)

}
