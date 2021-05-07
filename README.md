# docker-accessibility-check

## Overview
This tool is designed to allow accessibility tests from Docker containers, and support pipelined accessibility testing. The data it returns (JSON and exit codes) is simple to consume using CI toolsets

## Why a Docker image?
Being implemented as a Docker image brings advantages for CI use:
- most CI tools have established patterns for using and consuming tools implemented as Docker images
- there's no complex config/build/install dependencies required to use the tool; just build the Docker image on any Docker host and start using it
- the Docker image can be versioned and stored to align with an organisation's security controls and infrastructure capability
- a reference Docker image can be maintained in a public repository for general purpose consumption by anyone not interested in what's going on behind the scenes
- Docker brings a level of long-term security; it's not going away as a platform any time soon
- I can modernise how the tool works 'under the covers', even to the extent of changing languages and frameworks, without impacting anyone consuming the tool

## Implementation
Like many non-trivial open-source tools, this tool is built on top of a whole bunch of great tools:
- Playwright (https://playwright.dev/)
- Docker (https://docker.io)
- TypeScript (https://www.typescriptlang.org/)
- Node.js (https://nodejs.org/en/)
- Axe from deque (https://www.deque.com/axe/)

## Usage

### To build Docker image locally
`$ docker build -t check-accessibility .`

### To run from a local copy
`$ docker run -e URL=https://jsonplaceholder.typicode.com check-accessibility:latest`

### To push to GCP ECR
`$ docker build -t check-accessibility .`

`$ docker tag check-accessibility:latest gcr.io/check-accessibility/check-accessibility:0.1`

`$ docker push gcr.io/check-accessibility/check-accessibility:0.1`

### To pull & run from GCP ECR
`$ docker pull gcr.io/check-accessibility/check-accessibility:0.1`

`$ docker run gcr.io/check-accessibility/check-accessibility:0.1`
