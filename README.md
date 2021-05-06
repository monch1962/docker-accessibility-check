# gcf-accessibility-check

## To build Docker image

`$ docker build -t check-accessibility .`
`$ docker run -e URL=https://jsonplaceholder.typicode.com check-accessibility:latest`

## To run from GCP ECR

`$ docker pull gcr.io/check-accessibility/check-accessibility`
`$ docker run gcr.io/check-accessibility/check-accessibility:0.1`