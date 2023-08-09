import express, { Router } from 'express';

const usersRouter: Router = Router();

usersRouter.get('/user', () => {
	console.log('Users');
});

export { usersRouter };
