# docker-accessibility-check

## To build Docker image

`$ docker build -t check-accessibility .`
`$ docker run -e URL=https://jsonplaceholder.typicode.com check-accessibility:latest`

## To push to GCP ECR
`$ docker build -t check-accessibility .`
`$ docker tag check-accessibility:latest gcr.io/check-accessibility/check-accessibility:0.1`
`$ docker push gcr.io/check-accessibility/check-accessibility:0.1`

## To pull & run from GCP ECR

`$ docker pull gcr.io/check-accessibility/check-accessibility:0.1`
`$ docker run gcr.io/check-accessibility/check-accessibility:0.1`
