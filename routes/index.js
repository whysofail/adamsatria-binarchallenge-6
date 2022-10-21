import express from "express";
import { getUsers, Register, Login, Logout, CurrentUser, RegisterAdmin } from "../controllers/User.js";
import { getCars, getCarsWhere, getCarsById, createCars, updateCars, deleteCars, getCarsActive } from "../controllers/Cars.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { isAdmin, isSuperAdmin } from "../middleware/RolesAuth.js";
import { readFile } from 'fs/promises';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = JSON.parse(await readFile(new URL("../openapi.json", import.meta.url)));
 
const router = express.Router();

const prefix = "/v1/api";
//Endpoint User (Registration, Login and Auth)
//
router.post(prefix +'/login', Login);
router.get(prefix +'/users',  getUsers);

//Endpoint Register, can only assign "Member" roles.
router.post(prefix +'/register', Register);

//Endpoint Admin Register for Superadmin.
router.post(prefix + '/adminreg', verifyToken, isSuperAdmin, RegisterAdmin)

//See currently logged in user
router.get(prefix +'/whois', verifyToken, CurrentUser);

router.get(prefix +'/token', refreshToken);
router.delete(prefix +'/logout', Logout);

//Endpoint CRUD


router.get(prefix + '/cars', verifyToken, getCarsActive);
router.post(prefix + '/cars', verifyToken, isAdmin, createCars);
router.get(prefix + '/cars/all', verifyToken, getCars);
router.get(prefix + '/cars/:id', verifyToken, getCarsById);
router.put(prefix + '/cars/:id/edit', verifyToken, isAdmin, updateCars);
router.delete(prefix + '/cars/:id/delete', verifyToken, isAdmin, deleteCars);

//Api Docs

// Swagger
router.use(prefix + '/api-docs', swaggerUi.serve);
router.get(prefix + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


 
export default router;