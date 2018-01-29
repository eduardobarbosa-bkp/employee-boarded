employee-borded (Angular 4 application) - Eduardo Barbosa da Costa

***Setup***
* docker, kubernetes and angular-cli;

***Run***
#####  On the command line on the project root:

1. *npm install*
2. *ng build -prod*
3. *docker build . -t gcr.io/hilliburton/employee-borded:v1*
4. *docker-compose up -d*
5. *docker network connect jwtservice_default employee-borded*
6. *docker network connect roomservice_default employee-borded*
7. *docker restart employee-borded*
The endpoints will be available in: http://&lt;docker host&gt;:80

##### On kubernetes
4. *kubectl create -f .*
The endpoints will be available in: http://&lt;cluster IP&gt;:80
