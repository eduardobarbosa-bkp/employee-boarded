Employee Boarded (Angular 4 application) - Eduardo Barbosa da Costa

***Setup***
* docker, kubernetes and angular-cli;

***Run***
#####  On the command line on the project root:

1. *npm install*
2. *ng build -prod*

##### On angular-cl
3. *ng serve*
The endpoints will be available in: http://localhost:4200

##### On Docker
3. *docker build . -t gcr.io/halliburton/employee-boarded:v1*
4. *docker-compose up -d*
5. *docker restart employee-boarded*
The endpoints will be available in: http://&lt;docker host&gt;:80

##### On kubernetes
3. *kubectl create -f .*
The endpoints will be available in: http://&lt;cluster IP&gt;:80
