## Basic setup of Backbone.js project

* Version: see bower.json


## Setup development environment

* Required:

~~~
[sudo] npm install grunt-cli yo bower yeoman/generator-mocha 
generator-backbone -g
~~~

* Install dependencies

~~~
npm install && bower install
~~~

## Use .editorconfig

Please install editorconfig to your editor/IDE

## Use jshint, YOU SHOULD, actually HAVE TO due the build config

* SublimeText plugin

From package manager: jshint
From npm: ~~~ ~$ [sudo] npm install jshint ~~~

## Run development server

~~~
grunt serve
~~~

## Build for production

This will create a /dist directory with everything you need compiled,
take a look at Gruntfile.js if you need custom setup

~~~
grunt build
~~~

## Testing.

* Setup:

Go to /test and install dependencies:

~~~
bower install
~~~

Edit /test/index.html and add your app files like app.js file added.
Also you may need to edit path for your files generated from your

## Generators from generator-backbone

~~~
yo backbone
yo backbone:model
yo backbone:collection
yo backbone:router
yo backbone:view
~~~

## Basic/Quick usage:

~~~
~$ yo backbone:model session
~~~

It will generate basic scaffold with:

~~~
invoke backbone-mocha:model
create test/models/session.spec.js
create app/scripts/models/session.js
~~~

Also, will add app/scripts/models/session.js to your app/index.html and to your
/test/index.html. Unfortunately, with current version you will have to modify
your /test/index.html:

~~~html
<script src="test/models/session.js"></script>
~~~

to

~~~html
<script src="models/session.spec.js"></script>
~~~

### About Gruntfile.js Keep your Gruntfile clean as possible!

Tasks are extracted to /tasks/tasks.js file
Initial configuration for each task placed inside /tasks/config/
