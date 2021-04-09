# nodejs-backend

#### Run App on local machine:

------------

##### Install local dependencies:
- `yarn install`

------------

##### Adjust local db:
###### 1.  Install postgres:
 - MacOS:
   - `brew install postgres`

- Ubuntu:
  - `sudo apt update`
  - `sudo apt install postgresql postgresql-contrib`

###### 2. Create db and admin user:
 - Before run and test connection, make sure you have created a database as described in the above configuration. You can use the `psql` command to create a user and database.
   - `psql -U postgres`

- Type this command to creating a new database.
  - `postgres=> CREATE DATABASE development OWNER postgres;`
  - `postgres=> \q`
 
 ------------

 ##### Setup database tables:
 - `yarn reset`
 
 ##### Start development build:
 - `yarn start:dev`

 ##### Start production build:
 - `yarn start`
