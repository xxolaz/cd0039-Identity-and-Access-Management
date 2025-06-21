# Coffee Shop Full Stack

## Full Stack Nano - IAM Final Project

This project is a full-stack drink menu application for a digitally enabled cafe. The application displays drinks, allows users to view them, and provides role-based access for baristas and managers to view recipes and manage the menu.

The application demonstrates:

1. Displaying graphics representing the ratios of ingredients in each drink.
2. Allowing public users to view drink names and graphics.
3. Allowing the shop baristas to see the recipe information.
4. Allowing the shop managers to create new drinks and edit existing drinks.

## Project Setup and Configuration

This section details the necessary steps to get the application running locally, including dependency installation and environment configuration.

### Auth0 Configuration

Before setting up the code, configure Auth0:

1. **Create API:** In your Auth0 dashboard, create a new API (e.g., "Coffee Shop API"). The **Identifier** you set (e.g., `https://coffee-shop-api`) will be your `API_AUDIENCE`.
2. **Define Permissions:** In the API's "Permissions" tab, add the following five permissions:
   - `get:drinks`
   - `get:drinks-detail`
   - `post:drinks`
   - `patch:drinks`
   - `delete:drinks`
3. **Create Roles:**
   - Create a **Barista** role and assign it the `get:drinks` and `get:drinks-detail` permissions.
   - Create a **Manager** role and assign it all five permissions.
4. **Create Application:** Create a new "Single Page Web Application".
5. **Configure Application Settings:** In the application's "Settings" tab, configure the following:
   - **Allowed Callback URLs:** `http://localhost:8100/tabs/user`
   - **Allowed Logout URLs:** `http://localhost:8100`
   - **Allowed Web Origins:** `http://localhost:8100`
6. **Enable RBAC:** In your **API's** "Settings" tab, scroll down and turn on both switches for **"Enable RBAC"** and **"Add Permissions in the Access Token"**.
7. **Create Users:** Create at least two users and assign one the Barista role and the other the Manager role.

### Backend Setup

1. Navigate to the `./backend` directory.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. **Install Dependencies:** The starter `requirements.txt` uses outdated or incompatible versions. Install the correct packages with these specific versions to ensure compatibility:
   ```bash
   pip install Flask==1.1.2 Werkzeug==1.0.1 Jinja2==2.11.3 MarkupSafe==2.0.1 itsdangerous==1.1.0 flask-sqlalchemy==2.4.4 SQLAlchemy==1.3.24 python-jose flask-cors python-dotenv
   ```
4. **Configure Environment:** Create a `.env` file in the `./backend` directory and add your Auth0 configuration details:
   ```
   FLASK_APP=src/api.py
   AUTH0_DOMAIN='YOUR_AUTH0_DOMAIN'
   API_AUDIENCE='YOUR_API_AUDIENCE'
   ```
5. **Initialize Database:** To populate the database with sample data, you must run the server once with the initialization function enabled.
   - In `./backend/src/api.py`, uncomment the `db_drop_and_create_all()` line.
   - Run the server (`flask run`).
   - **CRITICAL:** Stop the server and immediately re-comment the `db_drop_and_create_all()` line to prevent the database from being wiped on every restart.

### Frontend Setup

1. Navigate to the `./frontend` directory.
2. **Install Ionic CLI:** If you do not have it installed globally, run:
   ```bash
   npm install -g @ionic/cli
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Configure Environment:** Update the file `./frontend/src/environments/environment.ts` with your specific Auth0 and API details:
   ```typescript
   export const environment = {
     production: false,
     apiServerUrl: '[http://127.0.0.1:5000](http://127.0.0.1:5000)',
     auth: {
       domain: 'YOUR_AUTH0_DOMAIN',        // From Auth0 Application Settings
       clientId: 'YOUR_CLIENT_ID',        // From Auth0 Application Settings
       audience: 'YOUR_API_AUDIENCE',     // From Auth0 API Settings
       callbackURL: 'http://localhost:8100/tabs/user',
     },
   };
   ```
5. **Node.js Compatibility (If using Node v17+):** Newer versions of Node.js may cause a crypto-related error on startup. To fix this, set the following environment variable before running `ionic serve`:
   - **PowerShell:** `$env:NODE_OPTIONS = "--openssl-legacy-provider"`
   - **macOS/Linux:** `export NODE_OPTIONS=--openssl-legacy-provider`

### Running the Full Stack Application

1. **Start the Backend:** In one terminal, from the `./backend` directory with the `venv` activated, run:
   ```bash
   flask run
   ```
   The server will start on `http://127.0.0.1:5000`.

2. **Start the Frontend:** In a second terminal, from the `./frontend` directory, run:
   ```bash
   ionic serve
   ```
   The application will open in your browser at `http://localhost:8100`.

### API Testing

A Postman collection is included at `./backend/udacity-fsnd-udaspicelatte.postman_collection.json`. To use it:
1. Log in to the application as a Manager and then as a Barista, copying the JWT for each from the browser's local storage.
2. In Postman, update the "Authorization" tab for the "Manager" and "Barista" folders with the corresponding tokens.
3. Run the collection. All tests should pass, verifying the API's security and functionality.
4. Export the collection with the working tokens to be included in the submission.
