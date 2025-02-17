/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.post("auth/register", "UserRegistrationController")
Route.post("auth/login", "UserAuthenticationController")

Route.group(() => {
  Route.get("users/:id", "FetchSingleUserController")
  Route.get("organisations/:orgId", "FetchSingleOrganisationController")
  Route.get("organisations", "FetchAllUserOrganisationsController")
  Route.post("organisations", "CreateNewOrganisationController")
  Route.post("organisations/:orgId/users", "AddUserToOrganisationController")
})
.prefix('api')
.middleware('api')
