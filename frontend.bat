@echo off
cls
IF exist frontend/node_modules (
	cd frontend && npm run start
) ELSE (
	echo Installing Backend Modules
	cd frontend && npm install && npm start
)