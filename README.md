# next-danube-webshop
Next Danube is a Next &amp; MongoDB based project that has full authentication and authorization that allows a user to shop for books online. 



### notes for future docs

When transpiling the seeder.ts to javascript be mindful that typescript will create .default on a few imported objects that will need to be removed.

``` bash
tsc path/to/my/seeder-file.ts
```
This will generate a JavaScript file with the same name as your TypeScript file but with the .js extension. You can then run the seeder file using the node command:

``` bash
node path/to/my/seeder-file.js
```

Make sure you have installed TypeScript globally or locally as a dev dependency before running the command.


Nodemon & typescript didn't seem to play well with one another out of the box. 


### TO DO BACKEND

Make sure to match review update and delete to user that is interested in updating & deleting with controller logic. May create helper functions later.