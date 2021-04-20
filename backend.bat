@echo off
cls 
IF exist backend/node_modules (
	cd backend && npm start
) ELSE (
	echo Installing Backend Modules
	cd backend && npm install
)