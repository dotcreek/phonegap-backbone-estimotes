## Basic setup of phonegap project

Please take a look at .gitignore file, to check you dont upload unnesesary files
to your repository.

### Install dependencies

~~~
~$ [sudo] npm install phonegap -g
~~~

~~~
~$ phonegap -v # 3.5.0-0.20.9 or greater
~~~

### Add platform

~~~
~$ phonegap add android
~~~

### Install in your phone, emulator or virtualized device, no need to build

First, you need to update your /www/index.html with all your files needed from
/www/js

If you run

~~~
~$ grunt phonegap # custom task for this phonegap project
~~~

Files from /App/dist will be copied to /phonegap/www/

*BUT*, you should update your /phonegap/www/index.html to include what you need
from /ponegap/www/

* About /phonegap/www folder structure after run (cd /App and )
grunt phonegap

~~~
www
├── config.xml
├── css
│   └── index.css
├── favicon.ico
├── icon.png
├── img
│   └── logo.png
├── index.html
├── js
│   └── index.js
├── res
    ... phonegap folder for res here ...
├── scripts
│   ├── main.js
│   └── vendor.js
├── spec folder continues ...
├── spec.html
└── styles
    └── main.css

~~~

/www/css /www/js/ are phonegap folders,
/www/scripts and /www/styles are folders from backbone project.

With two folders for the same thing(css or js), we ensure that phonegap
structure will not be overridden by our scripts.

~~~
~$ phonegap run android
~~~

### Virtualize device so you dont need to use emulator or your phone

* Install GenyMotion on Ubuntu

You may need to create an account and download bin file after you login

~~~
~$ wget http://files2.genymotion.com/genymotion/genymotion-2.2.2/genymotion-2.2.2_x64.bin
~~~

Choose a proper directory for installation(~/.genymotion recommended)

~~~
~$ sudo dpkg -i genymotion-2.2.2_x64.bin
~~~

Execute it(if you choose ~/.genymotion as installation directory):

~~~
~$ ~/.genymotion/genymotion/genymotion
~~~

PRO Tip: Create a launcher:

~~~
~$ sudo apt-get install alacarte
~~~

Launch alacarte

~~~
~$ alacarte
~~~

Choose Programming menu, then New Item, type any name you want, as command
~/.genymotion/genymotion/genymotion.
You can use an icon placed ~/.genymotion/genymotion/

### Run phonegap project

* cd /App

~~~
grunt phonegap
~~~

* With one device connected(genymotion will work)

~~~
phonegap run android
~~~

### Emulate on Google Chrome 

click on "show drawer" next to the "settings" button in the dev tools

### Install Required plugins

To install the cordova globalization plugin use this command:

~~~
phonegap plugin add org.apache.cordova.globalization
~~~
