# Local development

## Pre requisites
Install yarn
https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

## Running development environment
Checkout the repository and run the following commands:
```
yarn install
yarn test
yarn start
```
This will start the application on http://localhost:3000

# Production deployment
The application can be hosted on any kind of web server as long as it can serve static files. The application is built using React and can be built using the following command:
```
yarn install
yarn build
```
This will generate a build folder with static files. Copy the files from your build folder to your web server.

## GitHub pages option
You can easily host your application on GitHub pages.

We suggest you create a private git repository and a public git repository for your project. The private repository will be used to store your source code and the public repository will be used to host your project website. You can use the following steps to setup your project:
* In your organisation click new then select private for the repository type. Give your repository a name and click create repository. 
* In your organisation click new then select public for the repository type. Give your repository a name and click create repository.

If you are not familiar with git, you can use the following commands to create a new repository and push it to GitHub:
```
git init
git add .
git commit -m "Initial commit"
git remote add origin <your repository URL>
git push -u origin main
```
## Pre requisites
Create a root domain or subdomain for your project. You can use any domain provider for this. We suggest you use a subdomain for your project. For example if your domain is example.com you can use the subdomain project.example.com for your project. This will be used later to configure your project website.

# Setup github repositories

## Setup public repository
On your public repository. Create a gh-pages branch. This branch will be used to host your project website. You can create a gh-pages branch using the following commands:
```
git checkout -b gh-pages
git push origin gh-pages
```
## Setup private repository
Checkout the code from your private source reopository. You can do this using the following command:
```
git checkout main
```
Now build the website using the following command:
```
yarn install
yarn test
yarn build
```
This will generate a build folder. Copy the files from your build folder to the root of your gh-pages branch on your public repository.

## Back on the public repository
From your public repository you can now push the changes to the gh-pages branch using the following command:
```
git add .
git commit -m "Build website"
git push origin gh-pages
```
## Setup push to gh-pages branch using github actions
Open settings for the public repo. Click on Actions and enable GitHub Pages. Select the gh-pages branch as the source. Configure the domain for your project website. This will be the domain you created earlier. For example project.example.com. Click save.

## Advanced configuration
Setup a build that will automatically build and deploy your project website when you push changes to your private repository. This will allow you to use your private repository to manage your source code and your public repository to host your project website.