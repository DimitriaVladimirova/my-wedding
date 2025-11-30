**ABOUT THE PROJECT:**

My Wedding is a single page React application for planning a dream wedding.
Users can explore wedding locations, menus, and color themes, while admins can fully manage all content (create, edit, delete). 

**HOW IT WORKS:**


•	Install dependencies: **npm install**

•	Start React frontend (from project folder “client”: The frontend runs on http://localhost:5173): **npm run dev**; 

•	Start backend (from project folder “server”. The backend runs on http://localhost:3030): **node server.js** 

**User Accounts**


•	Register with email & password;

•	Login / Logout; 

•	Admin account (preconfigured): email: admin@abv.bg & password: admin 

**Logged-in users can:**


•	Browse all locations, menus, and colors 

•	Select: 
-	One location 
-	Menu + number of guests 
-	One dark color 
-	One light color 

•	See their selections in the My Wedding page 

•	Cannot see admin-only actions (Add / Edit / Delete) 

**Admins can:**


•	Add new Locations, Menus, Colors 

•	Edit existing items 

•	Delete items 

•	See admin-only buttons (+ Add, Edit, Delete) 

•	Carousel & pagination automatically adjust when more items are added. 

**Non logged-in Users can:**


•	Explore wedding options 

•	View details about each location 

**Used Technologys:**


•	React 19 

•	React Router 

•	Context API (User authentication + Wedding selections) 

•	Custom hooks  

•	CSS modules/global styling 
